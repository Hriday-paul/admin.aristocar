"use client";

import { LogoSvg } from "@/assets/logos/LogoSvg";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { resetPassSchema } from "@/schema/authSchema";
import { SuccessModal } from "@/utils/modalHook";
import { removeFromSessionStorage } from "@/utils/sessionStorage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { ArrowLeft, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function SetPasswordForm() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      const res = await resetPassword(data).unwrap();

      if (res?.success) {
        SuccessModal(
          "Password updated successfully",
          "Please login with the new password",
        );

        router.push("/login");

        // remove the forget pass token
        removeFromSessionStorage("forgotPassToken");
      }
    } catch (error) {
      console.log(error);
      ErrorModal(error?.data?.message);
    }
  };

  return (
    <div className="px-6 py-8 bg-black">
      <Link
        href="/login"
        className="mb-4 font-medium text-white flex-center-start gap-x-2 hover:text-primary-blue"
      >
        <ArrowLeft size={18} /> Back to login
      </Link>

      <section className="mb-8 space-y-2 text-white">
        <h4 className="text-3xl font-semibold">Set New Password</h4>
        <p className="">Enter your new password login</p>
      </section>

      <FormWrapper onSubmit={onSubmit} resolver={zodResolver(resetPassSchema)}>
        <UInput
        labelStyles={{color:"white"}}
          name="newPassword"
          label="New Password"
          type="password"
          placeholder="*************"
          size="large"
          className="!mb-0 !h-10"
        />

        <UInput
         labelStyles={{color:"white"}}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="*************"
          size="large"
          className="!mb-0 !h-10"
        />
        {isLoading ? (
          <Button
            disabled
            className="!h-10 w-full !rounded-full !border-white !bg-white !font-semibold !text-black !transition-all !duration-300 !ease-in-out hover:!bg-black hover:!text-white"
          >
            <Loader className="w-5 h-5 mr-2 animate-spin" />
            Updating...
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
