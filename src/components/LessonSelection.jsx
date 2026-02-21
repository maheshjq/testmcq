import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCategoryById } from '@/config/lessons-metadata';
import { ArrowLeft, Check, Play } from 'lucide-react';

export default function LessonSelection() {
  const { category: categoryId } = useParams();
  const navigate = useNavigate();
  const category = getCategoryById(categoryId);
  const [selectedFiles, setSelectedFiles] = useState([]);

  if (!category) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="card max-w-md w-full text-center">
          <h3 className="text-lg font-bold text-moss mb-2">Category Not Found</h3>
          <p className="text-charcoal/50 text-sm mb-6">
            The category &quot;{categoryId}&quot; does not exist.
          </p>
          <Link to="/" className="btn-primary inline-flex items-center gap-2 no-underline">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleToggleLesson = (file) => {
    setSelectedFiles((prev) =>
      prev.includes(file)
        ? prev.filter((f) => f !== file)
        : [...prev, file]
    );
  };

  const handleSelectAll = (files) => {
    const allSelected = files.every((f) => selectedFiles.includes(f));
    if (allSelected) {
      setSelectedFiles((prev) => prev.filter((f) => !files.includes(f)));
    } else {
      setSelectedFiles((prev) => [...new Set([...prev, ...files])]);
    }
  };

  const handleStartQuiz = () => {
    if (selectedFiles.length === 0) return;
    const filesParam = selectedFiles.join(',');
    navigate(`/quiz?category=${categoryId}&files=${encodeURIComponent(filesParam)}`);
  };

  // Gather all available lesson files for "Select All"
  const allFiles = category.type === 'grade'
    ? (category.lessons || []).map((l) => l.file)
    : (category.topics || []).flatMap((t) => t.lessons.map((l) => l.file));

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm font-mono">
          <Link to="/" className="text-moss/50 hover:text-moss no-underline">
            Home
          </Link>
          <span className="text-charcoal/20 mx-2">/</span>
          <span className="text-charcoal/70">{category.titleEnglish}</span>
        </nav>

        <h1 className="text-3xl font-bold mb-1 text-moss font-serif">
          {category.title}
        </h1>
        <p className="text-charcoal/50 mb-8 font-mono text-sm">
          {category.titleEnglish}
        </p>

        {/* Select All toggle */}
        {allFiles.length > 1 && (
          <button
            onClick={() => handleSelectAll(allFiles)}
            className="mb-6 px-4 py-2 rounded-full text-xs font-mono bg-moss/10 text-moss hover:bg-moss/20 transition-colors cursor-pointer border-none"
          >
            {allFiles.every((f) => selectedFiles.includes(f))
              ? 'Deselect All'
              : 'Select All'}
          </button>
        )}

        {/* Grade type — simple lesson list */}
        {category.type === 'grade' && category.lessons && (
          <div className="card bg-white border border-moss/10">
            <div className="p-4 border-b border-moss/5">
              <h3 className="text-sm font-mono text-moss/60 uppercase tracking-wider">
                Select Lessons
              </h3>
            </div>
            <div className="p-4 space-y-2">
              {category.lessons.map((lesson) => (
                <LessonCheckbox
                  key={lesson.file}
                  label={lesson.title}
                  sublabel={lesson.titleEnglish}
                  checked={selectedFiles.includes(lesson.file)}
                  onChange={() => handleToggleLesson(lesson.file)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Subject type — topics with lessons */}
        {category.type === 'subject' && category.topics && (
          <div className="space-y-6">
            {category.topics.map((topic) => (
              <div key={topic.id} className="card bg-white border border-moss/10">
                <div className="p-4 border-b border-moss/5">
                  <h3 className="text-base font-bold text-moss">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-charcoal/40 font-mono mt-1">
                    {topic.titleEnglish}
                  </p>
                </div>
                <div className="p-4 space-y-2">
                  {topic.lessons.map((lesson) => (
                    <LessonCheckbox
                      key={lesson.file}
                      label={lesson.title}
                      sublabel={lesson.titleEnglish}
                      checked={selectedFiles.includes(lesson.file)}
                      onChange={() => handleToggleLesson(lesson.file)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Start Quiz Button */}
        <div className="mt-8 sticky bottom-6">
          <button
            onClick={handleStartQuiz}
            disabled={selectedFiles.length === 0}
            className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Play size={16} />
            Start Quiz
            {selectedFiles.length > 0 && (
              <span className="ml-1 opacity-70">
                ({selectedFiles.length} lesson{selectedFiles.length !== 1 ? 's' : ''})
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function LessonCheckbox({ label, sublabel, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-moss/5 transition-colors" onClick={onChange}>
      <div
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
          checked
            ? 'bg-clay border-clay text-white'
            : 'border-charcoal/20 text-transparent'
        }`}
      >
        <Check size={14} strokeWidth={3} />
      </div>
      <div>
        <span className="text-sm font-medium text-charcoal">{label}</span>
        {sublabel && (
          <span className="block text-xs text-charcoal/40 font-mono">{sublabel}</span>
        )}
      </div>
    </label>
  );
}
