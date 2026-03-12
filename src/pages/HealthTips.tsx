
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Apple, Dumbbell, Moon, Droplets, Heart, Brain, Cigarette, Clock } from 'lucide-react';

const tipSections = [
  {
    title: 'Healthy Diet',
    icon: Apple,
    color: 'hsl(152, 60%, 40%)',
    tips: [
      { title: 'Eat More Fruits & Vegetables', desc: 'Aim for at least 5 servings of fruits and vegetables daily. They provide essential vitamins, minerals, and fiber.' },
      { title: 'Reduce Processed Foods', desc: 'Limit intake of fast food, packaged snacks, and sugary drinks. Choose whole, unprocessed foods instead.' },
      { title: 'Stay Hydrated', desc: 'Drink at least 8 glasses (2 liters) of water daily. Proper hydration aids digestion and energy levels.' },
      { title: 'Control Portion Sizes', desc: 'Use smaller plates, eat slowly, and stop when you feel satisfied — not stuffed.' },
      { title: 'Choose Healthy Fats', desc: 'Replace saturated fats with healthy fats from nuts, avocados, olive oil, and fish.' },
    ],
  },
  {
    title: 'Exercise Recommendations',
    icon: Dumbbell,
    color: 'hsl(174, 62%, 38%)',
    tips: [
      { title: '150 Minutes Per Week', desc: 'Aim for at least 150 minutes of moderate aerobic activity like brisk walking, cycling, or swimming.' },
      { title: 'Strength Training', desc: 'Include muscle-strengthening activities at least 2 days per week. Try bodyweight exercises, resistance bands, or weights.' },
      { title: 'Stay Active Throughout the Day', desc: 'Take the stairs, walk during breaks, and avoid sitting for more than 1 hour continuously.' },
      { title: 'Start Small', desc: 'If you\'re new to exercise, start with 10-minute walks and gradually increase duration and intensity.' },
      { title: 'Find Activities You Enjoy', desc: 'Whether it\'s dancing, yoga, or sports — enjoyment is the key to consistency.' },
    ],
  },
  {
    title: 'Sleep Improvement',
    icon: Moon,
    color: 'hsl(270, 60%, 55%)',
    tips: [
      { title: 'Aim for 7-8 Hours', desc: 'Adults need 7-8 hours of quality sleep. Consistent sleep schedules improve overall health.' },
      { title: 'Create a Sleep Routine', desc: 'Go to bed and wake up at the same time every day, even on weekends.' },
      { title: 'Limit Screen Time', desc: 'Avoid phones, tablets, and computers at least 1 hour before bedtime. Blue light disrupts melatonin production.' },
      { title: 'Optimize Your Environment', desc: 'Keep your bedroom cool, dark, and quiet. Consider blackout curtains and white noise.' },
      { title: 'Avoid Stimulants', desc: 'Don\'t consume caffeine or heavy meals within 4-6 hours of bedtime.' },
    ],
  },
  {
    title: 'Stress Management',
    icon: Brain,
    color: 'hsl(36, 90%, 55%)',
    tips: [
      { title: 'Practice Mindfulness', desc: 'Spend 10-15 minutes daily on meditation, deep breathing, or progressive muscle relaxation.' },
      { title: 'Stay Socially Connected', desc: 'Maintain relationships with family and friends. Social support is vital for mental health.' },
      { title: 'Set Boundaries', desc: 'Learn to say no. Overcommitting leads to burnout and chronic stress.' },
      { title: 'Take Regular Breaks', desc: 'Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.' },
      { title: 'Seek Professional Help', desc: 'If stress feels overwhelming, talk to a counselor or therapist. There\'s no shame in seeking help.' },
    ],
  },
];

const HealthTips = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-display font-bold">Health Tips</h1>
          <p className="text-muted-foreground mt-2">Practical lifestyle improvement tips for a healthier, disease-free life</p>
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

        {/* Quick Daily Checklist */}
        <Card className="border-0 shadow-[var(--shadow-lg)] mt-8">
          <CardHeader>
            <CardTitle className="font-display text-lg">Daily Health Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                '💧 Drink 8 glasses of water',
                '🥗 Eat 5 servings of fruits/vegetables',
                '🏃 30 minutes of physical activity',
                '😴 7-8 hours of quality sleep',
                '🧘 10 minutes of mindfulness/meditation',
                '📵 1 hour screen-free before bed',
                '🚶 Take walking breaks every hour',
                '😊 Connect with a friend or family member',
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
