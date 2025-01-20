"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { useCreateBrandMutation, useUpdate_brandMutation } from "@/redux/api/productsApi";
import { addBrandSchema } from "@/schema/authSchema";
import { ErrorModal, SuccessModal } from "@/utils/modalHook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal } from "antd";
import { Loader } from "lucide-react";
import { useState } from "react";

function EditOrAddBrand({ children, defaultData, isEdit }) {
    const [open, setOpen] = useState(false)
    const [updateFn, { isLoading: editLoading }] = useUpdate_brandMutation()
    const [createFn, { isLoading: addLoading }] = useCreateBrandMutation();

    const handelSubmit = async (data) => {
        const req_body = {
            brandName: data?.brand_name
        }

        try {
            if (isEdit) {

                const res = await updateFn({ id: defaultData?.id, data: req_body }).unwrap();

                SuccessModal(res?.message);
                if (res?.success) {
                    setOpen(false);
                }
            } else {
                const res = await createFn(req_body).unwrap();

                SuccessModal(res?.message);
                if (res?.success) {
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
                title={isEdit ? "Edit Brand Name" : "Add New Brand"}
            >
                <FormWrapper onSubmit={handelSubmit} defaultValues={{ brand_name: defaultData?.brand_name }} resolver={zodResolver(addBrandSchema)}>

                    <UInput
                        type="text"
                        name="brand_name"
                        label="Brand Name"
                        required={true}
                        placeholder="Enter brand name"
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


export default EditOrAddBrand;