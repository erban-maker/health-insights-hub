import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, UserPlus, Lock, Mail, User, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    if (password.length < 6) {
      toast({ title: 'Error', description: 'Password must be at least 6 characters', variant: 'destructive' });
      return;
    }
    if (register(name, email, password)) {
      toast({ title: 'Welcome!', description: 'Account created successfully' });
      navigate('/dashboard');
    } else {
      toast({ title: 'Error', description: 'Email already registered', variant: 'destructive' });
    }
  };

  const pwStrength = password.length === 0 ? null : password.length < 6 ? 'Weak' : password.length < 10 ? 'Medium' : 'Strong';
  const pwColor = pwStrength === 'Weak' ? 'text-destructive' : pwStrength === 'Medium' ? 'text-accent' : 'text-primary';

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8 text-foreground">
          <Shield className="w-7 h-7 text-primary" />
          <span className="text-lg font-display font-bold">HealthPredict</span>
        </Link>
        <Card className="border-0 shadow-[var(--shadow-lg)]">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <UserPlus className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="font-display">Create Account</CardTitle>
            <CardDescription>Register to start your health risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-muted-foreground" /> Name</Label>
                <Input id="name" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-muted-foreground" /> Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-muted-foreground" /> Password</Label>
                <Input id="password" type="password" placeholder="Min 6 characters" value={password} onChange={e => setPassword(e.target.value)} required />
                {pwStrength && <p className={`text-[11px] font-medium ${pwColor}`}>Strength: {pwStrength}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm" className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-muted-foreground" /> Confirm Password</Label>
                <Input id="confirm" type="password" placeholder="Repeat password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                {confirmPassword && password !== confirmPassword && <p className="text-[11px] text-destructive">Passwords do not match</p>}
              </div>
              <Button type="submit" className="w-full" disabled={!name || !email || !password}>Register</Button>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
