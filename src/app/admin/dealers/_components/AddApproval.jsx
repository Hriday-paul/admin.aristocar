"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import USelect from "@/components/Form/USelect";
import { useUpdateUserMutation } from "@/redux/api/authApi";
import { ErrorModal, SuccessModal } from "@/utils/modalHook";
import { Button, Modal } from "antd";
import { Loader } from "lucide-react";
import { useState } from "react";

function AddApproval({ children, userId }) {
    const [updateFn, { isLoading }] = useUpdateUserMutation();
    const [open, setOpen] = useState(false)

    const handelSubmit = async (data) => {
        try {
            const re_body = { "vat_type": data?.vat_type, isApproved: true }
            const res = await updateFn({
                id: userId,
                data: re_body,
            }).unwrap();

            if (res?.success) {
                SuccessModal("Dealer approval successfully");
            } else {
                ErrorModal(res?.message);
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
                title={"Accept approval for listing"}
            >
                <FormWrapper onSubmit={handelSubmit}>

                    <USelect
                        type="text"
                        name="vat_type"
                        label="Choose Invoice type "
                        required={true}
                        placeholder="Choose Invoice type"
                        options={[{ label: "Romanian", vlaue: "Romanian VAT" }, { label: "EU with a valid VAT number", value: "Valid vat" }, { label: "Non-EU with a valid VAT number", value: "Invalid vat" }].map(item => {
                            return {
                                value: item?.value,
                                label: item?.label
                            }
                        })}
                    />

                    {isLoading ? (
                        <Button
                            disabled
                            className="!h-11 w-full !rounded-full !border-white !font-medium !transition-all !duration-300 !ease-in-out !bg-black !text-white"
                        >
                            <Loader className="mr-2 h-5 w-5 animate-spin" />
                            Creating in...
                        </Button>
                    ) : (
                        <Button
                            loading={isLoading}
                            disabled={isLoading}
                            htmlType="submit"
                            size="large"
                            className="!h-11 w-full !rounded-full !border-white !font-medium !transition-all !duration-300 !ease-in-out !bg-black !text-white"
                        >
                            Submit
                        </Button>
                    )}
                </FormWrapper>
            </Modal>
        </>
    );
}


export default AddApproval;