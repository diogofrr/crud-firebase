import { User as UserAuth } from "firebase/auth"
import User from "@/core/User"
import { UNAUTHENTICATED } from "@/constants/constants"

type STATUS = 'authenticated' | 'unauthenticated' | 'loading'

export interface IInitialState {
  status: STATUS,
  sessionData: UserAuth | null,
  userData: User | null
}

const initialState: IInitialState = {
  status: UNAUTHENTICATED,
  sessionData: null,
  userData: null
}

export default initialState