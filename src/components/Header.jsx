import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-20 glass-warm border-b border-white/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-warm-apricot to-warm-rose text-white inline-flex items-center justify-center shadow-md">
            <i className="ti ti-flower text-base" aria-hidden="true" />
          </span>
          <span className="font-serif text-xl text-warm-ink tracking-tight">
            다시
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink to="/" active={pathname === "/"} icon="ti-home" label="홈" />
          <NavLink
            to="/journal"
            active={pathname.startsWith("/journal")}
            icon="ti-notebook"
            label="마음일기"
          />
          <NavLink
            to="/settings"
            active={pathname.startsWith("/settings")}
            icon="ti-settings"
            label="설정"
          />
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, active, icon, label }) {
  return (
    <Link
      to={to}
      className={`px-3 py-1.5 rounded-full text-sm inline-flex items-center gap-1.5 transition-all ${
        active
          ? "bg-warm-ink/90 text-white"
          : "text-warm-soft hover:text-warm-ink hover:bg-white/40"
      }`}
    >
      <i className={`ti ${icon}`} aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
