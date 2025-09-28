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
                const score = structured['Overall_score'] ?? structured['Overall_Score'] ?? null;
                if (score !== null) {
                    setTimeout(() => setFinalScore(score), score); 
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
                    const score = structured['Overall_score'] ?? structured['Overall_Score'] ?? null;
                    if (score !== null) {
                        setTimeout(() => setFinalScore(score), 50); 
                    }
                }
            } catch (e) { }
        }, 800);
        
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
    
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 text-white">
            <h1 className="text-4xl font-extrabold mb-10">Interview Results</h1>
            
            <div className="w-full max-w-4xl flex flex-col items-center">
                
                {overallScore !== null && (
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
                                {overallScore}
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
                        .filter(([k]) => !k.toLowerCase().includes('overall_score'))
                        .map(([k, v]) => (
                            <div key={k} className="p-4 rounded-xl bg-white/10 text-center shadow-md border border-white/5 transition duration-200 hover:bg-white/15">
                                <h3 className="text-sm font-semibold text-gray-300">{k.replace(/_/g, ' ')}</h3>
                                <p className="text-3xl font-extrabold mt-2 text-blue-400">{v}</p>
                                <p className="mt-2 text-xs text-gray-400">Score (0-100)</p>
                            </div>
                        ))}
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