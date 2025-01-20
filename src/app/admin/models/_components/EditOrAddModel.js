"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import USelect from "@/components/Form/USelect";
import { useCreate_modelMutation, useGet_all_brandsQuery, useUpdate_modelMutation } from "@/redux/api/productsApi";
import { addModelSchema } from "@/schema/authSchema";
import { ErrorModal, SuccessModal } from "@/utils/modalHook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal } from "antd";
import { Loader } from "lucide-react";
import { useState } from "react";

function EditOrAddModel({ children, defaultData, isEdit }) {
    const { isLoading: brandLoading, data: branddata, isSuccess } = useGet_all_brandsQuery()
    const [open, setOpen] = useState(false)
    const [updateFn, { isLoading: updateLoading }] = useUpdate_modelMutation();
    const [createFn, { isLoading: addLoading }] = useCreate_modelMutation();

    const handelSubmit = async (data) => {
        const req_body = {
            brandId: data?.brand,
            modelName: data?.model_name
        }

        try {
            if (isEdit) {

                const res = await updateFn({ id: defaultData?.id, data: req_body }).unwrap();

                SuccessModal(res?.message);
            } else {
                const res = await createFn(req_body).unwrap();

                SuccessModal(res?.message);
            }
        } catch (error) {
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
                title={isEdit ? "Edit Model Name" : "Add New Model"}
            >
                <FormWrapper onSubmit={handelSubmit} defaultValues={{ model_name: defaultData?.model_name, brand: defaultData?.brand }} resolver={zodResolver(addModelSchema)}>


                    <USelect
                        type="text"
                        name="brand"
                        label="Choose Brand"
                        loading={brandLoading}
                        required={true}
                        placeholder="Choose a Brand"
                        defaultValue={defaultData?.brand}
                        options={isSuccess ? branddata?.data?.data?.map(item => {
                            return {
                                value: item?._id,
                                label: item?.brandName
                            }
                        }) : []}
                    />

                    <UInput
                        type="text"
                        name="model_name"
                        label="Model Name"
                        required={true}
                        placeholder="Enter model name"
                    />

                    {(updateLoading || addLoading) ? (
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


export default EditOrAddModel;