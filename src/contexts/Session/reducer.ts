import { User as UserAuth } from "firebase/auth"
import User from "@/core/User"

import actions from "./actions";
import initialState, { type IInitialState } from "./data";
import { AUTHENTICATED, LOADING } from "@/constants/constants";

type ACTIONTYPE = {
  type: typeof actions.SAVE_USER_DATA
  payload: User
} | {
  type: typeof actions.SAVE_SESSION_DATA
  payload: UserAuth
} | {
  type: typeof actions.CLEAR_SESSION
  payload: undefined
} | {
  type: typeof actions.START_LOADING
  payload: undefined
}

function reducer(state: IInitialState, action: ACTIONTYPE) {
  switch (action.type) {
    case actions.SAVE_USER_DATA:
      return {
        ...state,
        status: AUTHENTICATED,
        userData: action.payload
      };
    case actions.SAVE_SESSION_DATA:
      return {
        ...state,
        status: AUTHENTICATED,
        sessionData: action.payload
      };
    case actions.START_LOADING:
      return {
        ...state,
        status: LOADING
      };
    case actions.CLEAR_SESSION:
      return initialState;
    default:
      throw new Error();
  }
}

export default reducer;
