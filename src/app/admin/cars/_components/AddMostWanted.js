"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import UTextEditor from "@/components/Form/UTextEditor";
import { useCreateProductMutation } from "@/redux/api/productsApi";
import { ErrorModal, SuccessModal } from "@/utils/modalHook";

import { Button, Modal } from "antd";
import { CloudUpload } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const  AddMostWanted = ({ children, id })=> {
  
  const [open, setOpen] = useState(false)
  const [createFn, { isLoading }] = useCreateProductMutation();
  const [description, setDescription] = useState(null);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const form = useForm();

  const handleIconClick = () => {
    // Programmatically click the hidden file input
    if (fileInputRef.current) {
      //@ts-ignore
      fileInputRef.current.click();
    }
  };

  const handelSubmit = async (data) => {
    data.description = description;
    // try {
    //   if (!images?.length) {
    //     return ErrorModal("Please Select images");
    //   }
    //   const formData = new FormData();

    //   if (images?.length > 3) {
    //     ErrorResponse({ message: "You can only upload up to 3 photos." });
    //     return;
    //   }

    //   images.forEach((image) => {
    //     formData.append(`images`, image);
    //   });

    //   formData.append("data", JSON.stringify(data));

    //   const res = await createFn(formData).unwrap();

    //   SuccessModal(res?.message);
    //   if (res?.success) {
    //     form.reset();
    //     setDescription(null);
    //     setImages([]);
    //     setOpen(false);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   ErrorModal(error?.message || error?.data?.message);
    // } finally {
    //   toast.dismiss("category");
    // }
  };
  return (
    <>
      <span onClick={() => setOpen(true)}>{children}</span>
      <Modal
        centered
        open={open}
        setOpen={setOpen}
        footer={null}
        onCancel={() => {
          setOpen(false);
        }}
        title="Add Most Wanted Car"
      >
        <FormWrapper onSubmit={handelSubmit} {...form}>
          <div className="w-full">
            <div
              className="text-primary my-4 flex h-20 w-full items-center justify-center rounded-lg border border-gray-400 hover:cursor-pointer"
              onClick={handleIconClick}
            >
              <div className="flex flex-col items-center justify-center">
                {" "}
                <CloudUpload size={32} color="gray" />
                <p className="font-semibold text-gray-500">Upload images</p>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => setImages((pre) => [...pre, e?.target?.files[0]])}
            />
            {images &&
              images?.length > 0 &&
              images?.map((bann, i) => (
                <div
                  key={i}
                  className="border-primary text-primary mt-3 flex w-full items-center justify-between border px-2 py-3"
                >
                  <Image
                    height={1200}
                    width={1200}
                    src={URL.createObjectURL(bann)}
                    alt="Banner"
                    className="mx-auto h-full max-h-10 w-auto rounded"
                  />
                  <Trash2
                    size={22}
                    className="hover:cursor-pointer"
                    onClick={() =>
                      setImages((pre) => pre.filter((b) => b !== bann))
                    }
                  />
                </div>
              ))}
          </div>
          {/* <UMultiUpload
          label={"Upload Product image"}
          name="images"
          required={true}
          multiple={true}
          max={5}
        /> */}
          <UTextEditor
            label="Description"
            placeholder="Enter Description"
            name="description"
            height={400}
            // onChange={(data) => setDescription(data)}
            onBlur={(data) => setDescription(data)}
          />

          <UInput
            type="text"
            name="link"
            label="Include link"
            required={true}
            placeholder="Add link"
          />

          {/* <UTextArea
          label="Description"
          placeholder="Enter Description"
          name="description"
        /> */}
          {isLoading ? (
            <Button disabled className="!h-10 w-full !font-semibold">
              <Loader className="mr-2 h-5 w-5 animate-spin" />
              Creating in...
            </Button>
          ) : (
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="w-full !border-[#4ade80] !bg-[#4ade80] !transition-all !duration-300 !ease-in-out hover:!bg-transparent hover:!text-[#4ade80]"
            >
              Submit
            </Button>
          )}
        </FormWrapper>
      </Modal>
    </>
  );
}


export default AddMostWanted
