"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/authSchema";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
// import { LogoSvg } from "@/assets/logos/LogoSvg";
import { Button } from "antd";
import { useSignInMutation } from "@/redux/api/authApi";
import { ErrorModal, SuccessModal } from "@/utils/modalHook";
import { Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
// import { setToSessionStorage } from "@/utils/sessionStorage";

export default function LoginForm() {
  // const [signIn, { isLoading }] = useSignInMutation();
  const isLoading = false
  const userId = useSelector((state) => state.auth?.user?.userid);
  const dispatch = useDispatch();
  const router = useRouter();

  if (userId) {
    router.push("/admin/dashboard");
  }
  const onLoginSubmit = async (data) => {
    try {
      const dummyUser = {
        userId: '675a6f97a0e571a3f206e81a',
        role: "admin",
        iat: 1734927628,
        exp: 1737519628
      }
      const dummyToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzVhNmY5N2EwZTU3MWEzZjIwNmU4MWEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzQ5Mjc2MjgsImV4cCI6MTczNzUxOTYyOH0.cadCO8CnHkhlDyUXXa59yXHnbqRwPbgpGxKDKQTn_-g"
      dispatch(
        // setUser({
        //   user: jwtDecode(res?.data?.accessToken),
        //   token: res?.data?.accessToken,
        // }),
        setUser({
          user: dummyUser,
          token: dummyToken,
        }),
      );
      router.push("/admin/dashboard");
      router.refresh()
      // const res = await signIn(data).unwrap();
      // if (res?.success) {
      //   SuccessModal("Login Successful");
      //   // set user

      //   dispatch(
      //     // setUser({
      //     //   user: jwtDecode(res?.data?.accessToken),
      //     //   token: res?.data?.accessToken,
      //     // }),
      //     setUser({
      //       user: dummyUser,
      //       token: dummyToken,
      //     }),
      //   );
      //   // send user back or home
      //   router.push("/admin/dashboard");
      //   router.refresh();
      // }
    } catch (error) {
      // console.log(error);
      // ErrorModal(error?.message || error?.data?.message);
    }
  };

  return (
    <div className="w-full rounded-none bg-[#010101] px-6 py-8 text-white shadow-none shadow-primary-blue/10">
      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold">Admin Login</h4>
        <p className="">Enter your email and password to access admin panel</p>
      </section>

      <FormWrapper onSubmit={onLoginSubmit} resolver={zodResolver(loginSchema)} defaultValues={{ email: "admin@gmail.com", password: "112233" }}>
        <UInput
          name="email"
          type="email"
          labelStyles={{ color: "white" }}
          label="Email"
          placeholder="Enter your email"
          size="large"
          className="!h-10"
        />

        <UInput
          name="password"
          label="Password"
          labelStyles={{ color: "white" }}
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
            <Loader className="mr-2 h-5 w-5 animate-spin" />
            Singing in...
          </Button>
        ) : (
          <Button
            loading={isLoading}
            disabled={isLoading}
            htmlType="submit"
            size="large"
            className="!h-10 w-full !rounded-full !border-white !bg-white !font-semibold !text-black !transition-all !duration-300 !ease-in-out hover:!bg-black hover:!text-white"
          >
            SIGN IN
          </Button>
        )}

        <Link
          href="/forgot-password"
          className="mt-3 block text-center font-medium text-white hover:text-primary-blue"
        >
          I forgot my password
        </Link>
      </FormWrapper>
    </div>
  );
}
