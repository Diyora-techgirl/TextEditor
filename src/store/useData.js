import { create } from "zustand";

const useData = create((set) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
}));

export default useData;
