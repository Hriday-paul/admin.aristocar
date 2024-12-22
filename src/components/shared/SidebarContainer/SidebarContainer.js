"use client";

import "./Sidebar.css";
import logo from "../../../../public/favicon1.svg";
import { logout } from "@/redux/features/authSlice";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { CircleDollarSign } from "lucide-react";
import { Shapes } from "lucide-react";
import { ScrollText } from "lucide-react";
import { Table } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { ShoppingBasket } from "lucide-react";
import { LogOut } from "lucide-react";
import { SlidersVertical } from "lucide-react";
import { Podcast } from "lucide-react";
import { CircleUser } from "lucide-react";
import { House } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const SidebarContainer = ({ collapsed }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Logout handler
  const onClick = (e) => {
    if (e.key === "logout") {
      dispatch(logout());
      router.push("/");

      Success_model({ title: "Logout successful" });
    }
  };

  const navLinks = [
    {
      key: "dashboard",
      icon: <LayoutDashboard size={21} strokeWidth={2} />,
      label: <Link href={"/admin/dashboard"}>Dashboard</Link>,
    },
    {
      key: "earnings",
      icon: <CircleDollarSign size={21} strokeWidth={2} />,
      label: <Link href={"/admin/earnings"}>Earnings</Link>,
    },
    {
      key: "account-details",
      icon: <CircleUser size={21} strokeWidth={2} />,
      label: <Link href={"/admin/account-details"}>Account Details</Link>,
    },
    {
      key: "manage-subscription",
      icon: <Podcast size={21} strokeWidth={2} />,
      label: (
        <Link href={"/admin/manage-subscription"}>Manage Subscriptions</Link>
      ),
    },
    {
      key: "Products",
      icon: <ShoppingBasket size={21} strokeWidth={2} />,
      label: <Link href={"/admin/cars"}>Cars</Link>,
    },
    // {
    //   key: "orders",
    //   icon: <Table size={21} strokeWidth={2} />,
    //   label: <Link href={"/admin/orders"}>Orders</Link>,
    // },
    {
      key: "settings",
      icon: <SlidersVertical size={21} strokeWidth={2} />,
      label: "Settings",
      children: [
        {
          key: "privacy-policy",
          icon: <ScrollText size={21} strokeWidth={2} />,
          label: <Link href="/admin/privacy-policy">Privacy Policy</Link>,
        },
        // {
        //   key: "terms-conditions",
        //   icon: <ScrollText size={21} strokeWidth={2} />,
        //   label: <Link href="/admin/terms-conditions">Terms & Conditions</Link>,
        // },
        {
          key: "about-us",
          icon: <ScrollText size={21} strokeWidth={2} />,
          label: <Link href="/admin/about-us">About Us</Link>,
        },
      ],
    },
    {
      key: "logout",
      icon: <LogOut size={21} strokeWidth={2} />,
      label: <Link href="/login">Logout</Link>,
    },
  ];

  // Get current path for sidebar menu item `key`
  const currentPathname = usePathname()?.replace("/admin/", "")?.split(" ")[0];

  return (
    <Sider
      width={320}
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        paddingInline: `${!collapsed ? "10px" : "4px"}`,
        paddingBlock: "30px",
        backgroundColor: "white",
        maxHeight: "100vh",
        overflow: "auto",
      }}
      className="scroll-hide"
    >
      <div className="mb-6 flex flex-col items-center justify-center gap-y-5">
        <Link href={"/"}>
          {collapsed ? (
            <Image
              src={logo}
              alt="Logo Of Before After Story"
              className="h-16 w-auto"
            />
          ) : (
            <Image
              src={logo}
              alt="Logo Of Before After Story"
              className="h-16 w-auto"
            />
          )}
        </Link>
      </div>

      <Menu
        onClick={onClick}
        defaultSelectedKeys={[currentPathname]}
        mode="inline"
        className="sidebar-menu space-y-2.5 !border-none !bg-transparent"
        items={navLinks}
      />
    </Sider>
  );
};

export default SidebarContainer;
