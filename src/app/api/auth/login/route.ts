import {
  SESSION,
  USER_DATA,
} from "@/constants/constants";
import { serialize } from "cookie";
import { NextResponse } from "next/server";
import { ILoginSession } from "@/types/auth";

export async function POST(request: Request) {
  const { session, user }: ILoginSession = await request.json();

  if (!session || !user) {
    return NextResponse.json(
      {
        message: "Dados de sessão e/ou dados de usuário não foram informados.",
      },
      {
        status: 422,
      }
    );
  }

  const cookies = [
    serialize(USER_DATA, JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_AMBIENT === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 8 * 60 * 60, // 8 horas
    }),
    serialize(SESSION, JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_AMBIENT === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 8 * 60 * 60, // 8 horas
    }),
  ];

  const cookiesString = cookies.join(", ");

  const headers = new Headers();
  headers.append("Set-Cookie", cookiesString);

  return NextResponse.json(
    {
      message: "Sessão criada com sucesso",
    },
    {
      status: 200,
      headers,
    }
  );
}
