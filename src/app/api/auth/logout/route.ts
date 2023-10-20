import { SESSION, USER_DATA } from "@/constants/constants";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function DELETE(): Promise<NextResponse> {
  const cookies = [
    serialize(USER_DATA, "", {
      path: "/",
      maxAge: -1,
    }),
    serialize(SESSION, "", {
      path: "/",
      maxAge: -1,
    }),
  ];

  const cookiesString = cookies.join(", ");

  const headers = new Headers();
  headers.append("Set-Cookie", cookiesString);

  return NextResponse.json(
    {
      message: "Sessão excluída com sucesso.",
    },
    {
      status: 200,
      headers,
    }
  );
}
