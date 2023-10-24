import { User as UserAuth } from "firebase/auth";
import User from "@/core/User";
import { LOADING } from "@/constants/constants";

type STATUS = "authenticated" | "unauthenticated" | "loading";

export interface IInitialState {
  status: STATUS;
  sessionData: UserAuth | null;
  userData: User | null;
}

const initialState: IInitialState = {
  status: LOADING,
  sessionData: null,
  userData: null,
};

export default initialState;
