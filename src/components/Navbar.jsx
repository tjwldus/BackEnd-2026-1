import { useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { icon: "ti-home", label: "홈", to: "/home" },
  { icon: "ti-message", label: "채팅", to: "/chat/list" },
  { icon: "ti-mail", label: "편지", to: "/letter" },
  { icon: "ti-notebook", label: "마음일기", to: "/diary" },
  { icon: "ti-settings", label: "설정", to: "/settings" },
];

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <nav className="w-14 flex-shrink-0 glass-warm border-r border-white/30 flex flex-col items-center py-4 gap-1">
      {/* 로고 */}
      <div
        className="font-serif text-lg text-warm-ink mb-4 cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <i className="ti ti-flower text-base" aria-hidden="true" />
      </div>

      {/* 메뉴 */}
      {NAV_ITEMS.map((item) => (
        <button
          key={item.to}
          onClick={() => navigate(item.to)}
          title={item.label}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all relative group ${
            location.pathname === item.to
              ? "bg-gradient-to-br from-warm-apricot to-warm-rose text-white shadow-md"
              : "text-warm-soft hover:text-warm-ink hover:bg-white/40"
          }`}
        >
          <i className={`ti ${item.icon} text-lg`} aria-hidden="true" />
          {/* 툴팁 */}
          <span className="absolute left-12 bg-warm-ink/80 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {item.label}
          </span>
        </button>
      ))}

      {/* 로그아웃 — 하단 고정 */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          title="로그아웃"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-warm-soft hover:text-warm-rose hover:bg-white/40 transition-all relative group"
        >
          <i className="ti ti-logout text-lg" aria-hidden="true" />
          <span className="absolute left-12 bg-warm-ink/80 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            로그아웃
          </span>
        </button>
      </div>
    </nav>
  );
}