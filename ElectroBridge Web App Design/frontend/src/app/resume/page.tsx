'use client';

import { useState } from 'react';
import { ChevronRight, Plus, X, Eye, Download, UploadCloud } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const steps = ['Personal', 'Education', 'Skills', 'Experience', 'Projects', 'Publications'];

export default function ResumePage() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">AI Resume Builder</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Steps + Form */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-0 mb-7 overflow-x-auto pb-1">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center shrink-0">
                  <button
                    onClick={() => setStep(i)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      step === i
                        ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/25'
                        : i < step
                          ? 'text-[#10B981]'
                          : 'text-[#94A3B8]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        step === i
                          ? 'bg-[#00E5FF] text-[#0B1120]'
                          : i < step
                            ? 'bg-[#10B981] text-white'
                            : 'bg-[#1F2937] text-[#94A3B8]'
                      }`}
                    >
                      {i < step ? '✓' : i + 1}
                    </div>
                    {s}
                  </button>
                  {i < steps.length - 1 && <ChevronRight size={14} className="text-[#1F2937] mx-0.5" />}
                </div>
              ))}
            </div>

            <div className="bg-[#1A2438] border border-[#1F2937] rounded-2xl p-6">
              {step === 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-white mb-2">Personal Information</h3>
                  {[['Full Name', 'Arjun Sharma'], ['Email', 'arjun@iitbombay.ac.in'], ['Phone', '+91 98765 43210'], ['LinkedIn', 'linkedin.com/in/arjunsharma'], ['GitHub', 'github.com/arjunsharma-vlsi']].map(([label, placeholder]) => (
                    <div key={label}>
                      <label className="text-xs font-medium text-[#94A3B8] mb-1 block">{label}</label>
                      <input defaultValue={placeholder} className="w-full px-4 py-2.5 bg-[#111827] border border-[#1F2937] rounded-xl text-sm text-white placeholder:text-[#94A3B8] outline-none focus:border-[#00E5FF]/40 transition-colors" />
                    </div>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-white mb-2">Education</h3>
                  {[['Institution', 'IIT Bombay'], ['Degree', 'B.Tech — Electronics Engineering'], ['Graduation Year', '2025'], ['CGPA', '8.6 / 10']].map(([label, placeholder]) => (
                    <div key={label}>
                      <label className="text-xs font-medium text-[#94A3B8] mb-1 block">{label}</label>
                      <input defaultValue={placeholder} className="w-full px-4 py-2.5 bg-[#111827] border border-[#1F2937] rounded-xl text-sm text-white outline-none focus:border-[#00E5FF]/40 transition-colors" />
                    </div>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-white mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2 p-3 bg-[#111827] border border-[#1F2937] rounded-xl min-h-[80px]">
                    {['Verilog', 'SystemVerilog', 'Cadence Virtuoso', 'MATLAB', 'Python', 'RTL Design', 'FPGA', 'Embedded C'].map((skill) => (
                      <Badge key={skill} variant="default">
                        {skill} <X size={9} className="ml-0.5 cursor-pointer" />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input placeholder="Add a skill…" className="flex-1 px-4 py-2.5 bg-[#111827] border border-[#1F2937] rounded-xl text-sm text-white placeholder:text-[#94A3B8] outline-none focus:border-[#00E5FF]/40 transition-colors" />
                    <button className="px-4 py-2.5 bg-[#00E5FF]/10 border border-[#00E5FF]/25 rounded-xl text-[#00E5FF] text-sm font-medium hover:bg-[#00E5FF]/15 transition-colors"><Plus size={14} /></button>
                  </div>
                </div>
              )}

              {step >= 3 && (
                <div className="text-center py-10">
                  <UploadCloud size={36} className="text-[#94A3B8] mx-auto mb-3" />
                  <p className="text-sm text-[#94A3B8]">Complete step {step + 1}: {steps[step]}</p>
                  <p className="text-xs text-[#94A3B8]/60 mt-1">Fill in the previous steps to unlock</p>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="px-5 py-2.5 rounded-xl border border-[#1F2937] text-sm text-[#94A3B8] disabled:opacity-40 hover:text-white transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                  className="px-5 py-2.5 rounded-xl bg-[#00E5FF] text-[#0B1120] text-sm font-semibold hover:bg-[#00E5FF]/90 transition-colors"
                >
                  {step === steps.length - 1 ? 'Generate Resume' : 'Next'}
                </button>
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="lg:w-80 shrink-0">
            <div className="sticky top-20">
              <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Eye size={12} /> Live ATS Preview
              </p>
              <div className="bg-white rounded-2xl p-6 text-[#0B1120] text-xs font-[var(--font-inter)] min-h-[500px] shadow-2xl">
                <div className="border-b-2 border-[#0B1120] pb-3 mb-3">
                  <h2 className="text-lg font-bold">Arjun Sharma</h2>
                  <p className="text-[10px] text-gray-500 mt-0.5">arjun@iitbombay.ac.in · +91 98765 43210</p>
                  <p className="text-[10px] text-gray-500">linkedin.com/in/arjunsharma · github.com/arjunsharma-vlsi</p>
                </div>
                <div className="mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Education</p>
                  <p className="font-semibold text-[11px]">IIT Bombay — B.Tech Electronics Engineering</p>
                  <p className="text-[10px] text-gray-500">2021–2025 · CGPA: 8.6/10</p>
                </div>
                <div className="mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Skills</p>
                  <p className="text-[10px] leading-relaxed">Verilog · SystemVerilog · Cadence Virtuoso · MATLAB · Python · RTL Design · FPGA · Embedded C</p>
                </div>
                <div className="mt-4 p-2 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-[9px] text-gray-400 text-center">ATS Score: 74/100 · 3 improvements suggested</p>
                </div>
              </div>
              <button className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#1F2937] text-sm text-[#94A3B8] hover:text-white hover:border-[#00E5FF]/30 transition-colors">
                <Download size={14} /> Export as PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
