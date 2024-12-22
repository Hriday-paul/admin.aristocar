"use client";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const EarningChart = ({ monthlyIncome, setIncomeYear }) => {
  return (
    <div className="w-full rounded-sm bg-secondary p-6">
      <div className="flex items-center justify-between mb-10 text-white">
        <h1 className="text-xl font-medium">Earning Overview</h1>

        <div className="flex-center-start gap-x-4">
          {/* <h1 className="font-medium bg-white rounded-lg px-3 py-1.5 text-sm border">
            Monthly Growth: <span className="ml-2 font-semibold">35.80%</span>
          </h1> */}
          <DatePicker
            onChange={(date, dateString) =>
              setIncomeYear(moment(dateString).format("YYYY"))
            }
            picker="year"
            defaultValue={dayjs()}
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={monthlyIncome}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#C8C8C8" stopOpacity={1} />
              <stop offset="100%" stopColor="#9ca3af" stopOpacity={0.4} />
            </linearGradient>
          </defs>

          <XAxis
            tickMargin={10}
            axisLine={false}
            tickLine={false}
            dataKey="month"
            tick={{ fill: 'white' }}
          />

          <YAxis tickMargin={20} axisLine={false} tickLine={false} tick={{ fill: 'white' }} />

          <CartesianGrid
            opacity={0.19}
            stroke="white"
            strokeDasharray="3 3"
          />

          <Tooltip
            formatter={(value) => [`Monthly Earning: €${value}`]}
            contentStyle={{
              color: "white",
              backgroundColor : "#232323",
              fontWeight: "500",
              borderRadius: "5px",
              border: "0",
            }}
            itemStyle={{ color: "white" }}
          />

          <Area
            activeDot={{ fill: "#4ade80" }}
            type="monotone"
            dataKey="income"
            strokeWidth={0}
            stroke="blue"
            fill="url(#color)"
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningChart;
