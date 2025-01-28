"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import {
  useGetTermsContentsQuery,
  useUpdateTermsContentMutation,
} from "@/redux/api/contentApi";
import { ErrorModal, SuccessModal } from "@/utils/modalHook";
import { Button } from "antd";
import { Edit, Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export default function TermsContainer() {
  const { data: data } = useGetTermsContentsQuery();
  const [updateFn, { isLoading }] = useUpdateTermsContentMutation();
  const [content, setContent] = useState("");
  const editor = useRef(null);

  const onSubmit = async () => {
    const tastload = toast.loading('loading....')
    try {
      const res = await updateFn({
        description: content,
      }).unwrap();
      if (res?.status == "success") {
        SuccessModal("AboutUs is updated");
      }
    } catch (error) {
      ErrorModal("Error updating AboutUs");
    } finally {
      toast.dismiss(tastload);
    }
  };


  return (
    <section>
      <h3 className="mb-6 text-2xl font-semibold text-[#4ade80]">About Us</h3>

      <FormWrapper>
        <JoditEditor
          ref={editor}
          value={data?.data?.description}
          config={{
            //@ts-ignore
            uploader: { insertImageAsBase64URI: true }, height: 400,
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
              <Loader className="w-5 h-5 mr-2 animate-spin" />
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
