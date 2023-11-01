import { useCallback, useContext, useMemo } from "react";
import User from "@/core/User";
import UserCollection from "@/firebase/db/UserCollection";
import IUserRepo from "@/core/UserRepo";
import { SessionContext } from "@/contexts/Session/SessionContext";
import { ILoginSession } from "@/types/auth";
import { User as UserAuth } from "firebase/auth";

export interface IUpdateSessionArgs {
  session?: UserAuth;
  user?: User;
}

export default function useSession() {
  const repo: IUserRepo = useMemo(() => new UserCollection(), []);
  const context = useContext(SessionContext);

  const saveLocalSession = useCallback(
    async ({ session, user }: ILoginSession) => {
      await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          session,
          user: user.toJSON(),
        }),
        cache: "no-cache",
        redirect: "follow",
      })
        .then(() => context?.getLocalSession())
        .catch((err) => console.error(err));
    },
    [context]
  );

  const getUserInformation = useCallback(async () => {
    await repo
      .getUserInformation()
      .then(async (userData) => {
        if (userData) {
          saveLocalSession(userData);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [repo, saveLocalSession]);

  const updateUserInformation = useCallback(
    async (user: User) => {
      await repo
        .update(user)
        .then(() => getUserInformation())
        .catch((err) => console.error(err));
    },
    [getUserInformation, repo]
  );

  const createUserInformation = useCallback(
    async (user: User) => {
      await repo
        .create(user)
        .then(() => getUserInformation())
        .catch((err) => console.error(err));
    },
    [getUserInformation, repo]
  );

  const signOut = useCallback(async () => {
    await fetch("/api/auth/logout", {
      method: "DELETE",
      cache: "no-cache",
      redirect: "follow",
    })
      .then(() => context?.clearSession())
      .catch((err) => console.error(err));
  }, [context]);

  const updateCookieSession = useCallback(async (profileData: IUpdateSessionArgs) => {
    await fetch("/api/auth/update-session", {
      method: "PUT",
      cache: "no-cache",
      redirect: "follow",
      body: JSON.stringify(profileData)
    })
  }, [])

  return {
    profileData: context?.state,
    getUserInformation,
    updateUserInformation,
    createUserInformation,
    signOut,
    updateCookieSession
  };
}
