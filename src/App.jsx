import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome.jsx";
import Home from "./pages/Home.jsx";
import Chat from "./pages/Chat.jsx";
import Letter from "./pages/Letter.jsx";
import Journal from "./pages/Write.jsx";
import Settings from "./pages/Settings.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 첫 진입 - 사용자가 상황을 자유롭게 입력 */}
        <Route path="/welcome" element={<Welcome />} />

        {/* 홈 - 자기 사람들 목록 + 회복 도구 진입 */}
        <Route path="/" element={<Home />} />

        {/* 대화 페이지 - URL의 personId로 특정 인물과의 대화 */}
        <Route path="/chat/:personId" element={<Chat />} />

        {/* 편지함 - 답장 없는 편지 */}
        <Route path="/letter/:personId" element={<Letter />} />

        {/* 회복 저널 */}
        <Route path="/journal" element={<Journal />} />

        {/* 설정 - 거리두기, 안전 옵션 */}
        <Route path="/settings" element={<Settings />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}