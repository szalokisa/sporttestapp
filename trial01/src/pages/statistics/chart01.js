import { Unity } from "react-bootstrap-icons";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

const myData = [
    {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
    },
    {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
    },
    {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
    },
    {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
    },
    {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
    },
    {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    }
]

export default function Chart01(props) {
    return (
        <LineChart width={730} height={400} data={props.data}
            margin={{ top: 100, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="PersonName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="RESULT" stroke="#8884d8" />
            <Line type="monotone" dataKey="TLID" stroke="#82ca9d" />
            <Line type="monotone" dataKey="TLID" stroke="#ddd222" />
        </LineChart>)
}