// Mock nutrition search – replace with real API integration (Nutritionix/Edamam)
export async function searchFood(req, res) {
  const { q = '' } = req.query;
  const sample = [
    { name: 'Apple (1 medium)', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
    { name: 'Banana (1 medium)', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
    { name: 'Chicken breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  ].filter(x => x.name.toLowerCase().includes(String(q).toLowerCase()));
  res.json(sample);
}
