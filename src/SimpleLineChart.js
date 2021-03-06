import React from "react";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import LineChart from "recharts/lib/chart/LineChart";
import Line from "recharts/lib/cartesian/Line";
import XAxis from "recharts/lib/cartesian/XAxis";
import YAxis from "recharts/lib/cartesian/YAxis";
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
import Tooltip from "recharts/lib/component/Tooltip";
import Legend from "recharts/lib/component/Legend";

const data = [
  { name: "Mon", Visits: 2200, Orders: 3400 },
  { name: "Tue", Visits: 1280, Orders: 2398 },
  { name: "Wed", Visits: 5000, Orders: 4300 },
  { name: "Thu", Visits: 4780, Orders: 2908 },
  { name: "Fri", Visits: 5890, Orders: 4800 },
  { name: "Sat", Visits: 4390, Orders: 3800 },
  { name: "Sun", Visits: 4490, Orders: 4300 }
];

export function SimpleLineChart(props) {
  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="95%" height={320}>
      <LineChart data={props.data}>
        <XAxis dataKey={"timestamp"} />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#82ca9d"
          strokeWidth="3"
        />
        <Line
          type="monotone"
          dataKey="humidity"
          stroke="#8884d8"
          strokeWidth="3"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SimpleLineChart2(props) {
  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="85%" height={320}>
      <LineChart data={props.data}>
        <XAxis dataKey={"timestamp"} />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
        <Line
          type="monotone"
          dataKey="humidity"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SimpleLineChart;
