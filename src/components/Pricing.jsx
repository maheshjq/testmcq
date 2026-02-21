import { motion } from 'framer-motion';
import { Check, Star, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Get started with quizzes and standard feedback.',
    icon: Check,
    features: [
      'Unlimited quiz attempts',
      'Standard feedback on wrong answers',
      'Score tracking per session',
      'Ads between questions',
    ],
    cta: 'Start Free',
    href: '/quiz',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: '$4.99',
    period: '/month',
    description: 'Ad-free learning with enhanced feedback and AI tools.',
    icon: Star,
    features: [
      'Everything in Free',
      'Ad-free experience',
      'Enhanced detailed feedback',
      'AI-powered explanations',
      'Progress tracking across sessions',
    ],
    cta: 'Upgrade to Premium',
    href: '#',
    highlighted: true,
  },
  {
    name: 'Teacher',
    price: '$9.99',
    period: '/month',
    description: 'Create MCQs, manage students, and view analytics.',
    icon: GraduationCap,
    features: [
      'Everything in Premium',
      'MCQ creation interface',
      'Student analytics dashboard',
      'Quiz monetization tools',
      'Bulk question import',
    ],
    cta: 'Start Teaching',
    href: '/teacher',
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 gradient-moss">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-cream/40 uppercase mb-4">
            Pricing
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-cream">
            Choose your{' '}
            <span className="font-serif italic text-clay">path</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`rounded-card p-8 flex flex-col ${
                  plan.highlighted
                    ? 'bg-cream ring-2 ring-clay shadow-2xl scale-[1.02]'
                    : 'bg-cream/10 border border-cream/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      plan.highlighted ? 'bg-clay/10' : 'bg-cream/10'
                    }`}
                  >
                    <Icon
                      size={20}
                      className={plan.highlighted ? 'text-clay' : 'text-cream/70'}
                    />
                  </div>
                  <h3
                    className={`text-lg font-bold ${
                      plan.highlighted ? 'text-moss' : 'text-cream'
                    }`}
                  >
                    {plan.name}
                  </h3>
                </div>

                <div className="mb-4">
                  <span
                    className={`text-4xl font-bold ${
                      plan.highlighted ? 'text-moss' : 'text-cream'
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${
                      plan.highlighted ? 'text-charcoal/50' : 'text-cream/50'
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>

                <p
                  className={`text-sm mb-6 ${
                    plan.highlighted ? 'text-charcoal/60' : 'text-cream/60'
                  }`}
                >
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-center gap-2 text-sm ${
                        plan.highlighted ? 'text-charcoal/70' : 'text-cream/70'
                      }`}
                    >
                      <Check size={16} className="text-success shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.href}
                  className={`block text-center py-3 px-6 rounded-full font-semibold transition-all duration-300 hover:scale-[1.03] no-underline ${
                    plan.highlighted
                      ? 'bg-clay text-white'
                      : 'border-2 border-cream/30 text-cream hover:bg-cream hover:text-moss'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
