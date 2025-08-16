import { useState, useEffect } from "react"
import LoadingScreen from "./Loading-screen"
import MainContent from "@/components/main-content"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000) // 3 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  return <main className="min-h-screen">{loading ? <LoadingScreen /> : <MainContent />}</main>
}

