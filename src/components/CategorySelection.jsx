import { Link } from 'react-router-dom';
import { categories } from '@/config/lessons-metadata';
import { BookOpen, GraduationCap } from 'lucide-react';

export default function CategorySelection() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-2 text-moss font-serif">
          දහම්පාසල් MCQ
        </h1>
        <p className="text-center text-charcoal/50 mb-12 font-mono text-sm">
          Select Your Grade or Subject
        </p>

        {/* Grade Categories */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={18} className="text-moss/60" />
            <h2 className="text-sm font-mono text-moss/60 uppercase tracking-wider">
              Grades
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {categories
              .filter((c) => c.type === 'grade')
              .map((category) => (
                <Link
                  key={category.id}
                  to={`/lessons/${category.id}`}
                  className="no-underline"
                >
                  <div className="card hover:shadow-lg transition-all cursor-pointer h-full border border-moss/10 hover:border-clay/30 bg-white">
                    <div className="p-4 text-center">
                      <p className="text-lg font-bold text-moss mb-1">
                        {category.title}
                      </p>
                      <p className="text-xs text-charcoal/40 font-mono">
                        {category.titleEnglish}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Subject Categories (Final Grade) */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={18} className="text-moss/60" />
            <h2 className="text-sm font-mono text-moss/60 uppercase tracking-wider">
              Final Grade Subjects
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories
              .filter((c) => c.type === 'subject')
              .map((category) => {
                const totalLessons = (category.topics || []).reduce(
                  (sum, t) => sum + t.lessons.length,
                  0
                );
                const isEmpty = totalLessons === 0;

                return (
                  <Link
                    key={category.id}
                    to={isEmpty ? '#' : `/lessons/${category.id}`}
                    className={`no-underline ${isEmpty ? 'pointer-events-none opacity-50' : ''}`}
                  >
                    <div className="card hover:shadow-lg transition-all cursor-pointer h-full border border-moss/10 hover:border-clay/30 bg-white">
                      <div className="p-4 text-center">
                        <p className="text-lg font-bold text-moss mb-1">
                          {category.title}
                        </p>
                        <p className="text-xs text-charcoal/40 font-mono">
                          {category.titleEnglish}
                        </p>
                        {isEmpty && (
                          <span className="inline-block mt-2 text-[10px] px-2 py-0.5 bg-charcoal/5 rounded-full text-charcoal/30 font-mono">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
