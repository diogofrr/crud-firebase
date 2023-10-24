"use client";

import SessionProvider from "@/contexts/Session/SessionContext";
import StatusProvider from "@/contexts/Status/StatusContext";

interface IProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: IProviderProps) {
  return (
    <StatusProvider>
      <SessionProvider>{children}</SessionProvider>
    </StatusProvider>
  );
}
