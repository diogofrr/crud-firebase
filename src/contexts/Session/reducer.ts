import { User as UserAuth } from "firebase/auth";
import User from "@/core/User";

import actions from "./actions";
import { AUTHENTICATED, UNAUTHENTICATED } from "@/constants/constants";
import { SessionStatus } from "@/types/auth";

type ACTIONTYPE =
  | {
      type: typeof actions.SAVE_USER_DATA;
      payload: User;
    }
  | {
      type: typeof actions.SAVE_SESSION_DATA;
      payload: UserAuth;
    }
  | {
      type: typeof actions.CLEAR_SESSION;
      payload: null;
    }
  | {
      type: typeof actions.CHANGE_STATUS;
      payload: SessionStatus;
    };

// tipar o state com "typeof initialState" ou "IInitialState" gera um erro de tipagem no arquivo SessionContext
function reducer(state: any, action: ACTIONTYPE) {
  switch (action.type) {
    case actions.SAVE_USER_DATA:
      return {
        ...state,
        status: AUTHENTICATED,
        userData: action.payload,
      };
    case actions.SAVE_SESSION_DATA:
      return {
        ...state,
        status: AUTHENTICATED,
        sessionData: action.payload,
      };
    case actions.CHANGE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case actions.CLEAR_SESSION:
      return {
        ...state,
        status: UNAUTHENTICATED,
      };
    default:
      throw new Error();
  }
}

export default reducer;
