import User from "@/core/User";
import { User as UserAuth } from "firebase/auth";
import { AUTHENTICATED, UNAUTHENTICATED, LOADING } from "@/constants/constants";

export interface ILoginSession {
  session: UserAuth;
  user: User;
}

export interface ILocalSessionResponse {
  data: {
    user: User;
    session: UserAuth;
  } | null;
}

export type SessionStatus = AUTHENTICATED | UNAUTHENTICATED | LOADING;
