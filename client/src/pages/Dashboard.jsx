import React, { useEffect, useState } from 'react'
import api from '../api'
import ActivityChart from '../components/ActivityChart'

export default function Dashboard() {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    api.get('/stats/daily').then(res => setSummary(res.data.totals)).catch(err => console.error(err))
  }, [])

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-400">Here's your daily activity summary</p>
      </header>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card">
          <p className="text-gray-400 text-sm">Calories In</p>
          <p className="text-2xl font-bold mt-1 text-white">{summary?.caloriesConsumed || 0}</p>
        </div>
        <div className="glass-card">
          <p className="text-gray-400 text-sm">Calories Out</p>
          <p className="text-2xl font-bold mt-1 text-white">{summary?.caloriesBurned || 0}</p>
        </div>
        <div className="glass-card">
          <p className="text-gray-400 text-sm">Workout Time</p>
          <p className="text-2xl font-bold mt-1 text-white">{summary?.workoutMinutes || 0} <span className="text-xs font-normal text-gray-400">min</span></p>
        </div>
        <div className="glass-card">
           <p className="text-gray-400 text-sm">Protein/Carbs/Fat</p>
          <p className="text-lg font-bold mt-1 text-white">
            {summary ? `${summary.protein}/${summary.carbs}/${summary.fat}` : '0/0/0'}
            <span className="text-xs font-normal text-gray-400 ml-1">g</span>
          </p>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ActivityChart />
        </div>
        
        {/* Quick Actions or Secondary Widget */}
        <div className="glass-card flex flex-col justify-center items-center space-y-4">
          <h3 className="text-xl font-bold text-center">Quick Actions</h3>
          <button className="btn btn-primary w-full">Log Workout</button>
          <button className="btn glass w-full hover:bg-white/10">Log Meal</button>
        </div>
      </div>
    </div>
  )
}
