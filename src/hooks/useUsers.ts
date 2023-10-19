import { useCallback, useContext, useMemo } from "react"
import User from "@/core/User"
import UserCollection from "@/firebase/db/UserCollection"
import IUserRepo from "@/core/UserRepo"
import { SessionContext } from "@/contexts/Session/SessionContext"

export default function useUsers() {
  const repo: IUserRepo = useMemo(() => new UserCollection(), [])
  const session = useContext(SessionContext)
  
  const getUserInformation = useCallback(async () => {
    await repo.getUserInformation()
      .then(user => {
        if (user) {
          session?.saveUserData(user)
          session?.saveSessionData()
        }
      })
      .catch(err => {
        console.error(err)
      }) 
  }, [repo, session])
  
  const updateUserInformation = useCallback(async (user: User) => {
    await repo.update(user).then(() => getUserInformation())
  }, [getUserInformation, repo])

  const createUserInformation = useCallback(async (user: User) => {
    await repo.create(user).then(() => getUserInformation())
  }, [getUserInformation, repo])

  return { getUserInformation, updateUserInformation, createUserInformation }
}