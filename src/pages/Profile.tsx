import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormData } from '@/contexts/useFormData';
import { User, Mail, Activity, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const { predictions } = useFormData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const latest = predictions[0];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-display font-bold mb-8">My Profile</h1>

      <div className="space-y-6">
        <Card className="border-0 shadow-[var(--shadow-lg)]">
          <CardHeader>
            <CardTitle className="font-display text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <User className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="text-sm font-medium">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{user.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-[var(--shadow-lg)]">
          <CardHeader>
            <CardTitle className="font-display text-lg">Health Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <Activity className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Total Assessments</p>
                <p className="text-sm font-medium">{predictions.length}</p>
              </div>
            </div>
            {latest && (
              <>
                <div className="flex items-center gap-3 p-3 rounded-lg border">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Last Assessment</p>
                    <p className="text-sm font-medium">
                      {new Date(latest.timestamp).toLocaleDateString()} — Score: {latest.healthScore}/100 ({latest.riskLevel} Risk)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border">
                  <Activity className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Latest BMI</p>
                    <p className="text-sm font-medium">{latest.bmi} — {latest.bmiCategory}</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
