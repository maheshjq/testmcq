import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, PlusCircle, BarChart3, BookOpen, Badge } from 'lucide-react';

function LoginWall({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Stub — in production, use Firebase Auth signInWithEmailAndPassword
    if (email && password) {
      onLogin();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[80vh] flex items-center justify-center px-4"
    >
      <div className="card max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-moss/10 flex items-center justify-center mx-auto mb-6">
          <Lock className="text-moss" size={28} />
        </div>

        <h2 className="text-2xl font-bold text-moss mb-2">Teacher Login</h2>
        <p className="text-charcoal/50 text-sm mb-8">
          Sign in with your teacher account to manage quizzes
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 rounded-full bg-cream border border-moss/20 text-charcoal text-sm
              focus:outline-none focus:ring-2 focus:ring-clay/30"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 rounded-full bg-cream border border-moss/20 text-charcoal text-sm
              focus:outline-none focus:ring-2 focus:ring-clay/30"
          />
          <button type="submit" className="btn-primary w-full">
            Sign In
          </button>
        </form>

        <p className="text-xs text-charcoal/30 mt-6">
          Teacher accounts are created by administrators
        </p>
      </div>
    </motion.div>
  );
}

function DashboardStub() {
  const stubs = [
    { icon: BookOpen, title: 'My MCQs', count: '—', label: 'Questions created' },
    { icon: BarChart3, title: 'Analytics', count: '—', label: 'Student attempts' },
    { icon: PlusCircle, title: 'Create', count: '+', label: 'New question set' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-moss">Teacher Dashboard</h2>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-clay/10 text-clay text-xs font-semibold">
          <Badge size={14} />
          Phase 2
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {stubs.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="card text-center opacity-60">
              <div className="w-12 h-12 rounded-2xl bg-moss/10 flex items-center justify-center mx-auto mb-4">
                <Icon className="text-moss" size={24} />
              </div>
              <p className="font-mono text-3xl font-bold text-moss mb-1">{item.count}</p>
              <h3 className="text-sm font-semibold text-moss mb-1">{item.title}</h3>
              <p className="text-xs text-charcoal/40">{item.label}</p>
            </div>
          );
        })}
      </div>

      <div className="card bg-moss/5 border-dashed border-2 border-moss/20 text-center py-12">
        <p className="text-charcoal/40 text-sm mb-2">
          MCQ creation, editing, and analytics are coming in Phase 2
        </p>
        <p className="text-charcoal/30 text-xs">
          You'll be able to create question sets, tag them to subjects, and view student performance
        </p>
      </div>
    </motion.div>
  );
}

export default function TeacherDashboard() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-moss/50 hover:text-moss mb-8 no-underline">
          <ArrowLeft size={14} /> Back to Home
        </Link>

        {authenticated ? (
          <DashboardStub />
        ) : (
          <LoginWall onLogin={() => setAuthenticated(true)} />
        )}
      </div>
    </div>
  );
}
