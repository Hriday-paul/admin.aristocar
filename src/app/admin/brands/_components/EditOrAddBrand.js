"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UCheckbox from "@/components/Form/UCheckbox";
import UInput from "@/components/Form/UInput";
import UUpload from "@/components/Form/UUpload";
import { useCreateBrandMutation, useUpdate_brandMutation } from "@/redux/api/productsApi";
import { addBrandSchema } from "@/schema/authSchema";
import { ErrorModal, SuccessModal } from "@/utils/modalHook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal } from "antd";
import { CloudUpload, Loader, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const EditOrAddBrand = ({ children, defaultData, isEdit }) => {

    const [updateFn, { isLoading: editLoading }] = useUpdate_brandMutation()
    const [createFn, { isLoading: addLoading }] = useCreateBrandMutation();

    const [open, setOpen] = useState(false);
    const [image, setImage] = useState({ upload: '', default: defaultData?.image });

    const fileInputRef = useRef(null);

    const handleIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handelSubmit = async (data) => {
        console.log(data)

        const req_body = {
            brandName: data?.brand_name,
            isHome: data?.isHome
        }

        if (data?.isHome && !image?.upload && !isEdit) {
            toast.error("Upload a Brand logo")
            return;
        }

        if (data?.isHome && !image?.upload && isEdit && !defaultData?.image) {
            toast.error("Upload a Brand logo")
            return;
        }

        const form = new FormData();

        form.append('data', JSON.stringify(req_body));

        if (data?.isHome && image?.upload && !isEdit) {
            form.append('image', image?.upload)
        }
        if (data?.isHome && isEdit) {
            form.append('image', image?.upload)
        }

        try {
            if (isEdit) {

                const res = await updateFn({ id: defaultData?.id, data: form }).unwrap();

                SuccessModal(res?.message);
                if (res?.success) {
                    setOpen(false);
                }
            } else {


                const res = await createFn(form).unwrap();

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
                <FormWrapper onSubmit={handelSubmit} defaultValues={{ brand_name: defaultData?.brand_name, isHome: defaultData?.isHome || false}} resolver={zodResolver(addBrandSchema)}>

                    <UInput
                        type="text"
                        name="brand_name"
                        label="Brand Name"
                        required={true}
                        placeholder="Enter brand name"
                    />

                    <UCheckbox
                        type="checkbox"
                        name="isHome"
                        label="Visible in home"
                        defaultValue={defaultData?.isHome}
                        className={'!text-left'}
                        size={'large'}
                    />

                    <div className="w-full">
                        <div onClick={handleIconClick}
                            className="text-primary my-4 flex h-20 w-full items-center justify-center rounded-lg border border-gray-400 hover:cursor-pointer"
                        >
                            <div className="flex flex-col items-center justify-center">
                                {" "}
                                <CloudUpload size={32} color="gray" />
                                <p className="font-semibold text-gray-500">Upload Logo max (140 X 140) for better ui</p>
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            id={"image"}
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={(e) => setImage(() => {
                                return { upload: e?.target?.files[0], default: null }
                            })}
                        />

                        {(image?.upload || image?.default) && <div
                            className="border-primary text-primary mt-3 flex w-full items-center justify-between border px-2 py-3"
                        >
                            <Image
                                height={1200}
                                width={1200}
                                src={image?.upload ? URL.createObjectURL(image?.upload) : image?.default}
                                alt="logo"
                                className="mx-auto h-full max-h-10 w-auto rounded"
                            />
                            <Trash2
                                size={22}
                                className="hover:cursor-pointer"
                                onClick={() => setImage({})}
                            />
                        </div>}

                    </div>


                    {/* <input type="checkbox" /> */}

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