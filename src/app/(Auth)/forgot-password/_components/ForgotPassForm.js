"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassSchema, loginSchema } from "@/schema/authSchema";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { Button } from "antd";
import { ArrowLeft, Loader } from "lucide-react";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { setToSessionStorage } from "@/utils/sessionStorage";
import { ErrorModal, SuccessModal } from "@/utils/modalHook";
import { useRouter } from "next/navigation";

export default function ForgotPassForm() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const router = useRouter();

  const onSubmit = async (data) => {
    // try {
    //   const res = await forgotPassword(data).unwrap();

    //   if (res?.success) {
    //     SuccessModal(res?.message);

    //     // set token to session storage
    //     setToSessionStorage("forgotPassToken", res.data?.token);

    //     // send to otp verify page
    //     router.push("/otp-verification");
    //   }
    // } catch (error) {
    //   ErrorModal(error?.data?.message);
    // }
  };

  return (
    <div className="w-full bg-black px-6 py-8">
      <Link
        href="/login"
        className="flex-center-start mb-4 gap-x-2 font-medium text-white hover:text-primary-blue"
      >
        <ArrowLeft size={18} /> Back to login
      </Link>

      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold text-white">Forgot Password</h4>
        <p className="text-white">
          Enter your email and we&apos;ll send you an otp for verification
        </p>
      </section>

      <FormWrapper onSubmit={onSubmit} resolver={zodResolver(forgotPassSchema)}>
        <UInput
          name="email"
          type="email"
          label="Email"
          labelStyles={{ color: "white" }}
          placeholder="Enter your email"
          size="large"
          className="!h-10"
        />

        {isLoading ? (
          <Button
            disabled
            className="!h-10 w-full !rounded-full !border-white !bg-white !font-semibold !text-black !transition-all !duration-300 !ease-in-out hover:!bg-black hover:!text-white"
          >
            <Loader className="mr-2 h-5 w-5 animate-spin" />
            Loading in...
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
