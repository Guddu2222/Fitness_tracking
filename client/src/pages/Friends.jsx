import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Friends() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [board, setBoard] = useState([]);

  useEffect(() => {
    loadLeaderboard();
    search(''); // Load some initial users
  }, []);

  const loadLeaderboard = async () => { 
    try {
      const { data } = await api.get('/friends/leaderboard'); 
      setBoard(data);
    } catch (e) { console.error(e); }
  };

  const search = async (q) => {
    try {
      const { data } = await api.get(`/friends/search?q=${q}`);
      setUsers(data);
    } catch (e) { console.error(e); }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    search(e.target.value);
  };

  const toggleFollow = async (user) => {
    try {
      const endpoint = user.isFollowing ? '/friends/unfollow' : '/friends/follow';
      await api.post(endpoint, { userId: user._id });
      // Update local state
      setUsers(users.map(u => u._id === user._id ? { ...u, isFollowing: !u.isFollowing } : u));
      loadLeaderboard(); // Refresh leaderboard as it depends on friends
    } catch (e) {
      console.error(e);
      alert('Action failed');
    }
  };

  return (
    <div className="space-y-6">
       <header className="mb-4">
        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-accent-500">
          Community & Friends
        </h1>
        <p className="text-gray-400">Find people to follow and see who's topping the charts</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Search & List */}
        <div className="glass-card">
          <h2 className="text-xl font-bold mb-4">Find People</h2>
          <input 
            className="input mb-4" 
            placeholder="Search by name or email..." 
            value={query} 
            onChange={handleSearch} 
          />
          
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {users.map(u => (
              <div key={u._id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <div>
                  <p className="font-bold">{u.name}</p>
                  <p className="text-xs text-gray-400">{u.email}</p>
                </div>
                <button 
                  onClick={() => toggleFollow(u)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    u.isFollowing 
                      ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' 
                      : 'bg-primary-600/20 text-primary-400 hover:bg-primary-600/30'
                  }`}
                >
                  {u.isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            ))}
            {users.length === 0 && <p className="text-gray-500 text-center">No users found</p>}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="glass-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Leaderboard</h2>
            <span className="text-xs text-primary-400 bg-primary-500/10 px-2 py-1 rounded-full">Last 7 Days</span>
          </div>
          
           <div className="space-y-3">
             {board.map((r, i) => (
               <div key={i} className="flex items-center p-3 bg-white/5 rounded-xl border border-white/5">
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm mr-3">
                   {i + 1}
                 </div>
                 <div className="flex-1">
                   <p className="font-medium">{r.name}</p>
                 </div>
                 <div className="font-mono text-primary-400 font-bold">
                   {r.calories} <span className="text-xs text-gray-500">kcal</span>
                 </div>
               </div>
             ))}
             {board.length === 0 && <p className="text-gray-500 text-center">No activity data yet.</p>}
           </div>
        </div>
      </div>
    </div>
  );
}
