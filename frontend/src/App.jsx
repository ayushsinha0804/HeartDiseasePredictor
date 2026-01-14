import React, { useState } from 'react';
import { Activity, Heart, Thermometer, Droplets, Wind, User, ArrowRight, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = 'http://127.0.0.1:8000/predict';

const BentoCard = ({ children, title, icon: Icon, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-6 hover:border-[#333] transition-colors ${className}`}
    >
        <div className="flex items-center gap-3 mb-4 text-[#666]">
            {Icon && <Icon size={18} />}
            <span className="text-xs font-medium tracking-widest uppercase">{title}</span>
        </div>
        {children}
    </motion.div>
);

const InputField = ({ label, value, onChange, type = "number", name, placeholder, step = "1", options = null }) => (
    <div className="flex flex-col gap-2">
        <label className="text-[10px] text-[#444] font-bold uppercase tracking-tighter">{label}</label>
        {options ? (
            <select
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                className="bg-black border border-[#1A1A1A] rounded-lg px-3 py-2 text-sm focus:border-white outline-none transition-colors"
            >
                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        ) : (
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                placeholder={placeholder}
                step={step}
                className="bg-black border border-[#1A1A1A] rounded-lg px-3 py-2 text-sm focus:border-white outline-none transition-colors w-full"
            />
        )}
    </div>
);

function App() {
    const [formData, setFormData] = useState({
        age: 57, sex: 1, cp: 0, trestbps: 130, chol: 236,
        fbs: 0, restecg: 0, thalach: 174, exang: 0,
        oldpeak: 0.0, slope: 1, ca: 0, thal: 2
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('Prediction failed');
            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            {/* Header */}
            <nav className="flex justify-between items-center mb-16">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <Heart className="text-black" size={16} />
                    </div>
                    <span className="text-xl font-bold tracking-tighter">HEARTPULSE</span>
                </div>
                <div className="flex gap-8 text-xs font-medium text-[#444] uppercase tracking-widest">
                    <a href="#" className="hover:text-white transition-colors">Analyzer</a>
                    <a href="#" className="hover:text-white transition-colors">Enterprise</a>
                    <a href="#" className="hover:text-white transition-colors">Methodology</a>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left Column - Hero */}
                <div className="md:col-span-12 lg:col-span-4 flex flex-col justify-center">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-6xl font-extrabold tracking-tighter leading-[0.9] mb-8"
                    >
                        PREDICT <br /> WITH <br /> PRECISION.
                    </motion.h1>
                    <p className="text-[#666] text-sm leading-relaxed mb-8 max-w-[280px]">
                        Advanced cardiac risk assessment using machine learning trained on specialized clinical data datasets.
                    </p>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="group bg-white text-black rounded-full py-4 px-8 flex items-center gap-4 w-fit hover:bg-[#DDD] transition-all"
                    >
                        <span className="font-bold text-sm">{loading ? 'ANALYZING...' : 'RUN ANALYTICS'}</span>
                        {loading ? <RefreshCw className="animate-spin" size={18} /> : <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />}
                    </button>
                </div>

                {/* Middle Column - Form (Bento Grid) */}
                <div className="md:col-span-8 lg:col-span-5 grid grid-cols-2 gap-4">
                    <BentoCard title="Demographics" icon={User}>
                        <div className="grid gap-4">
                            <InputField label="Age" name="age" value={formData.age} onChange={handleInputChange} />
                            <InputField label="Sex" name="sex" value={formData.sex} onChange={handleInputChange} options={[
                                { value: 1, label: "Male" },
                                { value: 0, label: "Female" }
                            ]} />
                        </div>
                    </BentoCard>

                    <BentoCard title="Vitals" icon={Thermometer}>
                        <div className="grid gap-4">
                            <InputField label="Resting BP" name="trestbps" value={formData.trestbps} onChange={handleInputChange} />
                            <InputField label="Cholesterol" name="chol" value={formData.chol} onChange={handleInputChange} />
                        </div>
                    </BentoCard>

                    <BentoCard title="Chest Detail" icon={Activity} className="col-span-2">
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Pain Type (0-3)" name="cp" value={formData.cp} onChange={handleInputChange} />
                            <InputField label="Max Heart Rate" name="thalach" value={formData.thalach} onChange={handleInputChange} />
                        </div>
                    </BentoCard>

                    <BentoCard title="Diagnostics" icon={Droplets} className="col-span-2">
                        <div className="grid grid-cols-3 gap-4">
                            <InputField label="Fast Sugar" name="fbs" value={formData.fbs} onChange={handleInputChange} options={[{ value: 1, label: 'True' }, { value: 0, label: 'False' }]} />
                            <InputField label="Rest ECG" name="restecg" value={formData.restecg} onChange={handleInputChange} />
                            <InputField label="Exercise Angina" name="exang" value={formData.exang} onChange={handleInputChange} options={[{ value: 1, label: 'Yes' }, { value: 0, label: 'No' }]} />
                        </div>
                    </BentoCard>
                </div>

                {/* Right Column - Results */}
                <div className="md:col-span-12 lg:col-span-3">
                    <AnimatePresence mode="wait">
                        {!result ? (
                            <BentoCard key="empty" title="Status" icon={Activity} className="h-full border-dashed border-[#222]">
                                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                    <div className="w-12 h-12 rounded-full border border-[#1A1A1A] flex items-center justify-center mb-4">
                                        <Activity className="text-[#222]" />
                                    </div>
                                    <p className="text-[10px] text-[#333] font-bold tracking-widest uppercase">Waiting for input</p>
                                </div>
                            </BentoCard>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`h-full rounded-2xl p-8 flex flex-col justify-between ${result.risk_level === 'High' ? 'bg-[#FF1A1A] text-white' : 'bg-white text-black'}`}
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-12">
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{result.risk_level === 'High' ? 'Warning' : 'Verified'}</span>
                                        {result.risk_level === 'High' ? <AlertCircle size={24} /> : <ShieldCheck size={24} />}
                                    </div>
                                    <h2 className="text-5xl font-black tracking-tighter leading-none mb-4">
                                        {result.risk_level.toUpperCase()}<br />RISK
                                    </h2>
                                    <p className={`text-sm font-medium ${result.risk_level === 'High' ? 'text-white/70' : 'text-black/50'}`}>
                                        Confidence: {(result.probability * 100).toFixed(1)}%
                                    </p>
                                </div>

                                <div className="pt-12 border-t border-black/10">
                                    <p className="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-50">System Logs</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-mono">
                                            <span>Inference engine:</span>
                                            <span>LR-v1.0</span>
                                        </div>
                                        <div className="flex justify-between text-[10px] font-mono">
                                            <span>Status:</span>
                                            <span>Success</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer Design Accents */}
            <div className="mt-12 flex justify-between items-end border-t border-[#1A1A1A] pt-8">
                <div className="grid grid-cols-4 gap-12">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex flex-col gap-2">
                            <div className="h-1 w-8 bg-[#1A1A1A]" />
                            <span className="text-[10px] text-[#333] font-mono">00{i}_SYS_LOAD</span>
                        </div>
                    ))}
                </div>
                <span className="text-[8px] text-[#333] font-mono">LXVII // CORE_ARCH_V2</span>
            </div>
        </div>
    );
}

export default App;
