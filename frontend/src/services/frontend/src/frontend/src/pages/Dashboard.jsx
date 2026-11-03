import React, { useEffect, useState } from 'react';
import { getPlants, getDiagnoses, getEnvironmentalMeasurements } from '../services/api';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function Dashboard() {
  const [plantsCount, setPlantsCount] = useState(0);
  const [diagnosesCount, setDiagnosesCount] = useState(0);
  const [envData, setEnvData] = useState([]);

  useEffect(() => {
    getPlants().then((res) => setPlantsCount(res.data.length));
    getDiagnoses().then((res) => setDiagnosesCount(res.data.length));
    getEnvironmentalMeasurements().then((res) => setEnvData(res.data.reverse()));
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
          <p className="text-sm text-gray-500">Total Registered Plants</p>
          <p className="text-3xl font-bold text-[#1D3124] mt-2">{plantsCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
          <p className="text-sm text-gray-500">Completed AI Diagnoses</p>
          <p className="text-3xl font-bold text-[#1D3124] mt-2">{diagnosesCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
          <p className="text-sm text-gray-500">System Status</p>
          <p className="text-3xl font-bold text-[#2C4A37] mt-2">Operational</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
        <h2 className="text-lg font-semibold text-[#1D3124] mb-4">Environmental Trends (°C)</h2>
        <div className="h-64">
          <ResponsiveContainer width="100% " height="100%">
            <LineChart data={envData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="recorded_at" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="temperature_c" stroke="#2C4A37" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
