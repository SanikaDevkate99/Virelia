import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, Sprout, Activity, Cpu, ShieldAlert, FileText, Info, Leaf } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import MyPlants from './pages/MyPlants';
import AIDiagnosis from './pages/AIDiagnosis';
import EnvironmentalMonitoring from './pages/EnvironmentalMonitoring';
import Recommendations from './pages/Recommendations';
import HealthHistory from './pages/HealthHistory';
import AboutVirelia from './pages/AboutVirelia';

export default function App() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'My Plants', path: '/plants', icon: Sprout },
    { name: 'AI Diagnosis', path: '/diagnosis', icon: Cpu },
    { name: 'Environmental', path: '/environmental', icon: Activity },
    { name: 'Recommendations', path: '/recommendations', icon: ShieldAlert },
    { name: 'Health History', path: '/history', icon: FileText },
    { name: 'About Virelia', path: '/about', icon: Info },
  ];

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-[#F9F8F3] text-[#1D3124] font-sans">
        {/* Sidebar */}
        <aside className="w-64 bg-[#142319] text-[#F9F8F3] flex flex-col border-r border-[#2C4A37]">
          <div className="p-6 flex items-center gap-3 border-b border-[#2C4A37]">
            <Leaf className="w-7 h-7 text-[#74A57F]" />
            <span className="text-xl font-bold tracking-tight">VIRELIA</span>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#2C4A37] text-white'
                        : 'text-[#A3B8AD] hover:bg-[#1C3122] hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <header className="h-16 border-b border-[#E2E8F0] bg-white px-8 flex items-center justify-between">
            <h1 className="text-lg font-semibold text-[#1D3124]">
              Botanical Intelligence Platform
            </h1>
            <span className="text-xs uppercase tracking-wider bg-[#E8F0EC] text-[#2C4A37] px-3 py-1 rounded-full font-semibold">
              Prototype v1.0
            </span>
          </header>
          <div className="p-8 max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/plants" element={<MyPlants />} />
              <Route path="/diagnosis" element={<AIDiagnosis />} />
              <Route path="/environmental" element={<EnvironmentalMonitoring />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/history" element={<HealthHistory />} />
              <Route path="/about" element={<AboutVirelia />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
