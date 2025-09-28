import Image from "next/image"
import Link from "next/link"
import { Tomorrow } from "next/font/google"

const tomorrow = Tomorrow({ subsets: ['latin'], weight: ['400', '700'] });

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-700/15 to-slate-600/15"></div>
        <header className="relative w-full flex flex-col items-center pt-0 pb-8">
          <div className="pt-6 pb-4">
            <Image 
              src="/images/logo.png" 
              alt="Next Step" 
              width={360} 
              height={150} 
              className="object-contain mt-2" 
            />
            <span className="sr-only">Next Step</span>
          </div>
          <h2 className={[tomorrow.className, "mt-0 text-xl md:text-3xl italic text-gray-200 text-center max-w-2xl px-4"].join(" ")}>
            Learn how insurance works through conversations, not textbooks.
          </h2>
        </header>
      </div>

      {/* Insurance Types Section */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-100 mb-6 mt-3">
            Choose What Insurance To Practice
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link 
              href="/practice?id=1" 
              className="group p-8 bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center transform hover:-translate-y-1 border border-gray-700/50 hover:border-blue-400/70"
            >
              <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-blue-500/60 to-blue-400/60 rounded-xl mb-6 group-hover:from-blue-400/70 group-hover:to-blue-300/70 transition-all duration-300">
                <Image 
                  src="/images/auto.png" 
                  alt="Auto Insurance" 
                  width={180} 
                  height={140} 
                  className="object-contain drop-shadow-lg brightness-0 invert" 
                />
              </div>
              <h4 className="text-2xl font-bold text-gray-100 group-hover:text-blue-400 transition-colors">
                Auto Insurance
              </h4>
              <p className="text-gray-400 text-center mt-2">
                Master vehicle protection and claims
              </p>
            </Link>

            <Link 
              href="/practice?id=2" 
              className="group p-8 bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center transform hover:-translate-y-1 border border-gray-700/50 hover:border-green-400/70"
            >
              <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-green-500/60 to-green-400/60 rounded-xl mb-6 group-hover:from-green-400/70 group-hover:to-green-300/70 transition-all duration-300">
                <Image 
                  src="/images/home.png" 
                  alt="Home Insurance" 
                  width={180} 
                  height={140} 
                  className="object-contain drop-shadow-lg brightness-0 invert" 
                />
              </div>
              <h4 className="text-2xl font-bold text-gray-100 group-hover:text-green-400 transition-colors">
                Home Insurance
              </h4>
              <p className="text-gray-400 text-center mt-2">
                Protect your property and belongings
              </p>
            </Link>

            <Link 
              href="/practice?id=3" 
              className="group p-8 bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center transform hover:-translate-y-1 border border-gray-700/50 hover:border-purple-400/70"
            >
              <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-purple-500/60 to-purple-400/60 rounded-xl mb-6 group-hover:from-purple-400/70 group-hover:to-purple-300/70 transition-all duration-300">
                <Image 
                  src="/images/health.png" 
                  alt="Health Insurance" 
                  width={180} 
                  height={140} 
                  className="object-contain drop-shadow-lg brightness-0 invert" 
                />
              </div>
              <h4 className="text-2xl font-bold text-gray-100 group-hover:text-purple-400 transition-colors">
                Health Insurance
              </h4>
              <p className="text-gray-400 text-center mt-2">
                Navigate healthcare coverage options
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Scoring Categories Section */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4">
              How You'll Be Evaluated
            </h3>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              You will receive a scenario to react to, your responses are scored 0-100 based on how well they demonstrate the following competencies in realistic, time-pressured situations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Safety Awareness */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/50 hover:shadow-2xl hover:border-red-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-red-900/50 rounded-xl flex items-center justify-center mb-4 border border-red-800/30">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-100 mb-2">Safety Awareness</h4>
              <div className="text-sm text-red-400 mb-2 font-medium">25 points</div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Prioritizing personal and others' safety first in all insurance scenarios and decisions.
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
              <div className="text-sm text-blue-400 mb-2 font-medium">25 points</div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Understanding coverage options, procedures, and timing for various insurance situations.
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
              <div className="text-sm text-green-400 mb-2 font-medium">25 points</div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Following proper steps and protocols when handling insurance claims and processes.
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
              <div className="text-sm text-purple-400 mb-2 font-medium">25 points</div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Making choices that minimize risk and cost while maximizing protection and value.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}