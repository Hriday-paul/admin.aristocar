import React, { useRef, useState } from "react";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { Button, Modal } from "antd";
import { Loader, Plus } from "lucide-react";
import UUpload from "@/components/Form/UUpload";
import UseImageUpload from "@/lib/useImageUpload";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/api/categoryApi";
import { ErrorModal, SuccessModal } from "@/utils/modalHook";
import toast from "react-hot-toast";
import UTextArea from "@/components/Form/UTextArea";
import { showImage } from "@/utils/showImage";
import { useUpdateProductMutation } from "@/redux/api/productsApi";
import UTextEditor from "@/components/Form/UTextEditor";
import { CloudUpload } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import Image from "next/image";

export default function EditProductModal({
  open,
  setOpen,
  modalData,
  setModalData,
}) {
  const [updateFn, { isLoading }] = useUpdateProductMutation();
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
    if (description) data.description = description;
    try {
      const formData = new FormData();

      if (images && images?.length > 3) {
        ErrorResponse({ message: "You can only upload up to 3 photos." });
        return;
      }
      if (images?.length > 0) {
        images.forEach((image) => {
          formData.append(`images`, image);
        });
      }

      delete data.image;

      if (data) {
        formData.append("data", JSON.stringify(data));
      }
      const res = await updateFn({
        id: modalData?._id,
        data: formData,
      }).unwrap();
      SuccessModal(res?.message);
      if (res?.success) {
        form.reset();
        setDescription(null);
        setImages([]);
        setOpen(false);
      }
    } catch (error) {
      ErrorModal(error?.message || error?.data?.message);
    } finally {
      toast.dismiss("category");
    }
  };

  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      onCancel={() => {
        setOpen(false);
        setModalData(null);
      }}
      title="Edit Category"
    >
      <FormWrapper onSubmit={handelSubmit} defaultValues={modalData} {...form}>
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
                  width={1200}
                  height={1200}
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
        {/* <UUpload
          label={"Upload category image"}
          name={"image"}
          setSelectedFile={setFile}
          imageUrl={imageUrl || showImage(modalData?.image)}
          max={1}
        /> */}
        <UInput
          type="text"
          name="name"
          label="Name"
          required={true}
          placeholder="Enter Product name"
        />
        <UInput
          type="number"
          name="price"
          label="Price"
          required={true}
          placeholder="Enter Product Price"
        />

        <UTextEditor
          defaultValues={modalData?.description}
          label="Description"
          placeholder="Enter Description"
          name="description"
          height={400}
          onChange={() => {}}
          // onChange={(data) => setDescription(data)}
          onBlur={(data) => setDescription(data)}
        />

        {isLoading ? (
          <Button disabled className="!h-10 w-full !font-semibold">
            <Loader className="mr-2 h-5 w-5 animate-spin" />
            Updating in...
          </Button>
        ) : (
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            className="w-full !border-[#4ade80] !bg-[#4ade80] !transition-all !duration-300 !ease-in-out hover:!bg-transparent hover:!text-[#4ade80]"
          >
            Update
          </Button>
        )}
      </FormWrapper>
    </Modal>
  );
}
