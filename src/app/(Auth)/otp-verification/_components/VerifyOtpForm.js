"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UOtpInput from "@/components/Form/UOtpInput";
import { useVerifyOtpMutation } from "@/redux/api/authApi";
import { ErrorModal, SuccessModal } from "@/utils/modalHook";
import {
  getFromSessionStorage,
  removeFromSessionStorage,
} from "@/utils/sessionStorage";
import { Button } from "antd";
import { ArrowLeft, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function VerifyOtpForm() {
  const router = useRouter();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  // const [resendOtp, { isLoading: isResendOtpLoading }] = useResendOtpMutation();
  const onSubmit = async (data) => {
    try {
      const res = await verifyOtp({ otp: data.otp }).unwrap();

      if (res?.success) {
        SuccessModal("OTP Verification Successful");
        // remove sign up token from session storage
        removeFromSessionStorage("signUpToken");

        if (getFromSessionStorage("forgotPassToken")) {
          router.push("/set-new-password");
        } else {
          router.push("/login");
        }
      }
    } catch (error) {
      ErrorModal(error?.data?.message);
    }
  };

  return (
    <div className="bg-black px-6 py-8">
      <Link
        href="/login"
        className="flex-center-start mb-4 gap-x-2 font-medium !text-white hover:text-primary-blue"
      >
        <ArrowLeft size={18} /> Back to login
      </Link>

      <section className="mb-8 space-y-2 text-white">
        <h4 className="text-3xl font-semibold text-white">Verify OTP</h4>
        <p className="">Enter the otp that we&apos;ve sent to your email</p>
      </section>

      <FormWrapper
        onSubmit={onSubmit}
        // resolver={zodResolver(otpSchema)}
      >
        <UOtpInput name="otp" />
        {isLoading ? (
          <Button
            disabled
            className="!h-10 w-full !rounded-full !border-white !bg-white !font-semibold !text-black !transition-all !duration-300 !ease-in-out hover:!bg-black hover:!text-white"
          >
            <Loader className="mr-2 h-5 w-5 animate-spin" />
            Verifying...
          </Button>
        ) : (
          <Button
            loading={isLoading}
            disabled={isLoading}
            type="primary"
            htmlType="submit"
            size="large"
            className="!h-10 w-full !rounded-full !border-white !bg-white !font-semibold !text-black !transition-all !duration-300 !ease-in-out hover:!bg-black hover:!text-white"
          >
            Submit
          </Button>
        )}
      </FormWrapper>
    </div>
  );
}
