import { UserIcon } from "@/components/Icons";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="bg-titanWhite w-screen h-screen min-h-[920px] sm:py-8 flex items-center justify-center">
      <div className="w-full h-full sm:h-auto sm:w-[480px] bg-white rounded-xl shadow-xl flex flex-col items-center justify-center px-4 sm:px-8 py-16">
        <div className="flex flex-col items-center justify-center mb-6">
          <UserIcon width="w-32" height="h-32" className="text-tuna stroke-1" />
          <h1 className="text-3xl text-tuna text-center">Crie sua conta</h1>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
