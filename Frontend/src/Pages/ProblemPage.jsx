import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PROBLEMS } from '../data/problems';
import Navbar from '../Components/Navbar';
import ProblemDescription from '../Components/ProblemDescription';
import CodeEditor from '../Components/CodeEditor';
import OutputPanel from '../Components/OutputPanel';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { executeCode } from '../lib/piston';
import toast from 'react-hot-toast';
import confetti from "canvas-confetti";

const ProblemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedlanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript);
  const [output, setOutput] = useState(null);
  const [isRunning, setisRunning] = useState(false);


  const currentProblem = PROBLEMS[currentProblemId];

  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedlanguage]);
      setOutput(null);
    }
  }, [id, selectedlanguage]);


  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(currentProblem.starterCode[newLang])
    setOutput(null);
  };

  const handleProblemChange = (newproblemId) => { navigate(`/problem/${newproblemId}`) };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 },
    });

    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 },
    });
  };

  const normalizeOutput = (output) => {
    // normalize output for comparison (trim whitespace, handle different spacing)
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };

  const checkIfTestCasesPassed = (actualOutput, expectedOutput) => {
    try {
      const normalizedActual = normalizeOutput(actualOutput);
      const normalizedExpected = normalizeOutput(expectedOutput);
      return normalizedActual === normalizedExpected;
    } catch (error) {
      console.error("Error comparing outputs:", error);
    }
  };
  const handleRunCode = async () => {
    try {
      setisRunning(true);
      setOutput(null);
      const res = await executeCode(selectedlanguage, code);
      setOutput(res);
      if (res.success) {
        const expectedOutput = currentProblem.expectedOutput[selectedlanguage];
        const testPassed = checkIfTestCasesPassed(res.output, expectedOutput);
        if (testPassed) {
          toast.success("All test cases passed! Great job!");
          triggerConfetti();
        } else {
          toast.error("Some test cases failed. Keep trying!");
        }
      }
    }
    catch (err) {
      setOutput({ success: false, error: "Failed to execute code. Please try again." });
    }
    finally{
      setisRunning(false);
    }
  };


return (
  <div className='h-screen bg-base-200 flex flex-col'>
    <Navbar />

    <div className='flex-1'>
      <PanelGroup direction="horizontal" className="h-full">

        {/* Problem Description */}
        <Panel defaultSize={50} minSize={30}>
          <ProblemDescription
            problem={currentProblem}
            currentProblemId={currentProblemId}
            onProblemChange={handleProblemChange}
            allProblems={Object.values(PROBLEMS)}
          />
        </Panel>

        <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

        {/* Code + Output */}
        <Panel defaultSize={50} minSize={30}>

          {/* 🔥 IMPORTANT FIX: h-full */}
          <PanelGroup direction="vertical" className="h-full">

            {/* Code Editor → 70% */}
            <Panel defaultSize={70} minSize={40}>
              <CodeEditor
                selectedLanguage={selectedlanguage}
                code={code}
                isRunning={isRunning}
                onLanguageChange={handleLanguageChange}
                onCodeChange={setCode}
                onRunCode={handleRunCode}
              />
            </Panel>

            <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

            {/* Output → 30% */}
            <Panel defaultSize={30} minSize={20}>
              <OutputPanel output={output} />
            </Panel>

          </PanelGroup>

        </Panel>

      </PanelGroup>
    </div>
  </div>
);
}

export default ProblemPage
