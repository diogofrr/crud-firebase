import { STATUS } from "@/types/global";
import actions from "./actions";
import initialState from "./data";

type ACTIONTYPE =
  | {
      type: typeof actions.START_LOADING;
      payload: string;
    }
  | {
      type: typeof actions.STOP_LOADING;
      payload: IStopLoadingPayload;
    }
  | {
      type: typeof actions.RESET_STATUS;
      payload: "idle";
    }
  | {
      type: typeof actions.CLOSE_SNACKBAR;
      payload: false;
    };

export interface IStopLoadingPayload {
  status: STATUS;
  message: string;
}

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case actions.START_LOADING:
      return {
        ...state,
        status: "loading" as STATUS,
        message: action.payload.toString(),
        snackbarOpen: action.payload !== "",
      };
    case actions.STOP_LOADING:
      if (action.payload instanceof Object) {
        return {
          ...state,
          status: action.payload.status as STATUS,
          message: action.payload.message,
          snackbarOpen: action.payload.message !== "",
        };
      }
      return state;
    case actions.RESET_STATUS:
      return {
        ...state,
        status: "idle" as STATUS,
        message: "",
        snackbarOpen: false,
      };
    case actions.CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarOpen: false,
      };
    default:
      throw new Error();
  }
}

export default reducer;
