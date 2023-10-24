import { SESSION, USER_DATA } from "@/constants/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookiesStore = cookies();
  const user = cookiesStore.get(USER_DATA);
  const session = cookiesStore.get(SESSION);

  if (!user || !session) {
    return NextResponse.json(
      {
        data: null,
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      data: {
        user: JSON.parse(user.value),
        session: JSON.parse(session.value),
      },
    },
    {
      status: 200,
    }
  );
}
