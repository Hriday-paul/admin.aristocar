"use client";

import { DatePicker, Select } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import dayjs from "dayjs";

const UsersChart = ({ monthlyUsers, setJoinYear, setRole, role }) => {
  return (
    <div className="w-full rounded-sm bg-secondary p-6">
      <div className="flex items-center justify-between gap-2 mb-10 lg:flex-wrap xl:flex-nowrap">
        <h1 className="text-xl font-medium text-white">Users Overview</h1>

        <div className="space-x-3">
          <select className="bg-secondary border border-gray-400 text-white p-1 focus:outline-none outline-none" defaultValue={"all"}>
            <option value={'all'}>All</option>
            <option value={'user'}>User</option>
            <option value={'delear'}>Delear</option>
          </select>
          <DatePicker
            onChange={(date, dateString) =>
              setJoinYear(moment(dateString).format("YYYY"))
            }
            picker="year"
            defaultValue={dayjs()}
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={monthlyUsers}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="month"
            scale="point"
            padding={{ left: 10, right: 10 }}
            tickMargin={10}
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'white' }}
          />
          <YAxis axisLine={false} tickLine={false} tickMargin={20} tick={{ fill: 'white' }} dataKey="user" />

          <Tooltip
            formatter={(value) => [`User Joined: ${value}`]}
            contentStyle={{
              color: "white",
              backgroundColor: "#232323",
              fontWeight: "500",
              borderRadius: "5px",
              border: "0",
            }}
            itemStyle={{ color: "white" }}
          />

          <CartesianGrid
            opacity={0.2}
            horizontal={true}
            vertical={false}
            stroke="white"
            strokeDasharray="3 3"
          />

          <Bar
            barSize={18}
            radius={5}
            background={false}
            dataKey="user"
            fill="#FDFDFD"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsersChart;
