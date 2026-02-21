import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategorySelection from './components/CategorySelection';
import LessonSelection from './components/LessonSelection';
import LandingPage from './components/LandingPage';
import QuizPage from './quiz/QuizPage';
import TeacherDashboard from './teacher/TeacherDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CategorySelection />} />
        <Route path="/about" element={<LandingPage />} />
        <Route path="/lessons/:category" element={<LessonSelection />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
