import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, LogIn, Lock, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      toast({ title: 'Welcome back!', description: 'Login successful' });
      navigate('/dashboard');
    } else {
      toast({ title: 'Error', description: 'Invalid email or password', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 justify-center mb-8 text-foreground">
          <Shield className="w-7 h-7 text-primary" />
          <span className="text-lg font-display font-bold">HealthPredict</span>
        </Link>
        <Card className="border-0 shadow-[var(--shadow-lg)]">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <LogIn className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="font-display">Welcome Back</CardTitle>
            <CardDescription>Login to access your health dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-muted-foreground" /> Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-muted-foreground" /> Password</Label>
                <Input id="password" type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={!email || !password}>Login</Button>
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Register</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
