import AuthForm from "@/components/AuthForm";
import { useState } from "react";

const AuthPage = () => {
  const [type, setType] = useState<string>("login");

  const handleOnTypeChange = (type: string) => {
    setType(type);
  };

  return (
    <div className="flex-1 h-full flex justify-center md:items-center py-[40px] lg:py-[80px]">
      <div className="w-full max-w-[400px] p-[16px] lg:p-[24px] md:rounded-[24px] md:shadow-lg">
        <h1 className="font-bold text-[18px] lg:text-[24px] mb-[16px] lg:mb-[24px]">
          {type === "login" ? "Login" : "Sign up"}
        </h1>
        <AuthForm type={type} onTypeChange={handleOnTypeChange} />
      </div>
    </div>
  );
};

export default AuthPage;
