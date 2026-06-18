import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome.jsx";
import Letter from "./pages/Letter.jsx";
import Journal from "./pages/Diary.jsx";
import Settings from "./pages/Settings.jsx";
import ChatList from "./pages/ChatList.jsx";
import AboutPerson from "./pages/AboutPerson.jsx";
import Auth from "./pages/Auth.jsx";
import Home from "./pages/Home.jsx";
import Diary from "./pages/Diary.jsx";
import Admin from "./pages/Admin.jsx";

function PrivateRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("token");
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인증 불필요 */}
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/welcome" element={<Welcome />} />

        {/* 로그인 필요 */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/chat/list"    element={<PrivateRoute><ChatList /></PrivateRoute>} />
        <Route path="/letter" element={<PrivateRoute><Letter /></PrivateRoute>} />
        <Route path="/letter/:personId" element={<PrivateRoute><Letter /></PrivateRoute>} />
        <Route path="/diary"      element={<PrivateRoute><Diary /></PrivateRoute>} />
        <Route path="/settings"     element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/about"        element={<PrivateRoute><AboutPerson /></PrivateRoute>} />

        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}