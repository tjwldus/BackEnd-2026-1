import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundBlobs from "../components/BackgroundBlobs.jsx";
import BackgroundLines from "../components/BackgroundLines.jsx";

export default function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/settings/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 403) { navigate("/home"); return; }
        return res.json();
      })
      .then((data) => data && setUsers(data))
      .catch(() => navigate("/home"));
  }, []);

  const handleDelete = async (id, email) => {
    if (!window.confirm(`${email} 계정을 삭제할까요?`)) return;
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8080/api/settings/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      <BackgroundBlobs />
      <BackgroundLines />

      <div className="min-h-screen" style={{ position: "relative", zIndex: 1 }}>
        {/* 헤더 */}
        <div className="glass-warm border-b border-white/30 px-8 py-4 flex items-center justify-between">
          <h1 className="font-serif text-2xl text-warm-ink">다시 · 관리자</h1>
          <button
            onClick={handleLogout}
            className="text-xs text-warm-soft hover:text-warm-ink underline underline-offset-2 transition-colors"
          >
            로그아웃
          </button>
        </div>

        <div className="max-w-4xl mx-auto px-8 py-12 animate-fade-up">
          <p className="text-xs text-warm-faint tracking-widest mb-2">회원 관리</p>
          <h2 className="font-serif text-2xl text-warm-ink mb-8">
            전체 회원 {users.length}명
          </h2>

          <div className="border-t border-warm-apricot/20">
            {/* 테이블 헤더 */}
            <div className="flex items-center gap-4 py-3 border-b border-warm-apricot/20 text-xs text-warm-faint">
              <span className="w-8">ID</span>
              <span className="flex-1">이메일</span>
              <span className="w-16 text-center">역할</span>
              <span className="w-16 text-center">성인인증</span>
              <span className="w-24 text-center">가입일</span>
              <span className="w-12" />
            </div>

            {users.map((u) => (
                <div
                    key={u.id}
                    className="flex items-center gap-4 py-4 border-b border-warm-apricot/20 text-sm hover:bg-white/20 transition-all group"
                >
                    <span className="w-8 text-warm-faint text-xs">{u.id}</span>
                    <span className="flex-1 text-warm-ink font-medium truncate">{u.email}</span>
                    <span className={`w-16 text-center text-xs font-semibold ${
                    u.role === "ADMIN" ? "text-warm-rose" : "text-warm-soft"
                    }`}>
                    {u.role}
                    </span>
                    <span className="w-16 text-center text-xs text-warm-soft">
                    {u.adult ? "✓" : "—"}
                    </span>
                    <span className="w-24 text-center text-xs text-warm-faint">
                    {u.created ? new Date(u.created).toLocaleDateString("ko-KR") : "—"}
                    </span>
                    <button
                    onClick={() => handleDelete(u.id, u.email)}
                    disabled={u.role === "ADMIN"}
                    className={`w-12 text-xs transition-colors ${
                        u.role === "ADMIN"
                        ? "text-warm-soft/20 cursor-not-allowed"
                        : "text-warm-soft hover:text-warm-rose opacity-0 group-hover:opacity-100"
                    }`}
                    >
                    삭제
                    </button>
                </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}