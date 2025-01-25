"use client";

import HeaderContainer from "@/components/shared/HeaderContainer/HeaderContainer";
import SidebarContainer from "@/components/shared/SidebarContainer/SidebarContainer";
import { setNotification } from "@/redux/features/notificationSlice";
import { socket } from "@/socket";
import { useMediaQuery } from "@react-hook/media-query";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
const { Content } = Layout;

export default function AdminLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  // Check if small screen
  const screenSizeLessThan1300 = useMediaQuery(
    "only screen and (max-width: 1300px)",
  );

  // Show prompt to collapse sidebar if screen size is less than 1300px
  useEffect(() => {
    if (screenSizeLessThan1300 && !sidebarCollapsed) {
      toast.success(
        "Small screen detected! If content doesn't fit better please collapse the sidebar by clicking the menu button on top-left",
        {
          duration: 2500,
        },
      );
    }
  }, [screenSizeLessThan1300, sidebarCollapsed]);


  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>

      <div className="hidden md:block">
        <SidebarContainer collapsed={sidebarCollapsed} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}></SidebarContainer>
      </div>

      <Layout>

        <HeaderContainer
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          setOpenDrawer={setOpenDrawer}
        ></HeaderContainer>


        <Content
          style={{
            height: "100vh",
            maxHeight: "100vh",
            overflow: "auto",
            backgroundColor: "#232323",

          }}
        >
          <div className="px-5 xl:px-16 pt-12">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
