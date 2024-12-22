"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UTextEditor from "@/components/Form/UTextEditor";
import {
  useGetContentsQuery,
  useUpdateContentMutation,
} from "@/redux/api/contentApi";

import { ErrorModal, SuccessModal } from "@/utils/modalHook";
import { Button } from "antd";
// import JoditEditor from "jodit-react";
import { Edit, Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export default function PrivacyPolicyContainer() {
  const [content, setContent] = useState("");
  const editor = useRef(null);
  const { data: privacyPolicyRes, isSuccess } = useGetContentsQuery();
  const [updateFn, { isLoading }] = useUpdateContentMutation();
  const privacyPolicyData =
    privacyPolicyRes?.data?.data[0]?.privacyPolicy || "";

  const onSubmit = async () => {
    // try {
    //   const res = await updateFn({
    //     privacyPolicy: content,
    //   }).unwrap();
    //   if (res?.success) {
    //     SuccessModal("Privacy policy is updated");
    //   }
    // } catch (error) {
    //   ErrorModal("Error updating privacy policy");
    // } finally {
    //   toast.dismiss("content");
    // }
  };

  return (
    <section>
      <h3 className="mb-6 text-2xl font-semibold text-[#4ade80]">
        Privacy Policy
      </h3>

      <FormWrapper>
        <JoditEditor
          ref={editor}
          value={privacyPolicyData}
          config={{
            //@ts-ignore
            uploader: { insertImageAsBase64URI: true },
            height: 400,
          }}
          onBlur={(newContent) => {
            setContent(newContent);
          }}
        />
        <div className="mt-5">
          {isLoading ? (
            <Button
              disabled
              className="w-full !border-[#4ade80] !bg-[#4ade80] !transition-all !duration-300 !ease-in-out hover:!bg-transparent hover:!text-[#4ade80]"
            >
              <Loader className="mr-2 h-5 w-5 animate-spin" />
              Updating in...
            </Button>
          ) : (
            <Button
              type="primary"
              size="large"
              onClick={onSubmit}
              className="w-full !border-[#4ade80] !bg-[#4ade80] !transition-all !duration-300 !ease-in-out hover:!bg-transparent hover:!text-[#4ade80]"
              icon={<Edit size={18} />}
            >
              Save Changes
            </Button>
          )}
        </div>
      </FormWrapper>
    </section>
  );
}
