import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Apple, Dumbbell, Moon, Droplets, Heart, Brain, Cigarette, Clock, Eye, Shield, Thermometer, Baby } from 'lucide-react';

const tipSections = [
  {
    title: 'Healthy Diet & Nutrition',
    icon: Apple,
    color: 'hsl(152, 60%, 40%)',
    tips: [
      { title: 'Eat More Fruits & Vegetables', desc: 'Aim for at least 5 servings of fruits and vegetables daily. They provide essential vitamins, minerals, antioxidants, and fiber that protect against chronic diseases.' },
      { title: 'Reduce Processed Foods', desc: 'Limit intake of fast food, packaged snacks, sugary drinks, and foods with artificial additives. Choose whole, unprocessed foods instead.' },
      { title: 'Stay Hydrated', desc: 'Drink at least 8 glasses (2 liters) of water daily. Proper hydration aids digestion, nutrient absorption, circulation, and energy levels.' },
      { title: 'Control Portion Sizes', desc: 'Use smaller plates, eat slowly, and stop when you feel satisfied — not stuffed. Mindful eating prevents overeating.' },
      { title: 'Choose Healthy Fats', desc: 'Replace saturated and trans fats with healthy unsaturated fats from nuts, avocados, olive oil, seeds, and fatty fish like salmon.' },
      { title: 'Eat More Fiber', desc: 'Include whole grains, legumes, fruits, and vegetables. Fiber improves digestion, lowers cholesterol, and helps control blood sugar.' },
      { title: 'Limit Sugar Intake', desc: 'Reduce added sugars to less than 25g per day. Read food labels — sugar hides in sauces, bread, yogurt, and "health" bars.' },
      { title: 'Include Lean Protein', desc: 'Eat lean meats, fish, eggs, beans, lentils, and tofu. Protein is essential for muscle repair, immune function, and satiety.' },
      { title: 'Don\'t Skip Breakfast', desc: 'A nutritious breakfast kickstarts metabolism, stabilizes blood sugar, and prevents overeating later in the day.' },
      { title: 'Cook at Home', desc: 'Home-cooked meals are healthier, lower in calories, and give you control over ingredients and portions.' },
    ],
  },
  {
    title: 'Exercise & Physical Activity',
    icon: Dumbbell,
    color: 'hsl(174, 62%, 38%)',
    tips: [
      { title: '150 Minutes Per Week', desc: 'Aim for at least 150 minutes of moderate aerobic activity like brisk walking, cycling, swimming, or dancing every week.' },
      { title: 'Strength Training', desc: 'Include muscle-strengthening activities at least 2 days per week. Try bodyweight exercises, resistance bands, weights, or yoga.' },
      { title: 'Stay Active Throughout the Day', desc: 'Take the stairs, walk during breaks, stretch at your desk, and avoid sitting for more than 1 hour continuously.' },
      { title: 'Start Small and Build Up', desc: 'If you\'re new to exercise, start with 10-minute walks and gradually increase duration and intensity over weeks.' },
      { title: 'Find Activities You Enjoy', desc: 'Whether it\'s dancing, swimming, hiking, yoga, sports, or gardening — enjoyment is the key to long-term consistency.' },
      { title: 'Stretch and Warm Up', desc: 'Always warm up before exercise and cool down after. Stretching prevents injuries and improves flexibility.' },
      { title: 'Walk 10,000 Steps Daily', desc: 'Use a pedometer or phone to track steps. Walking is one of the simplest and most effective forms of exercise for all ages.' },
      { title: 'Mix Cardio and Strength', desc: 'Combine aerobic exercises (running, cycling) with strength training for optimal heart health, bone density, and metabolism.' },
    ],
  },
  {
    title: 'Sleep & Recovery',
    icon: Moon,
    color: 'hsl(270, 60%, 55%)',
    tips: [
      { title: 'Aim for 7-9 Hours', desc: 'Adults need 7-9 hours of quality sleep. Consistent, adequate sleep improves immunity, mood, memory, and overall health.' },
      { title: 'Create a Sleep Routine', desc: 'Go to bed and wake up at the same time every day, even on weekends. Consistency regulates your body\'s internal clock.' },
      { title: 'Limit Screen Time Before Bed', desc: 'Avoid phones, tablets, and computers at least 1 hour before bedtime. Blue light disrupts melatonin production and sleep quality.' },
      { title: 'Optimize Your Bedroom', desc: 'Keep your bedroom cool (18-20°C), dark, and quiet. Consider blackout curtains, earplugs, or white noise machines.' },
      { title: 'Avoid Stimulants', desc: 'Don\'t consume caffeine after 2 PM or heavy meals within 3 hours of bedtime. Avoid alcohol close to bedtime — it disrupts sleep cycles.' },
      { title: 'Practice Relaxation', desc: 'Try reading, gentle stretching, meditation, or deep breathing exercises before bed to signal your body it\'s time to wind down.' },
      { title: 'Limit Naps', desc: 'If you nap, keep it under 20-30 minutes and avoid napping after 3 PM. Long or late naps interfere with nighttime sleep.' },
      { title: 'Get Morning Sunlight', desc: 'Expose yourself to natural sunlight within 30 minutes of waking. This resets your circadian rhythm and improves sleep quality.' },
    ],
  },
  {
    title: 'Stress Management & Mental Wellness',
    icon: Brain,
    color: 'hsl(36, 90%, 55%)',
    tips: [
      { title: 'Practice Mindfulness Daily', desc: 'Spend 10-20 minutes daily on meditation, deep breathing, body scan, or progressive muscle relaxation. Apps can help guide you.' },
      { title: 'Stay Socially Connected', desc: 'Maintain meaningful relationships with family and friends. Social support is one of the strongest protectors of mental health.' },
      { title: 'Set Healthy Boundaries', desc: 'Learn to say no. Overcommitting leads to burnout, resentment, and chronic stress. Prioritize your well-being.' },
      { title: 'Take Regular Breaks', desc: 'Follow the Pomodoro technique: work for 25 minutes, then take a 5-minute break. Every 2 hours, take a longer 15-20 minute break.' },
      { title: 'Seek Professional Help', desc: 'If stress feels overwhelming, talk to a counselor, therapist, or doctor. Mental health care is healthcare — there\'s no shame in seeking help.' },
      { title: 'Practice Gratitude', desc: 'Write down 3 things you\'re grateful for each day. Gratitude journaling is proven to improve mood and life satisfaction.' },
      { title: 'Limit News and Social Media', desc: 'Constant exposure to negative news and social comparison increases anxiety. Set specific times for checking news and social media.' },
      { title: 'Spend Time in Nature', desc: 'Just 20 minutes in nature can lower cortisol levels. Walk in a park, garden, or forest regularly for mental clarity and calm.' },
    ],
  },
  {
    title: 'Hydration & Detox',
    icon: Droplets,
    color: 'hsl(200, 70%, 50%)',
    tips: [
      { title: 'Drink Water First Thing', desc: 'Start your day with a glass of water. After 7-8 hours of sleep, your body is dehydrated and needs fluids to kickstart metabolism.' },
      { title: 'Carry a Water Bottle', desc: 'Having water accessible throughout the day makes it easier to stay hydrated. Set hourly reminders if needed.' },
      { title: 'Eat Water-Rich Foods', desc: 'Watermelon, cucumber, oranges, strawberries, and lettuce are over 90% water and contribute to daily hydration.' },
      { title: 'Monitor Urine Color', desc: 'Pale yellow urine indicates good hydration. Dark yellow or amber means you need to drink more water.' },
      { title: 'Limit Sugary & Caffeinated Drinks', desc: 'Replace sodas, energy drinks, and excessive coffee with water, herbal teas, or infused water with lemon and mint.' },
      { title: 'Drink Before Meals', desc: 'Having a glass of water 30 minutes before meals aids digestion and can help with portion control and weight management.' },
    ],
  },
  {
    title: 'Heart Health',
    icon: Heart,
    color: 'hsl(0, 72%, 51%)',
    tips: [
      { title: 'Know Your Numbers', desc: 'Monitor blood pressure, cholesterol, blood sugar, and BMI regularly. Know the healthy ranges and track changes over time.' },
      { title: 'Eat Heart-Healthy Foods', desc: 'Focus on omega-3 rich fish, nuts, seeds, olive oil, fruits, vegetables, and whole grains. Limit saturated fats and sodium.' },
      { title: 'Quit Smoking', desc: 'Smoking is the single biggest preventable risk factor for heart disease. Within 1 year of quitting, your heart attack risk drops significantly.' },
      { title: 'Manage Blood Pressure', desc: 'Keep blood pressure below 120/80 mmHg. Reduce salt, exercise regularly, manage stress, and take prescribed medications.' },
      { title: 'Limit Alcohol', desc: 'If you drink, do so in moderation — no more than 1 drink per day for women and 2 for men. Excessive drinking damages the heart.' },
      { title: 'Manage Cholesterol', desc: 'Limit trans fats and saturated fats. Eat more soluble fiber (oats, beans). Get cholesterol tested every 4-6 years, or more often if at risk.' },
    ],
  },
  {
    title: 'Preventive Health & Screenings',
    icon: Shield,
    color: 'hsl(152, 45%, 45%)',
    tips: [
      { title: 'Annual Health Check-ups', desc: 'Schedule comprehensive health check-ups annually, even if you feel healthy. Early detection saves lives and reduces treatment costs.' },
      { title: 'Dental Check-ups', desc: 'Visit the dentist every 6 months. Poor dental health is linked to heart disease, diabetes, and respiratory infections.' },
      { title: 'Eye Examinations', desc: 'Get eye exams every 1-2 years. Screen time and aging increase risk of vision problems, glaucoma, and diabetic retinopathy.' },
      { title: 'Skin Checks', desc: 'Examine your skin monthly for new or changing moles. Use sunscreen (SPF 30+) daily to prevent skin damage and cancer.' },
      { title: 'Vaccinations', desc: 'Stay up to date with recommended vaccinations including flu shots, tetanus, and age-appropriate screenings.' },
      { title: 'Know Your Family History', desc: 'Understanding your family\'s health history helps identify your risk for certain diseases and guides preventive measures.' },
    ],
  },
];

