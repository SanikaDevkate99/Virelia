import React, { useState } from 'react';
import { createDiagnosis } from '../services/api';

export default function AIDiagnosis() {
  const [plantId, setPlantId] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createDiagnosis({ plant_id: Number(plantId), symptoms });
    setResult(res.data);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
        <h2 className="text-xl font-bold text-[#1D3124] mb-2">AI Plant Disease Diagnosis</h2>
        <p className="text-sm text-gray-500 mb-6">
          Submit your plant ID and observed symptoms. (Note: Currently uses a transparent simulated CNN demo workflow until trained PyTorch weights are bound).
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium mb-1">Plant ID</label>
            <input
              type="number"
              className="w-full border rounded-lg px-3.5 py-2.5"
              value={plantId}
              onChange={(e) => setPlantId(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Observed Symptoms</label>
            <textarea
              className="w-full border rounded-lg px-3.5 py-2.5"
              rows={3}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g. Yellowing leaf edges, white powdery spots..."
              required
            />
          </div>
          <button
            type="init"
            className="bg-[#2C4A37] text-white px-5 py-2.5 rounded-lg hover:bg-[#1D3124] font-medium"
          >
            Run Diagnosis
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 rounded-lg bg-[#E8F0EC] border border-[#74A57F]">
            <span className="text-xs uppercase font-bold text-[#2C4A37]">
              {result.is_simulated ? 'Simulated AI Result (Demo)' : 'PyTorch Model Result'}
            </span>
            <p className="text-lg font-bold text-[#1D3124] mt-1">{result.simulated_condition}</p>
            <p className="text-sm text-gray-700">Confidence Score: {(result.confidence_score * 100).toFixed(1)}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
