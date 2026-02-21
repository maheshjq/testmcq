import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, BarChart3, BookOpen } from 'lucide-react';

function FlipCard() {
  const states = ['Correct ✓', 'Read & Retry', 'Fibonacci Timer'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % states.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const colors = ['bg-success/10 text-success', 'bg-clay/10 text-clay', 'bg-moss/10 text-moss'];

  return (
    <div className="h-16 flex items-center justify-center">
      <motion.div
        key={index}
        initial={{ rotateX: 90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        exit={{ rotateX: -90, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={`px-6 py-3 rounded-full font-semibold text-sm ${colors[index]}`}
      >
        {states[index]}
      </motion.div>
    </div>
  );
}

function ScoreFeed() {
  const lines = [
    'Q3: +2 points',
    'Streak: 3 correct',
    'Score: 6/10',
    'Q4: +1 point',
    'Accuracy: 75%',
  ];
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        const next = [...prev, lines[i % lines.length]];
        return next.slice(-3);
      });
      i++;
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-xs text-moss/80 space-y-1 h-16 flex flex-col justify-center">
      {visibleLines.map((line, idx) => (
        <motion.div
          key={`${line}-${idx}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-clay">▸</span>
          {line}
        </motion.div>
      ))}
    </div>
  );
}

function SubjectBrowser() {
  const subjects = ['Grade 6 L1', 'Grade 7 L3', 'Grade 8 L1', 'Grade 10 L5', 'Grade 9 L1', 'Grade 10 L6'];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % subjects.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap gap-2 justify-center h-16 items-center">
      {subjects.map((s, i) => (
        <motion.span
          key={s}
          animate={{
            scale: i === active ? 1.1 : 1,
            backgroundColor: i === active ? '#CC5833' : '#2E403610',
            color: i === active ? '#fff' : '#2E4036',
          }}
          transition={{ duration: 0.3 }}
          className="px-3 py-1 rounded-full text-xs font-medium cursor-default"
        >
          {s}
        </motion.span>
      ))}
    </div>
  );
}

const features = [
  {
    icon: Brain,
    title: 'Smart Feedback Engine',
    description:
      'Wrong answers trigger reading time + Fibonacci back-off timers. Students absorb feedback before retrying.',
    visual: FlipCard,
  },
  {
    icon: BarChart3,
    title: 'Live Score Telemetry',
    description:
      'Real-time score tracking, streak detection, and performance metrics displayed as you answer.',
    visual: ScoreFeed,
  },
  {
    icon: BookOpen,
    title: 'Subject Browser',
    description:
      'Browse quizzes by grade and lesson. Jump into any subject with a single click.',
    visual: SubjectBrowser,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-moss/50 uppercase mb-4">
            Platform Features
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-moss">
            Built for{' '}
            <span className="font-serif italic text-clay">deep learning</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const Visual = feature.visual;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="card hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-moss/10 flex items-center justify-center mb-6">
                  <Icon className="text-moss" size={24} />
                </div>
                <h3 className="text-xl font-bold text-moss mb-3">{feature.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>
                <Visual />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
