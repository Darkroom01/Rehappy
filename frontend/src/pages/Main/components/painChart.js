import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const sampleData = [
    { name: "Day 1", value: 10 },
    { name: "Day 2", value: 20 },
    { name: "Day 3", value: 15 },
    { name: "Day 4", value: 25 },
    { name: "Day 5", value: 18 },
];

export default function PainChart() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={sampleData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}
