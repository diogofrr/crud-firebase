import { STATUS } from "@/types/global";

const initialState = {
  status: "idle" as STATUS,
  message: "",
  snackbarOpen: false,
};

export default initialState;
