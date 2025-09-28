'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

type ResultsShape = {
    analysis: { structuredData: { [k: string]: number } } | null;
    summary?: string;
}

const CIRCUMFERENCE = 2 * Math.PI * 40;

const getStrokeDashoffset = (score: number) => {
    const normalizedScore = Math.max(0, Math.min(100, score));
    const dashoffset = CIRCUMFERENCE - (normalizedScore / 100) * CIRCUMFERENCE;
    return dashoffset;
};

export default function ResultsPage() {
    const [results, setResults] = useState<ResultsShape | null>(null);
    const [pending, setPending] = useState<boolean>(false);
    
    const [finalScore, setFinalScore] = useState<number>(0); 

    useEffect(() => {
        let iv: NodeJS.Timeout | undefined = undefined;

        try {
            const raw = sessionStorage.getItem('lastCallResult');
            const p = sessionStorage.getItem('lastCallPending');
            setPending(Boolean(p));

            if (raw) {
                const parsedResults = JSON.parse(raw);
                setResults(parsedResults);
                setPending(false);
                
                const structured = parsedResults.analysis?.structuredData || {};
                const P1 = structured['P1'] ?? structured['p1'] ?? null;
                const P2 = structured['P2'] ?? structured['p2'] ?? null;
                const P3 = structured['P3'] ?? structured['p3'] ?? null;
                const P4 = structured['P4'] ?? structured['p4'] ?? null;
                const totalScoreFromP = [P1, P2, P3, P4].reduce((s, v) => s + (typeof v === 'number' ? v : 0), 0);
                const score = structured['Overall_score'] ?? structured['Overall_Score'] ?? null;
                const target = totalScoreFromP > 0 ? totalScoreFromP : (typeof score === 'number' ? score : 0);
                if (target !== null) {
                    setTimeout(() => setFinalScore(target), 50);
                }
            }

        } catch (e) {
            console.error('Failed reading lastCallResult', e);
        }

        iv = setInterval(() => {
            try {
                const raw = sessionStorage.getItem('lastCallResult');
                if (raw) {
                    const parsedResults = JSON.parse(raw);
                    setResults(parsedResults);
                    setPending(false);
                    clearInterval(iv);
                    
                    const structured = parsedResults.analysis?.structuredData || {};
                    const P1 = structured['P1'] ?? structured['p1'] ?? null;
                    const P2 = structured['P2'] ?? structured['p2'] ?? null;
                    const P3 = structured['P3'] ?? structured['p3'] ?? null;
                    const P4 = structured['P4'] ?? structured['p4'] ?? null;
                    const totalScoreFromP = [P1, P2, P3, P4].reduce((s, v) => s + (typeof v === 'number' ? v : 0), 0);
                    const score = structured['Overall_score'] ?? structured['Overall_Score'] ?? null;
                    const target = totalScoreFromP > 0 ? totalScoreFromP : (typeof score === 'number' ? score : 0);
                    if (target !== null) {
                        setTimeout(() => setFinalScore(target), 50); 
                    }
                }
            } catch (e) { }
        }, 800);
        //677777777
        return () => { if (iv) clearInterval(iv); };
    }, []);
    
    if (!results) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center">
                {pending ? (
                    <div className="flex flex-col items-center">
                        <div className="inline-block w-14 h-14 rounded-full border-4 border-transparent border-t-white animate-spin"></div>
                        <p className="mt-4 text-lg">Analyzing your call, please wait...</p>
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl font-semibold">No results yet</h1>
                        <p className="mt-4">Start an interview to produce results.</p>
                        <div className="mt-6 flex gap-4">
                            <Link href="/practice" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Practice</Link>
                            <Link href="/" className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700">Home</Link>
                        </div>
                    </>
                )}
            </main>
        )
    }

    const structured = results.analysis?.structuredData || {};
    const overallScore = structured['Overall_score'] ?? structured['Overall_Score'] ?? null;

    // Read P1-P4 (prefer CAPITAL keys but accept lowercase)
    const rawP1 = structured['P1'] ?? structured['p1'];
    const rawP2 = structured['P2'] ?? structured['p2'];
    const rawP3 = structured['P3'] ?? structured['p3'];
    const rawP4 = structured['P4'] ?? structured['p4'];

    const P1 = typeof rawP1 === 'number' ? rawP1 : 0;
    const P2 = typeof rawP2 === 'number' ? rawP2 : 0;
    const P3 = typeof rawP3 === 'number' ? rawP3 : 0;
    const P4 = typeof rawP4 === 'number' ? rawP4 : 0;

    // Sum P1-P4 to form total. If none present, fall back to overallScore.
    const totalFromP = P1 + P2 + P3 + P4;
    const totalScore: number = totalFromP > 0 ? totalFromP : (typeof overallScore === 'number' ? overallScore : 0);

    // Map P1-P4 to the four categories. If a P raw value exists (numeric), use it. Otherwise prefer explicit structured keys if provided, else 0.
    const safetyScore = (typeof rawP1 === 'number') ? rawP1 : (typeof structured['Safety_Awareness'] === 'number' ? structured['Safety_Awareness'] : (typeof structured['Safety'] === 'number' ? structured['Safety'] : 0));
    const knowledgeScore = (typeof rawP2 === 'number') ? rawP2 : (typeof structured['Insurance_Knowledge'] === 'number' ? structured['Insurance_Knowledge'] : (typeof structured['Knowledge'] === 'number' ? structured['Knowledge'] : 0));
    const proceduralScore = (typeof rawP3 === 'number') ? rawP3 : (typeof structured['Procedural_Understanding'] === 'number' ? structured['Procedural_Understanding'] : (typeof structured['Procedural'] === 'number' ? structured['Procedural'] : 0));
    const decisionScore = (typeof rawP4 === 'number') ? rawP4 : (typeof structured['Decision_Making_Quality'] === 'number' ? structured['Decision_Making_Quality'] : (typeof structured['Decision_Making'] === 'number' ? structured['Decision_Making'] : 0));
    
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 text-white">
            <h1 className="text-4xl font-extrabold mb-10">Interview Results</h1>
            
            <div className="w-full max-w-4xl flex flex-col items-center">
                
                {(totalScore > 0 || overallScore !== null) && (
                    <div className="relative w-40 h-40 mb-10">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                className="stroke-gray-700"
                                strokeWidth="10"
                            />
                            <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                strokeDasharray={CIRCUMFERENCE}
                                strokeDashoffset={getStrokeDashoffset(finalScore)}
                                className="stroke-blue-500 transition-all duration-1500 ease-out"
                                strokeWidth="10"
                                strokeLinecap="round"
                            />
                        </svg>
                        
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <span className="text-5xl font-extrabold text-white">
                                {totalScore}
                            </span>
                        </div>
                    </div>
                )}
                
                {results.summary && (
                    <div className="mb-10 w-full max-w-2xl bg-white/5 p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-semibold mb-3 text-center text-blue-300">Analysis Summary</h2>
                        <p className="text-center text-gray-200 whitespace-pre-wrap">{results.summary}</p>
                    </div>
                )}

                <div className="mt-6 w-full grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(structured)
                        .filter(([k]) => {
                            const key = k.toLowerCase();
                            // hide the overall score and the P1..P4 keys so they don't render as separate boxes
                            if (key.includes('overall_score')) return false;
                            if (['p1', 'p2', 'p3', 'p4'].includes(key)) return false;
                            return true;
                        })
                        .map(([k, v]) => (
                            <div key={k} className="p-4 rounded-xl bg-white/10 text-center shadow-md border border-white/5 transition duration-200 hover:bg-white/15">
                                <h3 className="text-sm font-semibold text-gray-300">{k.replace(/_/g, ' ')}</h3>
                                <p className="text-3xl font-extrabold mt-2 text-blue-400">{v}</p>
                                <p className="mt-2 text-xs text-gray-400">Score (0-100)</p>
                            </div>
                        ))}
                </div>

                {/* Score Breakdown Section */}
                <div className="mt-12 w-full">
                    <h2 className="text-2xl font-bold text-center mb-8 text-white">Score Breakdown</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        
                        {/* Safety Awareness */}
                        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50 hover:shadow-2xl hover:border-red-500/50 transition-all duration-300">
                            <div className="w-12 h-12 bg-red-900/50 rounded-xl flex items-center justify-center mb-4 border border-red-800/30">
                                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h4 className="text-lg font-bold text-gray-100 mb-2">Safety Awareness</h4>
                            <div className="text-3xl font-bold text-red-400 mb-2">{safetyScore}/25</div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Prioritizing personal and others' safety first
                            </p>
                        </div>

                        {/* Insurance Knowledge */}
                        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50 hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300">
                            <div className="w-12 h-12 bg-blue-900/50 rounded-xl flex items-center justify-center mb-4 border border-blue-800/30">
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h4 className="text-lg font-bold text-gray-100 mb-2">Insurance Knowledge</h4>
                            <div className="text-3xl font-bold text-blue-400 mb-2">{knowledgeScore}/25</div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Understanding coverage, procedures, and timing
                            </p>
                        </div>

                        {/* Procedural Understanding */}
                        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50 hover:shadow-2xl hover:border-green-500/50 transition-all duration-300">
                            <div className="w-12 h-12 bg-green-900/50 rounded-xl flex items-center justify-center mb-4 border border-green-800/30">
                                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="text-lg font-bold text-gray-100 mb-2">Procedural Understanding</h4>
                            <div className="text-3xl font-bold text-green-400 mb-2">{proceduralScore}/25</div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Following proper steps and protocols
                            </p>
                        </div>

                        {/* Decision-Making Quality */}
                        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50 hover:shadow-2xl hover:border-purple-500/50 transition-all duration-300">
                            <div className="w-12 h-12 bg-purple-900/50 rounded-xl flex items-center justify-center mb-4 border border-purple-800/30">
                                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h4 className="text-lg font-bold text-gray-100 mb-2">Decision-Making Quality</h4>
                            <div className="text-3xl font-bold text-purple-400 mb-2">{decisionScore}/25</div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Making choices that minimize risk and cost
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            <div className="mt-12 flex gap-6">
                <Link 
                    href="/practice" 
                    className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold transition duration-300 hover:bg-blue-700 shadow-xl"
                >
                    Try again
                </Link>
                <Link 
                    href="/" 
                    className="px-6 py-3 rounded-full bg-gray-600 text-white font-semibold transition duration-300 hover:bg-gray-700 shadow-xl"
                >
                    Home
                </Link>
            </div>
        </main>
    )
}