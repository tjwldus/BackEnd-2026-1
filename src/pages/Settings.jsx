import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundBlobs from "../components/BackgroundBlobs.jsx";
import BackgroundLines from "../components/BackgroundLines.jsx";
import NavBar from "../components/Navbar.jsx";

const STAGE_LABELS = ["", "가까이 (1단계)", "조금씩 (2단계)", "천천히 (3단계)"];

export default function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/settings", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(() => {});
  };

  const handleTogglePause = async () => {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:8080/api/settings/pause", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchSettings();
  };

  const handleReset = async () => {
    if (!window.confirm("모든 대화, 편지, 마음일기가 삭제돼요. 정말 초기화할까요?")) return;
    const token = localStorage.getItem("token");
    await fetch("http://localhost:8080/api/settings/reset", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("모든 기록이 초기화됐어요.");
    fetchSettings();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const Row = ({ icon, accent, label, sub, right }) => (
    <div className="flex items-center gap-4 py-4 border-b border-warm-apricot/20 px-2 -mx-2 rounded-xl hover:bg-white/30 transition-all">
      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${accent} text-white inline-flex items-center justify-center flex-none`}>
        <i className={`ti ${icon} text-base`} aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-warm-ink">{label}</div>
        {sub && <div className="text-xs text-warm-soft mt-0.5">{sub}</div>}
      </div>
      {right}
    </div>
  );

  return (
    <>
      <BackgroundBlobs />
      <BackgroundLines />

      <div className="flex h-screen overflow-hidden" style={{ position: "relative", zIndex: 1 }}>
        <NavBar />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-8 py-16 animate-fade-up">

            <p className="text-xs text-warm-faint tracking-widest mb-1">설정</p>
            <h1 className="font-serif text-3xl text-warm-ink mb-10">함께 살피기</h1>

            {/* 계정 */}
            <p className="text-xs text-warm-faint tracking-widest mb-2">계정</p>
            <div className="flex items-center gap-4 py-4 border-t border-b border-warm-apricot/20 mb-10 px-2 -mx-2 rounded-xl hover:bg-white/30 transition-all">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-warm-apricot to-warm-rose text-white inline-flex items-center justify-center font-serif flex-none">
                {settings?.email?.slice(0, 1).toUpperCase() ?? "?"}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-warm-ink">{settings?.email ?? "—"}</div>
                <div className="text-xs text-warm-soft mt-0.5">
                  오늘 {settings?.todayMin ?? 0}분 함께했어요
                </div>
              </div>
            </div>

            {/* 거리두기 */}
            <p className="text-xs text-warm-faint tracking-widest mb-2">거리두기</p>
            <div className="border-t border-warm-apricot/20">
              <Row
                icon="ti-leaf"
                accent="from-warm-sage to-warm-lavender"
                label="자동 거리두기 단계"
                sub="자주 이용하실 때 자연스럽게 거리를 두어요"
                right={
                  <span className="text-sm font-semibold text-warm-apricot flex-none">
                    {STAGE_LABELS[settings?.stage ?? 1]}
                  </span>
                }
              />
              <Row
                icon="ti-clock-pause"
                accent="from-warm-peach to-warm-apricot"
                label="오늘만 평소처럼"
                sub="24시간 동안 거리두기를 잠시 멈춰요"
                right={
                  <button
                    onClick={handleTogglePause}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all flex-none ${
                      settings?.pauseActive
                        ? "bg-gradient-to-br from-warm-apricot to-warm-rose text-white"
                        : "glass-warm text-warm-soft hover:text-warm-ink"
                    }`}
                  >
                    {settings?.pauseActive ? "켜짐" : "켜기"}
                  </button>
                }
              />
            </div>

            {/* 안전 안내 */}
            <p className="text-xs text-warm-faint tracking-widest mt-10 mb-2">도움이 필요할 때</p>
            <div className="border-t border-warm-apricot/20">
              <Row
                icon="ti-phone"
                accent="from-warm-rose to-warm-apricot"
                label="자살예방상담전화"
                sub="24시간 무료 운영"
                right={<span className="text-sm font-semibold text-warm-ink flex-none">1393</span>}
              />
              <Row
                icon="ti-heart"
                accent="from-warm-lavender to-warm-rose"
                label="정신건강위기상담"
                sub="24시간 무료 운영"
                right={<span className="text-sm font-semibold text-warm-ink flex-none">1577-0199</span>}
              />
            </div>

            {/* 계정 관리 */}
            <p className="text-xs text-warm-faint tracking-widest mt-10 mb-2">계정 관리</p>
            <div className="border-t border-warm-apricot/20">
              <button
                onClick={handleReset}
                className="w-full flex items-center gap-4 py-4 border-b border-warm-apricot/20 px-2 -mx-2 rounded-xl hover:bg-white/30 transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-white/40 text-warm-soft group-hover:text-warm-rose inline-flex items-center justify-center flex-none transition-colors">
                  <i className="ti ti-trash text-base" aria-hidden="true" />
                </div>
                <div className="text-sm text-warm-soft group-hover:text-warm-rose transition-colors text-left">
                  모든 기록 초기화
                </div>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 py-4 border-b border-warm-apricot/20 px-2 -mx-2 rounded-xl hover:bg-white/30 transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-white/40 text-warm-soft group-hover:text-warm-ink inline-flex items-center justify-center flex-none transition-colors">
                  <i className="ti ti-logout text-base" aria-hidden="true" />
                </div>
                <div className="text-sm text-warm-soft group-hover:text-warm-ink transition-colors text-left">
                  로그아웃
                </div>
              </button>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}