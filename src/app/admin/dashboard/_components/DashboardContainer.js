"use client";

import { useGetDashboardDataQuery } from "@/redux/api/income.api";
import EarningChart from "./EarningChart";
import RecentUserTable from "./RecentUserTable";
import UsersChart from "./UsersChart";
import CustomCountUp from "@/components/CustomCountUp/CustomCountUp";
import { useState } from "react";
import moment from "moment";
import Transition from "./Transactions";
import { FaUserFriends } from "react-icons/fa";
import { CiDollar } from "react-icons/ci";

export default function DashboardContainer() {
  const [incomeYear, setIncomeYear] = useState(moment().format("yyyy"));
  const [role, setRole] = useState("customer");
  const [JoinYear, setJoinYear] = useState(moment().format("yyyy"));

  const query = {};
  if (incomeYear) query["year"] = incomeYear;

  const { data: dashboardRes } = useGetDashboardDataQuery(query);

  const dashboardData = {
    monthlyIncome: dashboardRes?.data?.monthlyIncome || 0,
    userDetails: dashboardRes?.data?.userData || 0,
    totalIncome: dashboardRes?.data?.totalIncome || 0,
    monthlyUsers: dashboardRes?.data?.monthlyUsers || [{ month: "Jan", user: 10 }, { month: "Feb", user: 20 }, { month: "Mar", user: 50 }, { month: "Apr", user: 100 },{ month: "May", user: 40 }, { month: "Jun", user: 74 }, { month: "July", user: 90 }, { month: "Aug", user: 150 }, { month: "Sep", user: 95 }, { month: "Oct", user: 120 }, { month: "Nov", user: 32 }, { month: "Dec", user: 200 }],
    transactions: dashboardRes?.data?.transactions || 0,
    totalUsers: dashboardRes?.data?.totalUsers || 0
  };

  const userStats = [
    {
      key: "users",
      title: "Total Users",
      icon: <FaUserFriends className="text-4xl text-white" />,
      count: dashboardData?.totalUsers,
    },
    {
      key: "earning",
      title: "Total Earning",
      icon: <CiDollar className="text-4xl text-white" />,
      count: dashboardData?.totalIncome,
    },
  ];

  return (
    <div className="space-y-10">
      {/* User Stats Section */}
      <section className="grid grid-cols-2 gap-5">
        {userStats?.map((stat) => (
          <div key={stat.key} className="text-white flex-center-start gap-x-4 bg-secondary p-8">
            <div className="p-4 bg-primary flex-center rounded-full text-white ">
              {stat.icon}
            </div>

            <div>
              <p className="text-lg font-medium font-dmSans">{stat.title}</p>
              <h5 className="mt-0.5 text-3xl font-semibold text-white">
                {stat.key !== "earning" ? (
                  <CustomCountUp end={stat.count} />
                ) : (
                  <span>
                    €<CustomCountUp end={stat.count} />
                  </span>
                )}
              </h5>
            </div>
          </div>
        ))}
      </section>

      {/* Charts  */}
      <section className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <UsersChart
          setRole={setRole}
          role={role}
          setJoinYear={setJoinYear}
          monthlyUsers={dashboardData?.monthlyUsers}
        />

        <EarningChart
          monthlyIncome={dashboardData?.monthlyIncome}
          setIncomeYear={setIncomeYear}
        />

        {/* <Transition transactions={dashboardData?.transactions} /> */}
      </section>

      {/* Recent Users Table */}
      <section>
        <RecentUserTable userDetails={dashboardData?.userDetails} />
      </section>
    </div>
  );
}
