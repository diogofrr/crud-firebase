'use client'

import { User as UserAuth } from "firebase/auth"
import User from "@/core/User"

import { createContext, useReducer, ReactNode, useEffect } from "react";
import initialState, { IInitialState } from "./data";
import reducer from "./reducer";
import { SessionStatus } from "@/types/login";

interface ISessionContextProps {
  children: ReactNode;
}

interface ISessionContextType {
  state: IInitialState;
  changeStatus: (status: SessionStatus) => void;
  clearSession: () => void;
  saveUserData: (user: User) => void;
  saveSessionData: (sessionData: UserAuth) => void;
}

export const SessionContext = createContext<ISessionContextType | null>(null);

const SessionProvider = ({ children }: ISessionContextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(`ContextState: ${JSON.stringify(state)}`);
  }, [state]);

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
    saveSessionData
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
