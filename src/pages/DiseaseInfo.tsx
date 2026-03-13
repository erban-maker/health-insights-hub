import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Activity, Brain, Scale, AlertTriangle, CheckCircle, Wind, Droplets, Bone, Eye } from 'lucide-react';

const diseases = [
  {
    title: 'Diabetes (Type 2)',
    icon: Activity,
    color: 'hsl(36, 90%, 55%)',
    description: 'Type 2 diabetes is a chronic metabolic condition where the body becomes resistant to insulin or fails to produce sufficient insulin. This leads to elevated blood sugar levels, which over time can damage blood vessels, nerves, and organs. It is the most common form of diabetes, accounting for about 90-95% of all diabetes cases.',
    causes: ['Obesity and excess visceral fat around the abdomen', 'Physical inactivity and sedentary lifestyle', 'Poor diet high in sugar, refined carbohydrates, and processed foods', 'Family history and genetic predisposition', 'Age over 45 years (risk increases with age)', 'Polycystic ovary syndrome (PCOS)', 'Gestational diabetes during pregnancy', 'Ethnicity — higher risk in South Asian, African, and Hispanic populations'],
    symptoms: ['Increased thirst (polydipsia) and frequent urination (polyuria)', 'Unexplained fatigue and weakness', 'Blurred vision and dry eyes', 'Slow-healing wounds and frequent infections', 'Numbness or tingling in hands and feet (neuropathy)', 'Dark patches on skin (acanthosis nigricans)', 'Unexplained weight loss despite increased appetite'],
    prevention: ['Maintain a healthy body weight (BMI 18.5–24.9)', 'Exercise at least 150 minutes per week (brisk walking, swimming, cycling)', 'Eat a balanced diet rich in whole grains, vegetables, and lean protein', 'Limit sugary beverages and processed snacks', 'Get regular fasting blood sugar and HbA1c screenings', 'Manage stress through relaxation techniques', 'Get 7-8 hours of quality sleep nightly'],
    complications: ['Cardiovascular disease and stroke', 'Kidney disease (diabetic nephropathy)', 'Vision loss (diabetic retinopathy)', 'Nerve damage leading to amputations', 'Increased risk of infections'],
    stat: '422 million people affected worldwide',
  },
  {
    title: 'Heart Disease (Cardiovascular)',
    icon: Heart,
    color: 'hsl(0, 72%, 51%)',
    description: 'Cardiovascular disease (CVD) encompasses a range of conditions affecting the heart and blood vessels, including coronary artery disease, heart attacks, heart failure, arrhythmias, and stroke. It is the leading cause of death globally. Atherosclerosis — the buildup of fatty plaques in arteries — is the primary underlying process in most heart diseases.',
    causes: ['High blood pressure (hypertension) — the "silent killer"', 'High LDL cholesterol and low HDL cholesterol', 'Smoking and tobacco use (damages blood vessel lining)', 'Physical inactivity and sedentary behavior', 'Obesity, especially abdominal obesity', 'Excessive alcohol consumption', 'Chronic stress and poor mental health', 'Diabetes and insulin resistance', 'Family history of heart disease', 'Unhealthy diet high in saturated fats, trans fats, and sodium'],
    symptoms: ['Chest pain, pressure, or tightness (angina)', 'Shortness of breath during activity or at rest', 'Pain radiating to neck, jaw, shoulders, or arms', 'Irregular or rapid heartbeat (palpitations)', 'Swelling in legs, ankles, or feet (edema)', 'Dizziness, lightheadedness, or fainting', 'Persistent fatigue and weakness', 'Cold sweats and nausea (heart attack warning signs)'],
    prevention: ['Quit smoking and avoid secondhand smoke', 'Exercise at least 30 minutes most days of the week', 'Eat heart-healthy foods — fruits, vegetables, whole grains, omega-3 fatty acids', 'Limit sodium intake to less than 2,300 mg per day', 'Maintain healthy blood pressure (below 120/80 mmHg)', 'Keep cholesterol levels in check with regular testing', 'Manage diabetes and blood sugar levels', 'Limit alcohol to moderate consumption', 'Practice stress management techniques', 'Maintain a healthy weight'],
    complications: ['Heart attack (myocardial infarction)', 'Stroke and transient ischemic attacks', 'Heart failure', 'Peripheral artery disease', 'Sudden cardiac arrest'],
    stat: '#1 cause of death worldwide — 17.9 million deaths/year',
  },
  {
    title: 'Obesity',
    icon: Scale,
    color: 'hsl(174, 62%, 38%)',
    description: 'Obesity is a complex, chronic disease defined by excessive body fat accumulation that impairs health. It is measured using Body Mass Index (BMI), where a BMI of 30 or higher indicates obesity. Obesity significantly increases the risk of type 2 diabetes, heart disease, certain cancers, sleep apnea, osteoarthritis, and mental health disorders. It has reached epidemic proportions globally.',
    causes: ['Energy imbalance — consuming more calories than the body burns', 'Sedentary lifestyle with minimal physical activity', 'Genetic and hereditary factors (over 50 genes linked to obesity)', 'Poor sleep patterns and sleep deprivation', 'Chronic stress leading to emotional and comfort eating', 'Medications (antidepressants, steroids, antipsychotics)', 'Hormonal imbalances (hypothyroidism, Cushing syndrome)', 'Environmental factors — easy access to cheap, calorie-dense food', 'Socioeconomic factors — limited access to healthy food and safe exercise spaces'],
    symptoms: ['BMI of 30 or higher', 'Breathlessness during light physical activity', 'Excessive sweating even with minimal exertion', 'Chronic joint and back pain', 'Difficulty sleeping and snoring (obstructive sleep apnea)', 'Skin problems — chafing, stretch marks, skin fold infections', 'Fatigue and low energy levels', 'Psychological impacts — low self-esteem, depression, social isolation'],
    prevention: ['Follow a balanced, nutrient-dense diet with appropriate calorie intake', 'Engage in at least 60 minutes of moderate physical activity daily', 'Limit processed foods, fast food, sugary drinks, and refined carbohydrates', 'Get 7-9 hours of quality sleep every night', 'Track your weight and BMI regularly', 'Practice mindful eating — eat slowly, avoid distractions', 'Manage stress without turning to food', 'Cook meals at home using fresh ingredients', 'Stay hydrated — drink water before meals'],
    complications: ['Type 2 diabetes', 'Heart disease and stroke', 'Certain cancers (breast, colon, kidney)', 'Osteoarthritis', 'Sleep apnea and breathing problems', 'Liver disease (non-alcoholic fatty liver)', 'Depression and anxiety'],
    stat: '1 in 8 people globally are now living with obesity',
  },
  {
    title: 'Hypertension (High Blood Pressure)',
    icon: Droplets,
    color: 'hsl(220, 70%, 50%)',
    description: 'Hypertension is a condition where blood pushes against artery walls with consistently too much force. It is often called the "silent killer" because it typically has no symptoms but can lead to serious complications like heart attack, stroke, and kidney failure. Normal blood pressure is below 120/80 mmHg.',
    causes: ['Excessive salt (sodium) intake', 'Obesity and excess body weight', 'Physical inactivity', 'Excessive alcohol consumption', 'Chronic stress', 'Smoking and tobacco use', 'Family history and genetics', 'Age — risk increases after 40', 'Chronic kidney disease', 'Sleep apnea'],
    symptoms: ['Usually no symptoms (silent condition)', 'Severe headaches in extreme cases', 'Nosebleeds', 'Shortness of breath', 'Dizziness and blurred vision', 'Chest pain', 'Blood in urine (advanced stage)'],
    prevention: ['Reduce sodium intake to less than 1,500 mg daily', 'Eat potassium-rich foods (bananas, spinach, sweet potatoes)', 'Exercise regularly — at least 30 minutes daily', 'Maintain a healthy weight', 'Limit alcohol consumption', 'Quit smoking', 'Manage stress with yoga, meditation, or deep breathing', 'Monitor blood pressure regularly at home', 'Follow the DASH diet (Dietary Approaches to Stop Hypertension)'],
    complications: ['Heart attack and heart failure', 'Stroke', 'Kidney damage and failure', 'Vision loss', 'Cognitive decline and dementia'],
    stat: '1.28 billion adults aged 30-79 have hypertension worldwide',
  },
  {
    title: 'Respiratory Diseases (COPD & Asthma)',
    icon: Wind,
    color: 'hsl(190, 55%, 45%)',
    description: 'Chronic respiratory diseases affect the airways and lungs. COPD (Chronic Obstructive Pulmonary Disease) is a progressive lung disease that makes breathing difficult, while asthma causes inflammation and narrowing of the airways. Both are strongly linked to lifestyle factors, particularly smoking and air pollution exposure.',
    causes: ['Smoking and tobacco use (primary cause of COPD)', 'Prolonged exposure to air pollution and dust', 'Occupational exposure to chemicals and fumes', 'Genetic factors (alpha-1 antitrypsin deficiency)', 'Childhood respiratory infections', 'Allergens — pollen, dust mites, pet dander', 'Indoor cooking with solid fuels in poorly ventilated areas'],
    symptoms: ['Chronic cough with or without mucus', 'Shortness of breath, especially during physical activity', 'Wheezing and chest tightness', 'Frequent respiratory infections', 'Fatigue and reduced exercise tolerance', 'Bluish lips or fingernails (cyanosis) in severe cases'],
    prevention: ['Quit smoking and avoid secondhand smoke', 'Reduce exposure to air pollutants', 'Use protective equipment in dusty/chemical workplaces', 'Get flu and pneumonia vaccinations', 'Exercise regularly to strengthen lung capacity', 'Maintain good indoor air quality', 'Manage allergies and avoid known triggers'],
    complications: ['Respiratory failure', 'Pulmonary hypertension', 'Frequent hospitalizations', 'Significant reduction in quality of life', 'Heart problems due to low oxygen levels'],
    stat: '3.23 million deaths from COPD annually; 262 million people have asthma',
  },
  {
    title: 'Stress & Mental Health',
    icon: Brain,
    color: 'hsl(270, 60%, 55%)',
    description: 'Chronic stress triggers sustained activation of the body\'s fight-or-flight response, flooding the system with cortisol and adrenaline. Over time, this can lead to anxiety disorders, depression, digestive problems, heart disease, weakened immunity, sleep disorders, and cognitive decline. Mental health is as important as physical health and significantly impacts overall well-being and disease risk.',
    causes: ['Work pressure, long hours, and job insecurity', 'Financial difficulties and debt', 'Relationship conflicts and family problems', 'Chronic sleep deprivation', 'Excessive screen time and social media use', 'Traumatic life events (loss, abuse, accidents)', 'Social isolation and loneliness', 'Chronic illness and pain', 'Academic pressure in students', 'Caregiving responsibilities'],
    symptoms: ['Persistent anxiety, worry, or feelings of dread', 'Chronic headaches and muscle tension', 'Insomnia or disrupted sleep patterns', 'Irritability, mood swings, and emotional outbursts', 'Fatigue, low energy, and lack of motivation', 'Difficulty concentrating and memory problems', 'Changes in appetite — overeating or loss of appetite', 'Social withdrawal and loss of interest in activities', 'Physical symptoms — stomach problems, rapid heartbeat, sweating'],
    prevention: ['Practice daily meditation or mindfulness (10-20 minutes)', 'Exercise regularly — a natural mood booster and stress reliever', 'Maintain strong social connections with family and friends', 'Set boundaries and learn to say no to overcommitment', 'Limit screen time, especially before bed', 'Develop healthy coping mechanisms (journaling, hobbies, nature walks)', 'Get 7-9 hours of quality sleep', 'Seek professional counseling or therapy when needed', 'Practice gratitude and positive self-talk', 'Take regular breaks during work — use the Pomodoro technique'],
    complications: ['Clinical depression and anxiety disorders', 'Substance abuse', 'Cardiovascular disease', 'Weakened immune system', 'Digestive disorders (IBS)', 'Chronic pain conditions'],
    stat: '1 in 4 people will be affected by mental health disorders at some point in life',
  },
  {
    title: 'Musculoskeletal Disorders',
    icon: Bone,
    color: 'hsl(30, 65%, 50%)',
    description: 'Musculoskeletal disorders include conditions affecting bones, joints, muscles, and connective tissues. Osteoarthritis, osteoporosis, and chronic back pain are among the most common. Sedentary lifestyles, poor posture, obesity, and lack of physical activity significantly increase the risk of these conditions.',
    causes: ['Sedentary lifestyle and prolonged sitting', 'Poor posture, especially at desks and computers', 'Obesity putting excess stress on joints', 'Lack of regular exercise and muscle strengthening', 'Aging and natural wear of cartilage', 'Previous joint injuries', 'Calcium and vitamin D deficiency', 'Repetitive strain from work activities'],
    symptoms: ['Joint pain, stiffness, and swelling', 'Chronic back and neck pain', 'Reduced range of motion', 'Muscle weakness and fatigue', 'Difficulty performing daily activities', 'Bone fractures with minimal trauma (osteoporosis)'],
    prevention: ['Maintain good posture while sitting and standing', 'Exercise regularly — include weight-bearing and flexibility exercises', 'Maintain a healthy weight to reduce joint stress', 'Ensure adequate calcium and vitamin D intake', 'Take regular breaks from sitting — stretch every 30 minutes', 'Use ergonomic furniture and equipment', 'Strengthen core muscles to support the spine', 'Avoid repetitive strain — vary tasks and movements'],
    complications: ['Chronic disability and reduced mobility', 'Falls and fractures in elderly', 'Chronic pain and reduced quality of life', 'Depression due to limited activity'],
    stat: '1.71 billion people have musculoskeletal conditions globally',
  },
];

