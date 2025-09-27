import React from 'react'
import Link from 'next/link'

export default function ResultsPage() {
	return (
	<main classNgame="min-h-screen flex flex-col items-center justify-center">
			<h1 className="text-3xl font-bold">Results</h1>
            <h2 className="mt-4 text-lg">Total Score: 78/100</h2>
            <p className="mt-2 text-center max-w-xl">The bottom line: You have great instincts and strong safety awareness that would serve you well in a real accident. Your score of 78/100 shows you're in the "Developing" range - you have a solid foundation and with a bit more knowledge about insurance procedures and timing, you'll be fully prepared for any situation. You're well on your way to becoming insurance-ready!</p>

			{/* Four columns: Title, Score (0-25), Description */}
			<div className="mt-6 w-full max-w-4xl">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
					{/* Column 1 */}
					<div className="p-4 rounded bg-white/5 text-center">
						<h3 className="text-sm font-semibold">Safety Awareness</h3>
						<p className="text-2xl font-bold mt-2">18</p>
						<p className="mt-2 text-sm text-gray-300">Excellent instincts for prioritizing everyone's wellbeing.</p>
					</div>
					{/* Column 2 */}
					<div className="p-4 rounded bg-white/5 text-center">
						<h3 className="text-sm font-semibold">Insurance Knowledge</h3>
						<p className="text-2xl font-bold mt-2">17</p>
						<p className="mt-2 text-sm text-gray-300">Good foundation but missed some key timing and procedures.</p>
					</div>
					{/* Column 3 */}
					<div className="p-4 rounded bg-white/5 text-center">
						<h3 className="text-sm font-semibold">Procedural Understanding</h3>
						<p className="text-2xl font-bold mt-2">19</p>
						<p className="mt-2 text-sm text-gray-300">Solid grasp of basic steps with room for improvement on specifics.</p>
					</div>
					{/* Column 4 */}
					<div className="p-4 rounded bg-white/5 text-center">
						<h3 className="text-sm font-semibold">Decision-Making Quality</h3>
						<p className="text-2xl font-bold mt-2">19</p>
						<p className="mt-2 text-sm text-gray-300">Made thoughtful choices that showed good judgment.</p>
					</div>
				</div>
			</div>

			<div className="mt-6 flex gap-4">
				<Link href="/practice" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
					Try again
				</Link>
				<Link href="/" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
					Home
				</Link>
			</div>
		</main>
	)
}

