import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import QuizPage from './quiz/QuizPage';
import TeacherDashboard from './teacher/TeacherDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
