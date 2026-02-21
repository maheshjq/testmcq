import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="gradient-moss rounded-t-[4rem] mt-0">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-cream text-xl font-bold mb-2">දහම්පාසල් MCQ</h3>
            <p className="text-cream/50 text-sm mb-4">
              Interactive Quiz Platform for Dhamma School Students
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse-slow" />
              <span className="text-cream/40 text-xs font-mono">System Operational</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-cream/60 text-xs font-mono tracking-[0.2em] uppercase mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-cream/50 hover:text-cream text-sm transition-colors no-underline">
                  Start a Quiz
                </Link>
              </li>
              <li>
                <Link to="/teacher" className="text-cream/50 hover:text-cream text-sm transition-colors no-underline">
                  Teacher Dashboard
                </Link>
              </li>
              <li>
                <a href="#features" className="text-cream/50 hover:text-cream text-sm transition-colors no-underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-cream/50 hover:text-cream text-sm transition-colors no-underline">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-cream/60 text-xs font-mono tracking-[0.2em] uppercase mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <span className="text-cream/50 text-sm cursor-default">Privacy Policy</span>
              </li>
              <li>
                <span className="text-cream/50 text-sm cursor-default">Copyright Policy</span>
              </li>
              <li>
                <a href="mailto:express.run1@gmail.com" className="text-cream/50 hover:text-cream text-sm transition-colors no-underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-12 pt-8 text-center">
          <p className="text-cream/30 text-xs">
            © {new Date().getFullYear()} දහම්පාසල් MCQ Platform. All rights reserved.
            Content is protected under applicable copyright laws.
          </p>
        </div>
      </div>
    </footer>
  );
}
