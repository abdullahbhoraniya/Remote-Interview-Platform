import React, { useState } from 'react';
import { useAuthStore } from '../store/Auth.store.js';
import Navbar from '../Components/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import { useActiveSession, useCreateSession, useRecentSession } from '../hooks/useSessions.js';
import WelcomeSection from '../Components/WelcomeSection.jsx';
import CreateSessionModal from '../Components/CreateSessionModal.jsx';
import { useQueryClient } from "@tanstack/react-query";
import StatsCards from '../Components/StatsCards.jsx';
import ActiveSessions from '../Components/ActiveSessions.jsx';
import RecentSessions from '../Components/RecentSessions.jsx';

const DashBoard = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  console.log("USerData on DashBoard Page",user);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });

  const createSessionMutation = useCreateSession();
  console.log("Create session data", createSessionMutation)
  const { data: activeSession, isLoading: loadingActiveSession } = useActiveSession();
  const { data: recentSessions, isLoading: loadingRecentSession } = useRecentSession();

  console.log(activeSession);
  console.log(recentSessions)
  const handleCreateRoom = () => {
    try {
      if (!roomConfig.problem || !roomConfig.difficulty) return;

      createSessionMutation.mutate(
        {
          problem: roomConfig.problem,
          difficulty: roomConfig.difficulty.toLowerCase()
        },
        {
          onSuccess: (data) => {
            console.log("SUCCESS:", data);
            setShowModal(false);
            navigate(`/session/${data.session._id}`); // adjust based on log
          },
          onError: (err) => {
            console.error("ERROR:", err);
          }
        }
      );
    } catch (error) {
      console.error("Error", error)
      throw error;
    }
  }

  const isUserInSession=(session)=>{
    if(!user._id) return false;

    return session.host?._id === user._id || session.participant?._id === user._id;
  }

  const activeSessions = activeSession?.sessions || [];
  const recentSessionsList = recentSessions?.sessions || [];

  console.log("Activeession list", activeSession);
  console.log("Recentsession list", recentSessionsList);
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading dashboard...</div>;
    
  }

  return (
    <>
      <div className='min-h-screen bg-base-300'>
        <Navbar />
        <WelcomeSection onCreateSession={() => setShowModal(true)} />

        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatsCards
              activeSessionsCount={activeSessions.length}
              recentSessionsCount={recentSessionsList.length}
            />
            <ActiveSessions
              sessions={activeSessions}
              isLoading={loadingActiveSession}
              isUserInSession={isUserInSession}
            /> 
          </div>

          <RecentSessions sessions={recentSessions} isLoading={loadingRecentSession} />
        </div>
      </div>

      <CreateSessionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />

    </>
  );
};

export default DashBoard;
