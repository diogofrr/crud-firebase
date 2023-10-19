'use client'

import { User as UserAuth } from "firebase/auth"
import User from "@/core/User"

import { createContext, useReducer, ReactNode } from "react";
import initialState, { IInitialState } from "./data";
import reducer from "./reducer";

interface ISessionContextProps {
  children: ReactNode;
}

interface ISessionContextType {
  state: IInitialState;
  startLoading: () => void;
  clearSession: () => void;
  saveUserData: (user: User) => void;
  saveSessionData: (sessionData: UserAuth) => void;
}

export const SessionContext = createContext<ISessionContextType | null>(null);

const SessionProvider = ({ children }: ISessionContextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startLoading = () => {
    dispatch({ type: "START_LOADING", payload: null });
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
    startLoading,
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
