import { Instance } from "../lib/Instance";

export const sessionApi={
    createSession:async(data)=>
    {
        try{
            const res=await Instance.post('/sessions',data);
            return res.data;

        }
        catch(error){
            console.error("Error creating session:", error);
            throw error;
        }
    },
    getMyRecentSession:async()=>{
        try {
            const res=await Instance.get('/sessions/my-recent');
            
            return res.data;
        } catch (error) {
            console.error("Error fetching recent session:", error);
            throw error;
        }
    },
    getActiveSession:async()=>{
        try {
            console.log("Api Endpoint called")
            const res=await Instance.get('/sessions/active');
            return res.data;
        } catch (error) {
            console.error("Error while fetching the active session",error);
            throw error;
        }
    },
    getSessionById:async(id)=>{
        try {
            const res=await Instance.get(`/sessions/${id}`);
            return res.data;

        } catch (error) {
            console.error("Error while fetching the session by id",error);
            throw error;
        }
    },
    joinSession:async(id)=>{
        try {
            const res=await Instance.post(`/sessions/${id}/join`);
            console.log("Join Session Response:", res.data);
            return res.data;
        } catch (error) {
            console.error('Error while joining the session');
            throw error;
        }
    },
    leaveSession:async(id)=>{
        try {
            const res=await Instance.post(`/sessions/${id}/leave`);
            return res.data;
        } catch (error) {
            console.error('Error while leaving the session');
            throw error;
        }
    },
    getStreamTokeb:async()=>{
        try{
        const res=await Instance.get(`/chat/token`);
        return res.data
        }
        catch(erro){
            console.error("Errow while fetching the stream token",erro);
            throw erro
        }
    }
}