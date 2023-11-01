import { SESSION, USER_DATA } from "@/constants/constants";
import { ILoginSession } from "@/types/auth";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const { session, user }: ILoginSession = await request.json();
  const cookies = [];

  if (!session && !user) {
    return NextResponse.json(
      {
        message: "Nenhum dado foi informado.",
      },
      {
        status: 422,
      }
    );
  }

  if (user) {
    cookies.push(
      serialize(USER_DATA, JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_AMBIENT === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 8 * 60 * 60, // 8 horas
      })
    );
  }

  if (session) {
    cookies.push(
      serialize(SESSION, JSON.stringify(session), {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_AMBIENT === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 8 * 60 * 60, // 8 horas
      })
    );
  }

  const cookiesString = cookies.join(", ");

  const headers = new Headers();
  headers.append("Set-Cookie", cookiesString);

  return NextResponse.json(
    {
      message: "Dados atualizados com sucesso.",
    },
    {
      status: 200,
      headers,
    }
  );
}
