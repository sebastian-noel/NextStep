import Image from "next/image"
import Link from "next/link"
import { Tomorrow } from "next/font/google"
const tomorrow = Tomorrow({ subsets: ["latin"], weight: ["400", "700"] })
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-6">
      <header className="w-full flex flex-col items-center pt-8">
        <Image src="/images/logo.png" alt="Next Step" width={500} height={500} className="object-contain" />
        <span className="sr-only">Next Step</span>
      </header>
      <h2 className={[tomorrow.className, "text-2xl font-bold"].join(" ")}>Learn how insurance works through conversations, not textbooks.</h2>

      <div className="mt-8 w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          <Link href="/practice" className="p-6 bg-white rounded-lg shadow-sm flex flex-col items-center">
            <div className="w-full h-40 flex items-center justify-center">
              <Image src="/images/auto.png" alt="Auto" width={160} height={120} className="object-contain" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-black hover:text-blue-600">Auto</h3>
          </Link>

          <Link href="/practice" className="p-6 bg-white rounded-lg shadow-sm flex flex-col items-center">
            <div className="w-full h-40 flex items-center justify-center">
              <Image src="/images/home.png" alt="Home" width={160} height={120} className="object-contain" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-black hover:text-blue-600">Home</h3>
          </Link>

          <Link href="/practice" className="p-6 bg-white rounded-lg shadow-sm flex flex-col items-center transition duration-300 hover:text-blue-600">
            <div className="w-full h-40 flex items-center justify-center hover:text-blue-600"> 
              <Image src="/images/health.png" alt="Health" width={160} height={120} className="object-contain" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-black hover:text-blue-600">Health</h3>
          </Link>
        </div>
      </div>
    </main>
  )
}

