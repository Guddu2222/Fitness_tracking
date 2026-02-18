import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Meals() {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [form, setForm] = useState({ items: [] })

  const load = async () => { const { data } = await api.get('/meals'); setItems(data) }
  useEffect(()=>{ load() }, [])

  const search = async () => {
    const { data } = await api.get('/nutrition/search', { params: { q: query } })
    setResults(data)
  }

  const addFood = (f) => setForm({ items: [...form.items, f] })
  const submit = async e => { e.preventDefault(); await api.post('/meals', form); setForm({ items: [] }); load() }
  const remove = async id => { await api.delete(`/meals/${id}`); load() }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card">
        <h2 className="text-xl font-bold mb-2">Log Meal</h2>
        <div className="flex gap-2 mb-2">
          <input className="input" placeholder="Search food (e.g., apple)" value={query} onChange={e=>setQuery(e.target.value)} />
          <button className="btn" onClick={search}>Search</button>
        </div>
        <div className="space-y-1">
          {results.map((r,i)=>(
            <div key={i} className="flex justify-between border rounded-xl p-2">
              <div>{r.name} — {r.calories} cal</div>
              <button className="btn" onClick={()=>addFood(r)}>Add</button>
            </div>
          ))}
        </div>
        <form onSubmit={submit} className="mt-3 space-y-2">
          <h3 className="font-semibold">Selected</h3>
          {form.items.map((f,i)=>(<div key={i} className="text-sm">{f.name} • {f.calories} cal</div>))}
          <button className="btn btn-primary">Save Meal</button>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-2">Your Meals</h2>
        <ul className="space-y-2">
          {items.map(m => (
            <li key={m._id} className="border rounded-xl p-3 flex justify-between">
              <div>
                {new Date(m.createdAt).toLocaleString()}
                {m.items.map((it,i)=> <div key={i} className="text-sm">{it.name} • {it.calories} cal</div>)}
              </div>
              <button className="btn" onClick={()=>remove(m._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
