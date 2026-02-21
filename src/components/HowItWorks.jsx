import { motion } from 'framer-motion';
import { Search, HelpCircle, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Enter Your Subject',
    description: 'Select a grade and lesson. The system loads your personalized question set instantly.',
    color: 'text-moss',
    bg: 'bg-moss/10',
  },
  {
    icon: HelpCircle,
    step: '02',
    title: 'Answer Each Question',
    description: 'Read carefully. Select your answer. If wrong, the Fibonacci timer gives you deliberate reading time.',
    color: 'text-clay',
    bg: 'bg-clay/10',
  },
  {
    icon: CheckCircle,
    step: '03',
    title: 'Get Instant Feedback',
    description: 'Every answer unlocks detailed explanations. Your score tracks first-attempt accuracy only.',
    color: 'text-success',
    bg: 'bg-success/10',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-moss/50 uppercase mb-4">
            How It Works
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-moss">
            Three steps to{' '}
            <span className="font-serif italic text-clay">mastery</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="card flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                <div className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={step.color} size={28} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-charcoal/30">{step.step}</span>
                    <h3 className="text-xl font-bold text-moss">{step.title}</h3>
                  </div>
                  <p className="text-charcoal/60 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
