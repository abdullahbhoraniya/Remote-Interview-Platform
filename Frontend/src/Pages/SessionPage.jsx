import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthStore } from '../store/Auth.store'
import { useEndSession, useJoinSession, useSessionById } from '../hooks/useSessions'
import { PROBLEMS } from '../data/problems'
import { executeCode } from '../lib/piston'
import Navbar from '../Components/Navbar'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { getDifficultyColor } from '../lib/utils'
import { Loader2Icon, LogOutIcon, PhoneOffIcon } from 'lucide-react'
import CodeEditor from '../Components/CodeEditor'
import OutputPanel from '../Components/OutputPanel'
import useStream from '../hooks/useStream'
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUi from '../Components/VideoCallUi'

const SessionPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const [output, setOutput] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [code, setCode] = useState("")

  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id)

  const joinSession = useJoinSession()
  const endSession = useEndSession()

  const session = sessionData?.session

  // ✅ FIXED ID COMPARISON
  const isHost = String(session?.host?._id) === String(user?._id)

  const isParticipant = String(session?.participant?._id) === String(user?._id)
  
  const { streamClient, call, chatClient, channel, isInitStream } = useStream(session,loadingSession,isHost,isParticipant);

  console.log("Channel:",channel);

  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null

  // ✅ Auto join session
  useEffect(() => {
    if (!session || !user || loadingSession) return
    if (isHost || isParticipant) return
    joinSession.mutate(id, { onSuccess: refetch })
  }, [session, user, loadingSession, isHost, isParticipant, id, joinSession, refetch])

  // ✅ Set starter code
  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage])
    }
  }, [problemData, selectedLanguage])

  // ✅ Redirect if session completed
  useEffect(() => {
    if (!session || loadingSession) return
    if (session.status === "completed") navigate("/dashboard")
  }, [session, loadingSession, navigate])

  const handleLanguageChange = (e) => {
    const newLang = e.target.value
    setSelectedLanguage(newLang)
    setCode(problemData?.starterCode?.[newLang] || "")
    setOutput(null)
  }

  const handleRunCode = async () => {
    try {
      setIsRunning(true)
      setOutput(null)
      const result = await executeCode(selectedLanguage, code)
      setOutput(result)
    } finally {
      setIsRunning(false)
    }
  }

  const handleEndSession = () => {
    if (confirm("Are you sure you want to end the session?")) {
      endSession.mutate(id, {
        onSuccess: () => navigate("/dashboard")
      })
    }
  }

  return (
    <div className='h-screen bg-base-100 flex flex-col'>
      <Navbar />

      <PanelGroup direction='horizontal' className="flex-1">

        {/* LEFT PANEL */}
        <Panel defaultSize={50} minSize={30}>
          <PanelGroup direction="vertical">

            {/* TOP - Problem */}
            <Panel defaultSize={50} minSize={20}>
              <div className="h-full overflow-y-auto bg-base-200">

                <div className="p-6 bg-base-100 border-b border-base-300">
                  <div className="flex items-start justify-between mb-3">

                    <div>
                      <h1 className="text-3xl font-bold">
                        {session?.problem || "Loading..."}
                      </h1>

                      {problemData?.category && (
                        <p className="text-base-content/60 mt-1">
                          {problemData.category}
                        </p>
                      )}

                      <p className="text-base-content/60 mt-2">
                        Host: {session?.host?.name || "Loading..."} •{" "}
                        {session?.participant ? 2 : 1}/2 participants
                      </p>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-3">

                      {/* ✅ SAFE DIFFICULTY */}
                      <span className={`badge badge-lg ${getDifficultyColor(session?.difficulty)}`}>
                        {session?.difficulty
                          ? session.difficulty.charAt(0).toUpperCase() + session.difficulty.slice(1)
                          : "Easy"}
                      </span>

                      {/* ✅ FIXED BUTTON CONDITION */}
                      {isHost && session?.status?.toLowerCase() === "active" && (
                        <button
                          onClick={handleEndSession}
                          disabled={endSession.isPending}
                          className="btn btn-error btn-sm gap-2"
                        >
                          {endSession.isPending
                            ? <Loader2Icon className="w-4 h-4 animate-spin" />
                            : <LogOutIcon className="w-4 h-4" />
                          }
                          End Session
                        </button>
                      )}

                      {session?.status === "completed" && (
                        <span className="badge badge-ghost badge-lg">
                          Completed
                        </span>
                      )}
                    </div>

                  </div>
                </div>
                <div className="p-6 space-y-6">
                  {/* problem desc */}
                  {problemData?.description && (
                    <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                      <h2 className="text-xl font-bold mb-4 text-base-content">Description</h2>
                      <div className="space-y-3 text-base leading-relaxed">
                        <p className="text-base-content/90">{problemData.description.text}</p>
                        {problemData.description.notes?.map((note, idx) => (
                          <p key={idx} className="text-base-content/90">
                            {note}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* examples section */}
                  {problemData?.examples && problemData.examples.length > 0 && (
                    <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                      <h2 className="text-xl font-bold mb-4 text-base-content">Examples</h2>

                      <div className="space-y-4">
                        {problemData.examples.map((example, idx) => (
                          <div key={idx}>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="badge badge-sm">{idx + 1}</span>
                              <p className="font-semibold text-base-content">Example {idx + 1}</p>
                            </div>
                            <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5">
                              <div className="flex gap-2">
                                <span className="text-primary font-bold min-w-[70px]">
                                  Input:
                                </span>
                                <span>{example.input}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-secondary font-bold min-w-[70px]">
                                  Output:
                                </span>
                                <span>{example.output}</span>
                              </div>
                              {example.explanation && (
                                <div className="pt-2 border-t border-base-300 mt-2">
                                  <span className="text-base-content/60 font-sans text-xs">
                                    <span className="font-semibold">Explanation:</span>{" "}
                                    {example.explanation}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Constraints */}
                  {problemData?.constraints && problemData.constraints.length > 0 && (
                    <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                      <h2 className="text-xl font-bold mb-4 text-base-content">Constraints</h2>
                      <ul className="space-y-2 text-base-content/90">
                        {problemData.constraints.map((constraint, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-primary">•</span>
                            <code className="text-sm">{constraint}</code>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </Panel>

            <PanelResizeHandle className="h-2 bg-base-300 cursor-row-resize hover:bg-primary transition-colors" />

            {/* CODE + OUTPUT */}
            <Panel defaultSize={50} minSize={20}>
              <PanelGroup direction="vertical">

                <Panel defaultSize={70}>
                  <CodeEditor
                    selectedLanguage={selectedLanguage}
                    code={code}
                    isRunning={isRunning}
                    onLanguageChange={handleLanguageChange}
                    onCodeChange={setCode}
                    onRunCode={handleRunCode}
                  />
                </Panel>

                <PanelResizeHandle className="h-2 bg-base-300 cursor-row-resize" />

                <Panel defaultSize={30}>
                  <OutputPanel output={output} />
                </Panel>

              </PanelGroup>
            </Panel>

          </PanelGroup>
        </Panel>

        <PanelResizeHandle className='w-2 bg-base-300 cursor-col-resize' />

        {/* RIGHT PANEL */}
        <Panel defaultSize={50} minSize={30}>
          <div className="h-full bg-base-200 p-4 overflow-auto">
             {isInitStream ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
                    <p className="text-lg">Connecting to video call...</p>
                  </div>
                </div>
              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center">
                  <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body items-center text-center">
                      <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mb-4">
                        <PhoneOffIcon className="w-12 h-12 text-error" />
                      </div>
                      <h2 className="card-title text-2xl">Connection Failed</h2>
                      <p className="text-base-content/70">Unable to connect to the video call</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <StreamVideo client={streamClient}>
                    <StreamCall call={call}>
                      <VideoCallUi chatClient={chatClient} channel={channel} />
                    </StreamCall>
                  </StreamVideo>
                </div>
              )}
          </div>
        </Panel>

      </PanelGroup>
    </div>
  )
}

export default SessionPage