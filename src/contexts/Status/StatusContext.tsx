'use client'

import { createContext, useReducer, ReactNode } from "react";
import initialState from "./data";
import reducer, { IStopLoadingPayload } from "./reducer";

interface IStatusContextProps {
  children: ReactNode;
}

interface IStatusContextType {
  state: typeof initialState;
  startLoading: (message: string) => void;
  stopLoading: (responseStatus: IStopLoadingPayload) => void;
  resetStatus: () => void;
  closeSnackBar: () => void
}

export const StatusContext = createContext<IStatusContextType>({
  state: initialState,
  startLoading: () => null,
  stopLoading: () => null,
  resetStatus: () => null,
  closeSnackBar: () => null
});

const StatusProvider = ({ children }: IStatusContextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startLoading = (payload: string) => {
    dispatch({ type: 'START_LOADING', payload });
  };

  const stopLoading = (payload: IStopLoadingPayload) => {
    setTimeout(() => {
      dispatch({ type: 'STOP_LOADING', payload });
    }, 1000)
  };

  const resetStatus = () => {
    dispatch({
      type: 'RESET_STATUS',
      payload: 'idle'
    });
  };

  const closeSnackBar = () => {
    dispatch({
      type: 'CLOSE_SNACKBAR',
      payload: false
    })
  }

  const contextValue: IStatusContextType = {
    state,
    startLoading,
    stopLoading,
    resetStatus,
    closeSnackBar
  };

  return (
    <StatusContext.Provider value={contextValue}>
      {children}
    </StatusContext.Provider>
  );
};

export default StatusProvider;
