"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UTextArea from "@/components/Form/UTextArea";
import { useAdd_most_wantedMutation, useUpdate_carMutation, useUpdate_most_wantedMutation } from "@/redux/api/productsApi";
import { addMostWantedSchema } from "@/schema/authSchema";
import { ErrorModal, SuccessModal } from "@/utils/modalHook";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Modal } from "antd";
import { CloudUpload } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const AddMostWanted = ({ children, id, isEdit = false, defaultData }) => {
  console.log(defaultData)

  const [open, setOpen] = useState(false)
  const [updateFn, { isLoading: updateLoading }] = useUpdate_carMutation();
  const [image, setImage] = useState('');
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handelSubmit = async (data) => {
    try {

      if (isEdit) {

        let req_body;

        // ---------generate a form data if has banner image-----------------
        const form = new FormData();
        form.append("bannerImage", image)
        form.append("data", JSON.stringify({
          "discription": data?.description,
          "isMostWanted": "true"
        }))

        if (image) {
          req_body = form
        } else {
          req_body = {
            bannerImage: defaultData?.image,
            discription: data?.description,
            "isMostWanted": "true"
          }
        }

        const res = await updateFn({ id: id, data: req_body }).unwrap();

        SuccessModal(res?.message);
      }

      else {
        if (!image) {
          toast.error('Need a banner image')
          return;
        }
        const form = new FormData();
        form.append("bannerImage", image)
        form.append("data", JSON.stringify({
          "discription": data?.description,
          "isMostWanted": "true"
        }))
        const res = await updateFn({ data: form, id: id }).unwrap();

        SuccessModal(res?.message || 'most wanted added successfully');
      }
    } catch (error) {
      ErrorModal(error?.message || error?.data?.message || "Something went wrong, try again");
    } finally {
      setOpen(false)
    }
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
        <FormWrapper onSubmit={handelSubmit} resolver={zodResolver(addMostWantedSchema)} defaultValues={{ description: defaultData?.description }}>
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
              accept="image/*"
              onChange={(e) => setImage(() => e?.target?.files[0])}
            />
            {(image || defaultData?.image.length > 0) && <div
              className="border-primary text-primary mt-3 flex w-full items-center justify-between border px-2 py-3"
            >
              <Image
                height={1200}
                width={1200}
                src={image ? URL.createObjectURL(image) : defaultData?.image[0]?.url}
                alt="Banner"
                className="mx-auto h-full max-h-10 w-auto rounded"
              />
              <Trash2
                size={22}
                className="hover:cursor-pointer"
                onClick={() =>
                  setImage('')
                }
              />
            </div>

            }
          </div>

          <UTextArea
            label="Description"
            placeholder="Enter Description"
            name="description"
          />

          {(updateLoading) ? (
            <Button disabled className="!h-11 w-full !rounded-full !border-white !font-medium !transition-all !duration-300 !ease-in-out !bg-black !text-white">
              <Loader className="mr-2 h-5 w-5 animate-spin" />
              {updateLoading ? "Loading..." : "Creating..."}
            </Button>
          ) : (
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="!h-11 w-full !rounded-full !border-white !font-medium !transition-all !duration-300 !ease-in-out !bg-black !text-white"
            >
              {isEdit ? "Update" : "Submit"}
            </Button>
          )}
        </FormWrapper>
      </Modal>
    </>
  );
}


export default AddMostWanted
