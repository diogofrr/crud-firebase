'use client'

import { User as UserAuth } from "firebase/auth"
import User from "@/core/User"

import { createContext, useReducer, ReactNode } from "react";
import initialState, { IInitialState } from "./data";
import reducer from "./reducer";

interface IStatusContextProps {
  children: ReactNode;
}

interface IStatusContextType {
  state: IInitialState;
  startLoading: () => void;
  clearSession: () => void;
  saveUserData: (user: User) => void;
  saveSessionData: (sessionData: UserAuth) => void;
}

export const StatusContext = createContext<IStatusContextType | null>(null);

const StatusProvider = ({ children }: IStatusContextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startLoading = () => {
    dispatch({ type: "START_LOADING" });
  };

  const clearSession = () => {
    dispatch({ type: "CLEAR_SESSION" });
  };

  const saveUserData = (user: User) => {
    dispatch({ type: "SAVE_USER_DATA", payload: user });
  };

  const saveSessionData = (sessionData: UserAuth) => {
    dispatch({ type: "SAVE_SESSION_DATA", payload: sessionData });
  };

  const contextValue: IStatusContextType = {
    state,
    startLoading,
    clearSession,
    saveUserData,
    saveSessionData
  };

  return (
    <StatusContext.Provider value={contextValue}>
      {children}
    </StatusContext.Provider>
  );
};

export default StatusProvider;
