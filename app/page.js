// app/page.js
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const [city, setCity] = useState('')
  const router = useRouter()

  const handleSearch = () => {
    if (city.trim()) {
      router.push(`/city/${city}`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-10">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center">Search Real Estate Projects</h1>
        <input
          type="text"
          placeholder="Enter City Name (e.g., Hyderabad)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Search
        </button>
      </div>
    </div>
  )
}
