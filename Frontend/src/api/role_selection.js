import { Instance } from "../lib/Instance";

export const roleSelectionApi={
    roleSelection:async(role)=>{
        try {
            console.log("Selected Role: ",role);
            const res=await Instance.post('/onboarding/set-role',{role});
            return res.data;
        } catch (error) {
            console.error("Error while selecting the role",error);
            throw error;
        }
    }
}