import { useCallback, useMemo, useState } from "react"
import User from "@/core/User"
import UserCollection from "@/firebase/db/UserCollection"
import IUserRepo from "@/core/UserRepo"

export default function useUsers() {
  const repo: IUserRepo = useMemo(() => new UserCollection(), [])
  const [userData, setUserData] = useState<User | null>(null)
  
  const getUserInformation = useCallback(async () => {
    await repo.getUserInformation()
      .then(user => {
        if (user) setUserData(user)
      })
      .catch(err => {
        console.error(err)
      }) 
  }, [repo])
  
  const updateUserInformation = useCallback(async (user: User) => {
    await repo.update(user).then(() => getUserInformation())
  }, [getUserInformation, repo])

  const createUserInformation = useCallback(async (user: User) => {
    await repo.create(user).then(() => getUserInformation())
  }, [getUserInformation, repo])

  return { userData, getUserInformation, updateUserInformation, createUserInformation }
}