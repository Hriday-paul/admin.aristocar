"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import UTextArea from "@/components/Form/UTextArea";
import { useCreatePackagerMutation, useUpdatePackageMutation } from "@/redux/api/packageApi";
import { addPackageSchema } from "@/schema/authSchema";
import { ErrorModal, SuccessModal } from "@/utils/modalHook";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Modal } from "antd";
import { Loader } from "lucide-react";
import { useState } from "react";

export default function CreateProductModal({ children, isEdit, data: prevData }) {
    const [editFn, { isLoading: editLoading }] = useUpdatePackageMutation()
    const [open, setOpen] = useState(false)
    const [createPr, { isLoading: addLoading }] = useCreatePackagerMutation();


    const handelSubmit = async (data) => {

        const req_body = {
            "title": data?.name,
            shortTitle: data?.name,
            "price": Number(data?.price),
            shortDescription: data?.description,
            "carCreateLimit": Number(data?.limit),
            durationDay: Number(data?.duration)
        }

        try {
            if (isEdit) {

                const res = await editFn({ id: prevData?.id, data: req_body }).unwrap();

                SuccessModal(res?.message);
                if (res?.success) {
                    // form.reset();
                    setOpen(false);
                }
            } else {
                const res = await createPr(req_body).unwrap();

                SuccessModal(res?.message);
                if (res?.success) {
                    // form.reset();
                    setOpen(false);
                }
            }


        } catch (error) {
            console.log(error);
            ErrorModal(error?.message || error?.data?.message || "Something went wrong, try again");
        } finally {
            setOpen(false)
        }
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
                title={isEdit ? "Edit package" : "Create package"}
            >
                <FormWrapper onSubmit={handelSubmit} defaultValues={{
                    name: prevData?.title,
                    price: prevData?.price,
                    description: prevData?.details,
                    limit: prevData?.limit,
                    duration: prevData?.duration
                }} resolver={zodResolver(addPackageSchema)}>

                    <UInput
                        type="text"
                        name="name"
                        label="Name"
                        required={true}
                        placeholder="Enter Package Title"
                        defaultValue={prevData?.title}
                    />
                    <UInput
                        type="number"
                        name="price"
                        label="Price"
                        required={true}
                        placeholder="Enter Package Price"
                    />
                    <UInput
                        type="number"
                        name="limit"
                        label="Listing Limit"
                        required={true}
                        placeholder="Enter Listing limit"
                    />

                    <UInput
                        type="number"
                        name="duration"
                        label="Duration day"
                        required={true}
                        placeholder="eg: 30 days"
                    />

                    <UTextArea
                        label="Description"
                        placeholder="Enter Description"
                        name="description"
                        required={true}
                    />
                    {(editLoading || addLoading) ? (
                        <Button disabled className="!h-11 w-full !rounded-full !border-white !font-medium !transition-all !duration-300 !ease-in-out !bg-black !text-white">
                            <Loader className="mr-2 h-5 w-5 animate-spin" />
                            {editLoading ? "Loading..." : "Creating..."}
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
