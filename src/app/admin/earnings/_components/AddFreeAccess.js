"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import UTextArea from "@/components/Form/UTextArea";
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

function AddFreeAccess({ children }) {
    const [open, setOpen] = useState(false)
    const [createPr, { isLoading }] = useCreateProductMutation();

    const form = useForm();

    const handelSubmit = async (data) => {

        // try {
        //     const formData = new FormData();

        //     formData.append("data", JSON.stringify(data));

        //     const res = await createPr(formData).unwrap();

        //     SuccessModal(res?.message);
        //     if (res?.success) {
        //         form.reset();
        //         setOpen(false);
        //     }
        // } catch (error) {
        //     console.log(error);
        //     ErrorModal(error?.message || error?.data?.message);
        // } finally {
        //     toast.dismiss("category");
        // }
    };

    return (
        <>
            <span onClick={() => setOpen(true)}>
                {children}
            </span>
            <Modal
                centered
                open={open}
                setOpen={setOpen}
                footer={null}
                onCancel={() => {
                    setOpen(false);
                }}
                title={"Add Free Access"}
            >
                <FormWrapper onSubmit={handelSubmit} {...form}>

                    <UInput
                        type="number"
                        name="active_days"
                        label="Avaliable day"
                        required={true}
                        placeholder="Enter Active day"
                        defaultValue={0}
                    />
                    <UInput
                        type="number"
                        name="max_list"
                        label="Max list amount"
                        required={true}
                        placeholder="Enter List Amount"
                    />
                    {/* <UTextEditor
          label="Description"
          placeholder="Enter Description"
          name="description"
          height={400}
          // onChange={(data) => setDescription(data)}
          onBlur={(data) => setDescription(data)}
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


export default AddFreeAccess;