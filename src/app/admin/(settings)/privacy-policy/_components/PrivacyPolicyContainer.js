"use client";

import FormWrapper from "@/components/Form/FormWrapper";

import { ErrorModal, SuccessModal } from "@/utils/modalHook";
import { Button } from "antd";
import { Edit, Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useGetPrivacyContentsQuery, useUpdatePrivacyContentMutation } from "@/redux/api/contentApi";
import { ImSpinner8 } from "react-icons/im";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export default function PrivacyPolicyContainer() {
  const [content, setContent] = useState("");
  const editor = useRef(null);

  const { data: privacyPolicyRes, isLoading: getLoading, isSuccess } = useGetPrivacyContentsQuery();
  const [updateFn, { isLoading }] = useUpdatePrivacyContentMutation();

  const onSubmit = async () => {
    const toastLoad = toast.loading('loading....')
    try {
      const res = await updateFn({
        description: content,
      }).unwrap();
      if (res?.status == 'success') {
        SuccessModal("Privacy policy is updated");
      }
    } catch (error) {
      ErrorModal("Error updating privacy policy");
    } finally {
      toast.dismiss(toastLoad);
    }
  };

  return (
    <section>
      <h3 className="mb-6 text-2xl font-semibold text-[#4ade80]">
        Privacy Policy
      </h3>

      {getLoading ? <div className="min-h-80 flex justify-center items-center">
        <ImSpinner8 className="text-4xl text-white animate-spin" />
      </div> : isSuccess ? <FormWrapper>
        <JoditEditor
          ref={editor}
          value={privacyPolicyRes?.data?.description}
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
      </FormWrapper> : <></>}

    </section>
  );
}
