"use client";

import { User as UserAuth } from "firebase/auth";
import User from "@/core/User";

import {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import initialState, { IInitialState } from "./data";
import reducer from "./reducer";
import { ILocalSessionResponse, SessionStatus } from "@/types/login";
import { AUTHENTICATED, UNAUTHENTICATED } from "@/constants/constants";

interface ISessionContextProps {
  children: ReactNode;
}

interface ISessionContextType {
  state: IInitialState;
  changeStatus: (status: SessionStatus) => void;
  clearSession: () => void;
  saveUserData: (user: User) => void;
  saveSessionData: (sessionData: UserAuth) => void;
  getLocalSession: () => void;
}

export const SessionContext = createContext<ISessionContextType | null>(null);

const SessionProvider = ({ children }: ISessionContextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getLocalSession = useCallback(async () => {
    try {
      const { data }: ILocalSessionResponse = await (
        await fetch("/api/auth/get-session")
      ).json();

      if (data) {
        saveUserData(data.user);
        saveSessionData(data.session);
        changeStatus(AUTHENTICATED);
      } else {
        changeStatus(UNAUTHENTICATED);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // useEffect(() => {
  //   console.log('=========================================================================')
  //   console.log(`ContextState: ${JSON.stringify(state, null, 2)}`);
  //   console.log('=========================================================================')
  // }, [state])

  useEffect(() => {
    getLocalSession();
  }, [getLocalSession]);

  const changeStatus = (status: SessionStatus) => {
    dispatch({ type: "CHANGE_STATUS", payload: status });
  };

  const clearSession = () => {
    dispatch({ type: "CLEAR_SESSION", payload: null });
  };

  const saveUserData = (user: User) => {
    dispatch({ type: "SAVE_USER_DATA", payload: user });
  };

  const saveSessionData = (sessionData: UserAuth) => {
    dispatch({ type: "SAVE_SESSION_DATA", payload: sessionData });
  };

  const contextValue: ISessionContextType = {
    state,
    changeStatus,
    clearSession,
    saveUserData,
    saveSessionData,
    getLocalSession,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
