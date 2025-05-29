import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useEmailOtpStore } from "@/store/EmailForOtp";
import { useNotification } from "@/store/useNotification";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState<string>("");
  const { emailOtp } = useEmailOtpStore();
  const navigate = useNavigate();
  const { setNotification } = useNotification();

  type RegisterResponse = {
    message: string;
  };

  const handleVerify = async () => {
    const response = await fetch(
      "https://findcourse.net.uz/api/users/verify-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailOtp, otp }),
      }
    );

    const data: RegisterResponse = await response.json();

    if (response.ok) {
      setNotification(data?.message, "success");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setNotification(data?.message, "error");
    }
  };

  const handleResend = async () => {
    const response = await fetch(
      "https://findcourse.net.uz/api/users/send-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailOtp }),
      }
    );

    const data: RegisterResponse = await response.json();

    if (response.ok) {
      setNotification(data?.message, "success");
    } else {
      setNotification(data?.message, "error");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:text-white">
        <h1 className="text-3xl font-bold text-center text-[#3B82F6] mb-6">
          {t("Elektron pochtani tasdiqlang")}
        </h1>

        <h2 className="mb-6 text-gray-700 dark:text-gray-300 font-medium">
          {emailOtp}
        </h2>

        <div className="mb-6">
          <InputOTP maxLength={5} onChange={setOtp}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4].map((index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-3 rounded-lg transition-colors mb-4"
          onClick={handleVerify}
        >
          {t("Verify OTP")}
        </Button>

        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {t("Didn't receive code?")}{" "}
          <button
            onClick={handleResend}
            className="text-[#3B82F6] hover:underline font-medium"
          >
            {t("Resend OTP")}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Otp;
