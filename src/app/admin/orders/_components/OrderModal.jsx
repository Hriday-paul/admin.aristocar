import { useUpdateOrderMutation } from "@/redux/api/orderApi";
import { showImage } from "@/utils/showImage";
import { Button, Image, Tag } from "antd";
import { Menu } from "antd";
import { Dropdown } from "antd";
import { Modal } from "antd";
import { ChevronDown } from "lucide-react";
import moment from "moment";
import React from "react";
import toast from "react-hot-toast";

const OrderModal = ({ open, setOpen, modalData, setModalData }) => {
  const [UpdateOrder] = useUpdateOrderMutation();
  const renderField = (label, value) => {
    return value ? (
      <div className="flex justify-between">
        <span className="font-medium">{label}:</span>
        <span>{value}</span>
      </div>
    ) : null;
  };

  const orderStatuses = ["pending", "ongoing", "delivered", "cancelled"];
  const disabledStatusMap = orderStatuses.reduce((map, status, index) => {
    map[status] = orderStatuses.slice(0, index);
    return map;
  }, {});

  const handelToUpdateOrderStatus = async (id, status) => {
    toast.loading("Loading...", { id: "...", duration: 3000 });

    try {
      const res = await UpdateOrder({ id, data: { status: status } }).unwrap();
      toast.success(res?.message, { id: "...", duration: 3000 });

      setOpen(false);
      setModalData(null);
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: "...", duration: 3000 });
      //   ErrorResponse(error, "...");
    }
  };
  console.log(modalData?.product?.images[0]?.url);
  return (
    <Modal
      centered
      open={open}
      footer={null}
      onCancel={() => {
        setOpen(false);
        setModalData(null);
      }}
    >
      <div className="w-full p-4 bg-white">
        {/* Header */}
        <div className="mb-4 text-xl font-semibold text-center">
          Order Details
        </div>

        {/* Image Section */}
        {modalData?.product?.images?.length > 0 && (
          <div className="flex justify-center mb-4">
            <Image
              src={showImage(modalData?.product?.images[0]?.url)}
              alt="Product Image"
              height={100}
              width={100}
              className="rounded-md"
            />
          </div>
        )}

        {/* Order Details */}
        <div className="space-y-2">
          {renderField("Order ID", `#${modalData?.id}`)}
          {renderField(
            "Date",
            modalData?.createdAt
              ? moment(modalData?.createdAt).format("lll")
              : null,
          )}
          {renderField("Customer Name", modalData?.user?.name)}
          {modalData?.status && (
            <div className="flex justify-between">
              <span className="font-medium">Status:</span>
              <Dropdown
                overlay={
                  <Menu>
                    {orderStatuses?.map((item) => (
                      <Menu.Item
                        disabled={disabledStatusMap[
                          modalData?.status
                        ]?.includes(item)}
                        className={`${
                          modalData?.status === item &&
                          "bg-[var(--primary-blue)] !text-white"
                        }`}
                        onClick={(e) =>
                          handelToUpdateOrderStatus(modalData?._id, item)
                        }
                        key={item}
                      >
                        {item}
                      </Menu.Item>
                    ))}
                    {/* <Menu.Item>Processing</Menu.Item>
                  <Menu.Item
                    onClick={() => handelToDelivered(params?.id as string)}
                  >
                    Delivered
                  </Menu.Item> */}
                  </Menu>
                }
              >
                <Button
                  className={`font-500 ${
                    (modalData?.status === "pending" &&
                      "!border-[#1b71a7] !text-[#1b71a7]") ||
                    (modalData?.status === "ongoing" &&
                      "!border-[#f7845e] !text-[#f7845e]") ||
                    (modalData?.status === "delivered" &&
                      "!border-[#056e48] !text-[#056e48]") ||
                    (modalData?.status === "cancelled" &&
                      "!border-[#780606] !text-[#780606]")
                  } `}
                >
                  {modalData?.status && modalData?.status} <ChevronDown />
                </Button>
              </Dropdown>
            </div>
          )}
          {renderField("Amount", `€${modalData?.totalAmount}`)}
        </div>

        {/* Billing Details */}
        {modalData?.billingDetails && (
          <div className="pt-4 mt-6 space-y-2 border-t">
            <div className="text-lg font-semibold">Billing Details</div>
            {renderField(
              "Order Type",
              <Tag color="green">
                {modalData?.billingDetails?.orderType === "medicalTag"
                  ? "Medical Tag"
                  : "Items Tag"}
              </Tag>,
            )}
            {renderField("Name", modalData.billingDetails.name)}
            {renderField("Email", modalData.billingDetails.email)}
            {renderField("Phone Number", modalData.billingDetails.phoneNumber)}
            {renderField(
              "Emergency Contact",
              modalData.billingDetails.emergencyContact,
            )}
          </div>
        )}

        {modalData?.billingDetails && (
          <div className="pt-4 mt-6 space-y-2 border-t">
            <div className="text-lg font-semibold">Additional Details</div>
            {modalData?.image && (
              <div className="flex justify-center my-4">
                <Image
                  src={showImage(modalData?.image)}
                  alt="Product Image"
                  title="demo image"
                  height={100}
                  width={100}
                  className="rounded-md"
                />
              </div>
            )}
            {renderField("Tag Name", modalData.billingDetails.tagName)}
            {renderField("Main Doctor", modalData.billingDetails.mainDoctor)}
            {renderField("Blood Type", modalData.billingDetails.bloodType)}
            {renderField("Date of Birth", modalData.billingDetails.dob)}
            {renderField(
              "Health Conditions",
              modalData.billingDetails.healthConditions,
            )} 
          </div>
        )}

        <h2 className="font-semibold text-md">Descriptions: </h2>
        <p>{modalData.billingDetails.description}</p>
      </div>
    </Modal>
  );
};

export default OrderModal;
