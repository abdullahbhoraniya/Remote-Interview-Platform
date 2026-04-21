import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { sessionApi } from '../api/session';

export const useCreateSession = () => {
    const res = useMutation({
        mutationFn: sessionApi.createSession,
        mutationKey: ["createSession"],
        onSuccess: () => toast.success("Session created SuccessFully"),
        onError: () => toast.error("Error while creation Session")
    });
    return res;
}
export const useRecentSession = () => {
    const res = useQuery({
        queryKey: ["myRecentSession"],
        queryFn: sessionApi.getMyRecentSession,
    });
    return res;
}

export const useSessionById = (id) => {
  return useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      console.log("🔥 API CALL TRIGGERED");

      const data = await sessionApi.getSessionById(id);

      console.log("🔥 API RESPONSE:", data);

      return data;
    },
    enabled: true, // force run
    refetchOnMount: true,
  });
};

export const useJoinSession = () => {
    const result = useMutation({
        mutationKey: ["joinSession"],
        mutationFn: sessionApi.joinSession,
        onSuccess: () => toast.success("Joined Session Successfully"),
        onError: () => toast.error("Failed to join session")
    })
    return result;
}
export const useEndSession = () => {
    const result = useMutation({
        mutationKey: ["endSession"],
        mutationFn: sessionApi.leaveSession,
        onSuccess: () => toast.success("Session Ended Successfully"),
        onError: () => toast.error("Error whie ending the session")
    })
    return result;
}

export const useActiveSession = () => {
    const result = useQuery({
        queryKey: ["activeSessions"],
        queryFn: sessionApi.getActiveSession
    })
    return result
}