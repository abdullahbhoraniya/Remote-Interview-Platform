// store/interview.store.js
import { create } from "zustand";
import { getInterviewsApi } from "../services/interview.service";

export const useInterviewStore = create((set) => ({
  interviews: [],
  loading: false,
  activeTab: "All",

  setActiveTab: (tab) => set({ activeTab: tab }),

  fetchInterviews: async () => {
    try {
      set({ loading: true });

      const data = await getInterviewsApi();

      set({
        interviews: data.data, // adjust if your response differs
        loading: false
      });

    } catch (error) {
      console.error("Interview fetch error", error);
      set({ loading: false });
    }
  }
}));