const HealthTips = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-display font-bold">Health Tips</h1>
          <p className="text-muted-foreground mt-2">Comprehensive lifestyle improvement tips for a healthier, disease-free life</p>
        </div>

        <div className="space-y-8">
          {tipSections.map((section, idx) => (
            <Card key={idx} className="border-0 shadow-[var(--shadow-lg)] overflow-hidden">
              <div className="h-1" style={{ backgroundColor: section.color }} />
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${section.color}15` }}>
                    <section.icon className="w-6 h-6" style={{ color: section.color }} />
                  </div>
                  <CardTitle className="font-display text-xl">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.tips.map((tip, i) => (
                    <div key={i} className="p-4 rounded-xl border bg-card hover:shadow-[var(--shadow-sm)] transition-shadow">
                      <h4 className="text-sm font-semibold mb-1">{tip.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{tip.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Daily Checklist */}
        <Card className="border-0 shadow-[var(--shadow-lg)] mt-8">
          <CardHeader>
            <CardTitle className="font-display text-lg">Daily Health Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                '💧 Drink 8+ glasses of water',
                '🥗 Eat 5 servings of fruits/vegetables',
                '🏃 30 minutes of physical activity',
                '😴 7-9 hours of quality sleep',
                '🧘 10 minutes of mindfulness/meditation',
                '📵 1 hour screen-free before bed',
                '🚶 Take walking breaks every hour',
                '😊 Connect with a friend or family member',
                '🍳 Eat a nutritious breakfast',
                '☀️ Get 15 minutes of morning sunlight',
                '📝 Write 3 things you\'re grateful for',
                '🦷 Brush and floss twice daily',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-3 rounded-lg border">
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Goals */}
        <Card className="border-0 shadow-[var(--shadow-lg)] mt-6">
          <CardHeader>
            <CardTitle className="font-display text-lg">Weekly Health Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                '🏋️ 2+ strength training sessions',
                '🥬 Try a new healthy recipe',
                '📖 Read for at least 30 minutes',
                '🌳 Spend time outdoors in nature',
                '🧹 Declutter one area of your home',
                '📞 Call or visit someone you care about',
                '📊 Track and review your health metrics',
                '🛁 Dedicate time for self-care and relaxation',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-3 rounded-lg border">
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default HealthTips;
