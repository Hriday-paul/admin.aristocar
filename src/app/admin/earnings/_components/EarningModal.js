"use client";

import { Modal } from "antd";
import Image from "next/image";
import userImage from "@/assets/images/user-avatar-lg.png";
import { Tag } from "antd";
import moment from "moment";

export default function EarningModal({
  open,
  setOpen,
  modalData,
  setModalData,
}) { 
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
      title="Transaction Details"
    >
      <div className="gap-4 p-3 px-5 flex-center-between rounded-xl bg-demin-primary-50">
        <div className="flex-center-start gap-x-2">
          {modalData?.user?.profile ? (
            <Image
              src={modalData?.user?.profile}
              alt="user image"
              height={2400}
              width={2400}
              className="h-auto rounded-full aspect-square w-14"
            />
          ) : (
            <div className="font-500 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white">
              <p className="text-2xl">
                {modalData?.user?.email?.slice(0, 2)?.toUpperCase()}
              </p>
            </div>
          )}

          <h4 className="text-lg font-semibold">
            {modalData?.user?.name ? modalData?.user?.name : "N/A"}
          </h4>
        </div>

        <p className="text-xl font-semibold">€{modalData?.totalAmount}</p>
      </div>

      <section className="px-4 my-4 space-y-5 text-lg font-medium">
        <div className="flex-center-between">
          <span>Status :</span>
          {modalData?.isPaid && (
            <Tag color="green" className="!m-0!text-sm">
              Paid
            </Tag>
          )}
        </div>

        <div className="flex-center-between">
          <span>Package :</span>
          <Tag className="!m-0 !text-sm" color="blue">
            Basic
            {/* {modalData?.product?.name ?? modalData?.product?.name} */}
          </Tag>
        </div>

        <div className="flex-center-between">
          <span>Transaction ID :</span>
          <span>{modalData?.trnId ?? modalData?.trnId}</span>
        </div> 
        <div className="flex-center-between">
          <span>Date :</span>
          <span>{moment(modalData?.updatedAt).format("lll")}</span>
        </div>
      </section>
    </Modal>
  );
}
