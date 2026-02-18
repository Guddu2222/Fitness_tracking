import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Goals() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ target: 'weight_loss', details: '', dailyCalories: 2000 })

  const load = async () => { const { data } = await api.get('/goals'); setItems(data) }
  useEffect(()=>{ load() }, [])

  const submit = async e => { e.preventDefault(); await api.post('/goals', form); setForm({ target: 'weight_loss', details: '', dailyCalories: 2000 }); load() }
  const remove = async id => { await api.delete(`/goals/${id}`); load() }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card">
        <h2 className="text-xl font-bold mb-2">Create Goal</h2>
        <form onSubmit={submit} className="space-y-2">
          <select className="input" value={form.target} onChange={e=>setForm({...form, target: e.target.value})}>
            <option value="weight_loss">Weight Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="endurance">Endurance</option>
            <option value="custom">Custom</option>
          </select>
          <input className="input" placeholder="Details" value={form.details} onChange={e=>setForm({...form, details: e.target.value})} />
          <input className="input" type="number" placeholder="Daily Calories" value={form.dailyCalories} onChange={e=>setForm({...form, dailyCalories: Number(e.target.value)})} />
          <button className="btn btn-primary">Save</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-2">Active Goals</h2>
        <ul className="space-y-2">
          {items.map(g => (
            <li key={g._id} className="border rounded-xl p-3 flex justify-between">
              <div><b>{g.target}</b> — {g.details} — {g.dailyCalories} kcal/day</div>
              <button className="btn" onClick={()=>remove(g._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
