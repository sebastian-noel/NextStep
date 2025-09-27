import React from 'react'
import Link from 'next/link'

export default function ResultsPage() {
	return (
	<main className="min-h-screen flex flex-col items-center justify-center">
			<h1 className="text-3xl font-bold">Results page</h1>
			<p className="mt-4 text-lg">Here are your results:</p>

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

