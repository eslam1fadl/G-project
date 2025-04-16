import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts';

const Charts = () => {
  const [lineChartData, setLineChartData] = useState([]);
  const [pieChartData01, setPieChartData01] = useState([]);
  const [pieChartData02, setPieChartData02] = useState([]);

  useEffect(() => {
    setLineChartData([
      { name: 'Page A', uv: 5000, pv: 3400, amt: 2400 },
      { name: 'Page B', uv: 4000, pv: 2398, amt: 2210 },
      { name: 'Page C', uv: 3500, pv: 7800, amt: 2290 },
      { name: 'Page D', uv: 4780, pv: 4908, amt: 2000 },
      { name: 'Page E', uv: 2890, pv: 5800, amt: 2181 },
      { name: 'Page F', uv: 3390, pv: 4800, amt: 2500 },
      { name: 'Page G', uv: 4490, pv: 5300, amt: 2100 },
    ]);
    
    setPieChartData01([
      { name: 'Group A', value: 500 },
      { name: 'Group B', value: 350 },
      { name: 'Group C', value: 250 },
    ]);
    
    setPieChartData02([
      { name: 'A1', value: 120 },
      { name: 'A2', value: 320 },
      { name: 'B1', value: 150 },
      { name: 'B2', value: 90 },
      { name: 'B3', value: 60 },
      { name: 'B4', value: 40 },
      { name: 'B5', value: 70 },
      { name: 'C1', value: 120 },
      { name: 'C2', value: 250 },
     
    ]);
  }, []);

  return (
    <div className='flex justify-between flex-col lg:flex-row space-x-8 w-full mt-10'>
      <div className="lg:w-1/2 w-full ml-0 lg:ml-10">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={lineChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="lg:w-1/2 w-full lg:mr-30 mr-0">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie data={pieChartData01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" />
            <Pie data={pieChartData02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={110} outerRadius={130} fill="#82ca9d" label />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;