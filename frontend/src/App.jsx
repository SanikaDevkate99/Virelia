import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Cpu, Leaf } from 'lucide-react';
import axios from 'axios';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [plantsCount, setPlantsCount] = useState(0);
  const [diagnosesCount, setDiagnosesCount] = useState(0);
  const [symptoms, setSymptoms] = useState('');
  const [diagnosisResult, setDiagnosisResult] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/plants')
      .then(res => setPlantsCount(res.data.length))
      .catch(err => console.log("Backend empty or unseeded yet. Using default metrics."));
    axios.get('http://localhost:8000/api/diagnoses')
      .then(res => setDiagnosesCount(res.data.length))
      .catch(err => console.log(err));
  }, []);

  const handleDiagnosisSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/diagnoses', { plant_id: 1, symptoms: symptoms });
      setDiagnosisResult(res.data);
    } catch (err) {
      setDiagnosisResult({ simulated_condition: 'Early Powdery Mildew', confidence_score: 0.89, is_simulated: true });
    }
  };

  return (
    <div className="flex h-screen bg-[#F9F8F3] text-[#1D3124]">
      {/* Sidebar navigation wrapper */}
      <aside className="w-64 bg-[#142319] text-[#F9F8F3] flex flex-col border-r border-[#2C4A37]">
        <div className="p-6 flex items-center gap-3 border-b border-[#2C4A37]">
          <Leaf className="w-7 h-7 text-[#74A57F]" />
          <span className="text-xl font-bold tracking-tight text-white">VIRELIA</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-[#2C4A37] text-white' : 'text-[#A3B8AD] hover:bg-[#1C3122] hover:text-white'}`}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('diagnosis')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'diagnosis' ? 'bg-[#2C4A37] text-white' : 'text-[#A3B8AD] hover:bg-[#1C3122] hover:text-white'}`}
          >
            <Cpu className="w-4 h-4" /> AI Plant Diagnosis
          </button>
        </nav>
      </aside>

      {/* Main App view panel content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 border-b border-[#E2E8F0] bg-white px-8 flex items-center justify-between shadow-sm">
          <h1 className="text-lg font-semibold text-[#1D3124] capitalize">{activeTab} Controls</h1>
          <span className="text-xs uppercase tracking-wider bg-[#E8F0EC] text-[#2C4A37] px-3 py-1 rounded-full font-semibold">Prototype Connected</span>
        </header>
        <div className="p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
                  <p className="text-sm font-medium text-gray-500">Total Monitored Plants</p>
                  <p className="text-4xl font-bold text-[#1D3124] mt-2">{plantsCount}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
                  <p className="text-sm font-medium text-gray-500">Completed AI Diagnoses</p>
                  <p className="text-4xl font-bold text-[#1D3124] mt-2">{diagnosesCount}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
                  <p className="text-sm font-medium text-gray-500">Environmental Sensors</p>
                  <p className="text-4xl font-bold text-emerald-700 mt-2">Active</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl border border-[#E2E8F0] shadow-sm">
                <h3 className="text-lg font-bold mb-2">Welcome to Virelia Core</h3>
                <p className="text-gray-600 text-sm">Where Plant Health Meets Intelligence. Use the navigation sidebar to query automated systems or track vital statistics.</p>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm max-w-2xl">
              <h2 className="text-xl font-bold mb-2">Automated Neural Network Diagnosis</h2>
              <p className="text-sm text-gray-500 mb-6">Describe observed physiological conditions below to run an environmental risk analysis profile query.</p>
              <form onSubmit={handleDiagnosisSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Enter Symptoms</label>
                  <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-emerald-800 outline-none" rows={4} placeholder="e.g., White spotting on upper leaves, edge chlorosis..." required />
                </div>
                <button type="submit" className="bg-[#2C4A37] text-white px-5 py-2.5 rounded-lg font-medium text-sm shadow-sm transition-transform active:scale-95">Execute Diagnosis</button>
              </form>
              {diagnosisResult && (
                <div className="mt-6 p-5 rounded-xl bg-[#E8F0EC] border border-[#74A57F]">
                  <span className="text-xs uppercase font-bold text-[#2C4A37] tracking-wider block mb-1">{diagnosisResult.is_simulated ? 'Simulated AI Pipeline (Demo Result)' : 'PyTorch Core Engine Node'}</span>
                  <p className="text-xl font-bold text-[#1D3124]">{diagnosisResult.simulated_condition}</p>
                  <p className="text-sm text-gray-700 mt-1">Classification Accuracy: {(diagnosisResult.confidence_score * 100).toFixed(1)}%</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
