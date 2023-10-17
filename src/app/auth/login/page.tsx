import { UserIcon } from "@/components/Icons";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
 return (
  <div className="bg-titanWhite w-screen h-screen flex items-center justify-center">
    <div className="md:h-[640px] md:w-[420px] bg-white rounded-xl shadow-xl flex flex-col items-center justify-center px-8 py-16">
      <div className="flex flex-col items-center justify-center mb-6">
        <UserIcon width="w-32" height="h-32" className="text-tuna stroke-1" />
        <h1 className="text-3xl text-tuna">
          Acesse sua conta
        </h1>
      </div>
      <LoginForm />
    </div>
  </div>
 )
}