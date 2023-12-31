import Provider from "@/components/Provider";
import "../styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gerenciador de Usuários",
  description: "Essa aplicação foi feita para gerenciar cadastros de pessoas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className}`} cz-shortcut-listen="false">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
