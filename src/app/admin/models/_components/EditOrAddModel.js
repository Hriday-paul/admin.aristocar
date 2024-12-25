"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import USelect from "@/components/Form/USelect";
import { useCreateProductMutation } from "@/redux/api/productsApi";
import { ErrorModal, SuccessModal } from "@/utils/modalHook";
import { Button, Modal } from "antd";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

function EditOrAddModel({ children, defaultData, isEdit }) {
    const [open, setOpen] = useState(false)
    const [createPr, { isLoading }] = useCreateProductMutation();

    const form = useForm({
        defaultValues: {
            brand_name: defaultData?.model_name,
            brand : defaultData?.brand
        }
    });

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

    const dummyBrandData = [
        {
            id: 1,
            name: "SUV"
        },
        {
            id: 2,
            name: "BMW"
        },
        {
            id: 3,
            name: "Audit"
        },
        {
            id: 4,
            name: "SUV"
        },
    ]

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
                <FormWrapper onSubmit={handelSubmit} {...form} defaultValues={{ model_name: defaultData?.model_name, brand: defaultData?.brand }}>

                    <UInput
                        type="text"
                        name="model_name"
                        label="Model Name"
                        required={true}
                        placeholder="Enter model name"
                    />
                    <USelect
                        type="text"
                        name="brand"
                        label="Choose Brand"
                        required={true}
                        placeholder="Choose a Brand"
                        defaultValue={defaultData?.brand}
                        options={dummyBrandData?.map(item => {
                            return {
                                value: item?.name,
                                label: item?.name
                            }
                        })}
                    />

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


export default EditOrAddModel;