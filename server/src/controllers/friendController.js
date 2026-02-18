import User from '../models/User.js';
import Workout from '../models/Workout.js';
import Meal from '../models/Meal.js';

export async function follow(req, res) {
  try {
    const { user } = req;
    const { userId } = req.body;
    if (String(user._id) === userId) return res.status(400).json({ error: 'Cannot follow yourself' });
    
    const other = await User.findById(userId);
    if (!other) return res.status(404).json({ error: 'User not found' });

    // Add to my following (friends)
    if (!user.friends.includes(other._id)) {
      user.friends.push(other._id);
      await user.save();
    }

    // Add me to their followers
    if (!other.followers.includes(user._id)) {
      other.followers.push(user._id);
      await other.save();
    }

    res.json({ ok: true });
  } catch (e) {
    console.error('Follow Error:', e);
    res.status(500).json({ error: 'Failed to follow user' });
  }
}

export async function unfollow(req, res) {
  try {
    const { user } = req;
    const { userId } = req.body;
    
    // Remove from my following
    user.friends = user.friends.filter(id => String(id) != String(userId));
    await user.save();

    // Remove me from their followers
    const other = await User.findById(userId);
    if (other) {
      other.followers = other.followers.filter(id => String(id) != String(user._id));
      await other.save();
    }

    res.json({ ok: true });
  } catch (e) {
    console.error('Unfollow Error:', e);
    res.status(500).json({ error: 'Failed to unfollow user' });
  }
}

export async function getFeed(req, res) {
  try {
    const { user } = req;
    // Get workouts from people I follow (friends)
    const workouts = await Workout.find({ user: { $in: user.friends } })
      .sort({ date: -1 })
      .limit(50)
      .populate('user', 'name email');
      
    res.json(workouts);
  } catch (e) {
    console.error('Feed Error:', e);
    res.status(500).json({ error: 'Failed to fetch feed' });
  }
}

export async function searchUsers(req, res) {
  try {
    const { q } = req.query;
    const query = q ? { 
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ],
      _id: { $ne: req.user._id }
    } : { _id: { $ne: req.user._id } };

    const users = await User.find(query).select('name email friends').limit(20);
    
    const results = users.map(u => ({
      _id: u._id,
      name: u.name,
      email: u.email,
      isFollowing: req.user.friends.includes(u._id)
    }));

    res.json(results);
  } catch (e) {
    console.error('Search Error:', e);
    res.status(500).json({ error: 'Failed to search users' });
  }
}

export async function leaderboard(req, res) {
  try {
    const end = new Date();
    const start = new Date(); start.setDate(end.getDate() - 7);

    const users = await User.find({ _id: { $in: [...req.user.friends, req.user._id] } }).select('name');
    const ids = users.map(u => u._id);
    const workouts = await Workout.find({ user: { $in: ids }, date: { $gte: start, $lte: end } });

    const map = new Map();
    for (const u of users) map.set(String(u._id), { name: u.name, calories: 0 });
    for (const w of workouts) {
      const key = String(w.user);
      let cals = 0;
      for (const ex of w.exercises) cals += ex.calories || 0;
      if (map.has(key)) map.get(key).calories += cals;
    }
    const board = Array.from(map.values()).sort((a,b)=>b.calories-a.calories).slice(0, 20);
    res.json(board);
  } catch (e) {
    console.error('Leaderboard Error:', e);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
}
