import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import { Toast } from "./useToastStore";

export const useActions = create((set) => ({
  isDeletingProblem: false,
  onDeleteProblem: async (id) => {
    try {
      set({ isDeletingProblem: true });
      const res = await axiosInstance.delete(`/problems/delete-problem/${id}`);
      Toast.success(res.data.message);
      return { success: true };
    } catch (error) {
      console.log("Error deleting problem", error);
      Toast.error("Error deleting problem");
      return { success: false };
    } finally {
      set({ isDeletingProblem: false });
    }
  },
}));
