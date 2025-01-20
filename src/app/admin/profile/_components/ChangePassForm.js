"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import {
  changePasswordSchema,
  editProfileSchema,
} from "@/schema/profileSchema";
import { ErrorModal, SuccessModal } from "@/utils/modalHook";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConfigProvider } from "antd";
import { Button } from "antd";
import { Loader } from "lucide-react";

export default function ChangePassForm() {
  const [changePasswordFn, { isLoading }] = useChangePasswordMutation();

  const handleSubmit = async (data) => {
    try {
      const res = await changePasswordFn(data).unwrap();
      SuccessModal("Password changed successfully");
    } catch (err) {
      ErrorModal(err?.message || err?.data?.message);
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorIcon: "#d3d3d3",
          },
        },
      }}
    >
      <section className="mt-5 px-10">
        {/* <h4></h4> */}
        <FormWrapper
          onSubmit={handleSubmit}
          resolver={zodResolver(changePasswordSchema)}
          className="custom-placeholder-white"
        >
          <UInput
            style={{ background: "none", color: "white" }}
            name="oldPassword"
            label="Old Password"
            type="password"
            placeholder="***********"
          />
          <UInput
            name="newPassword"
            label="New Password"
            style={{ background: "none", color: "white" }}
            type="password"
            placeholder="***********"
          />
          <UInput
            name="confirmPassword"
            label="Confirm Password"
            style={{ background: "none", color: "white" }}
            type="password"
            placeholder="***********"
          />
          {isLoading ? (
            <Button
              disabled
              className="w-full !border-[#4ade80] !bg-[#4ade80] !transition-all !duration-300 !ease-in-out hover:!bg-transparent hover:!text-[#4ade80]"
            >
              <Loader className="mr-2 h-5 w-5 animate-spin" />
              saving...
            </Button>
          ) : (
            <Button
              htmlType="submit"
              className="w-full !border-[#4ade80] !bg-[#4ade80] !transition-all !duration-300 !ease-in-out hover:!bg-transparent hover:!text-[#4ade80]"
              size="large"
              type="primary"
            >
              Save
            </Button>
          )}
        </FormWrapper>
      </section>
    </ConfigProvider>
  );
}