const DiseaseInfo = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-display font-bold">Disease Information</h1>
          <p className="text-muted-foreground mt-2">Comprehensive guide to common lifestyle diseases — causes, symptoms, prevention, and complications</p>
        </div>

        <div className="space-y-8">
          {diseases.map((d, idx) => (
            <Card key={idx} className="border-0 shadow-[var(--shadow-lg)] overflow-hidden">
              <div className="h-1" style={{ backgroundColor: d.color }} />
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${d.color}15` }}>
                    <d.icon className="w-6 h-6" style={{ color: d.color }} />
                  </div>
                  <div>
                    <CardTitle className="font-display text-xl">{d.title}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">{d.stat}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm text-muted-foreground leading-relaxed">{d.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-destructive/5 border border-destructive/10 p-4">
                    <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2">
                      <AlertTriangle className="w-4 h-4 text-destructive" /> Causes & Risk Factors
                    </h4>
                    <ul className="space-y-1">
                      {d.causes.map((c, i) => <li key={i} className="text-xs text-muted-foreground">• {c}</li>)}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-accent/5 border border-accent/10 p-4">
                    <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2">
                      <Activity className="w-4 h-4 text-accent" /> Symptoms
                    </h4>
                    <ul className="space-y-1">
                      {d.symptoms.map((s, i) => <li key={i} className="text-xs text-muted-foreground">• {s}</li>)}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
                    <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2">
                      <CheckCircle className="w-4 h-4 text-primary" /> Prevention
                    </h4>
                    <ul className="space-y-1">
                      {d.prevention.map((p, i) => <li key={i} className="text-xs text-muted-foreground">• {p}</li>)}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-muted/50 border p-4">
                    <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2">
                      <AlertTriangle className="w-4 h-4 text-muted-foreground" /> Complications
                    </h4>
                    <ul className="space-y-1">
                      {d.complications.map((c, i) => <li key={i} className="text-xs text-muted-foreground">• {c}</li>)}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* General Prevention Tips */}
        <Card className="border-0 shadow-[var(--shadow-lg)] mt-8">
          <CardHeader>
            <CardTitle className="font-display text-lg">General Disease Prevention Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                '🩺 Get annual health check-ups and screenings',
                '🏃 Stay physically active — at least 150 min/week',
                '🥦 Eat a balanced, whole-food diet',
                '🚭 Avoid smoking and limit alcohol',
                '😴 Prioritize 7-9 hours of quality sleep',
                '💧 Stay well-hydrated throughout the day',
                '🧘 Manage stress with proven techniques',
                '📊 Monitor key health metrics (BP, BMI, blood sugar)',
                '💊 Take prescribed medications as directed',
                '🤝 Maintain social connections for mental well-being',
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

export default DiseaseInfo;
