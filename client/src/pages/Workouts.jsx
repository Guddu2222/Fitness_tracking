import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Workouts() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ type: 'cardio', exercises: [{ name: '', durationMin: 30, calories: 200 }] })

  const load = async () => {
    const { data } = await api.get('/workouts')
    setItems(data)
  }
  useEffect(() => { load() }, [])

  const addExercise = () => setForm({ ...form, exercises: [...form.exercises, { name: '', durationMin: 0, calories: 0 }] })
  const updateExercise = (i, k, v) => {
    const ex = [...form.exercises]; ex[i][k] = v; setForm({ ...form, exercises: ex })
  }
  const submit = async e => {
    e.preventDefault()
    await api.post('/workouts', form)
    setForm({ type: 'cardio', exercises: [{ name: '', durationMin: 30, calories: 200 }] })
    load()
  }
  const remove = async id => { await api.delete(`/workouts/${id}`); load() }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card">
        <h2 className="text-xl font-bold mb-2">Log Workout</h2>
        <form onSubmit={submit} className="space-y-2">
          <select className="input" value={form.type} onChange={e=>setForm({ ...form, type: e.target.value })}>
            <option>cardio</option><option>strength</option><option>yoga</option><option>hiit</option><option>other</option>
          </select>
          {form.exercises.map((ex,i)=>(
            <div key={i} className="grid grid-cols-4 gap-2">
              <input className="input" placeholder="Name" value={ex.name} onChange={e=>updateExercise(i,'name',e.target.value)} />
              <input className="input" type="number" placeholder="Minutes" value={ex.durationMin||0} onChange={e=>updateExercise(i,'durationMin',Number(e.target.value))} />
              <input className="input" type="number" placeholder="Calories" value={ex.calories||0} onChange={e=>updateExercise(i,'calories',Number(e.target.value))} />
              <button type="button" className="btn" onClick={()=>updateExercise(i,'name','')}>Clear</button>
            </div>
          ))}
          <div className="flex gap-2">
            <button type="button" onClick={addExercise} className="btn">+ Exercise</button>
            <button className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-2">Your Workouts</h2>
        <ul className="space-y-2">
          {items.map(w => (
            <li key={w._id} className="border rounded-xl p-3 flex justify-between">
              <div>
                <b>{w.type}</b> — {new Date(w.createdAt).toLocaleString()}<br/>
                {w.exercises.map((e,i)=> <span key={i} className="text-sm block">{e.name} • {e.durationMin||0} min • {e.calories||0} cal</span>)}
              </div>
              <button className="btn" onClick={()=>remove(w._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
