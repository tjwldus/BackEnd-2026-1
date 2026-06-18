import { useNavigate } from "react-router-dom";
import BackgroundBlobs from "../components/BackgroundBlobs.jsx";
import BackgroundLines from "../components/BackgroundLines.jsx";
import NavBar from "../components/Navbar.jsx";

const DAILY_QUOTES = [
  "그리움은 사랑이 남긴 흔적이에요.",
  "보고 싶다는 마음만으로도, 충분히 잘 사랑했어요.",
  "떠난 사람도, 남은 사람도, 모두 애썼어요.",
  "기억한다는 건 여전히 함께라는 뜻이에요.",
  "천천히 가도 괜찮아요. 지금 이 속도로 충분해요.",
  "슬픔은 사라지는 게 아니라 익숙해지는 거래요.",
  "오늘 하루도 버텨낸 것만으로 잘한 거예요.",
];

const TOOLS = [
  {
    id: "letter",
    title: "편지 쓰기",
    desc: "전하지 못한 말을 적어보세요",
    icon: "ti-mail",
    accent: "from-warm-peach to-warm-apricot",
    to: "/letter",
  },
  {
    id: "diary",
    title: "오늘의 마음",
    desc: "지금 느끼는 감정을 짧게 적어요",
    icon: "ti-notebook",
    accent: "from-warm-lavender to-warm-rose",
    to: "/diary",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const today = new Date();
  const quote = DAILY_QUOTES[today.getDate() % DAILY_QUOTES.length];

  return (
    <>
      <BackgroundBlobs />
      <BackgroundLines />

      <div className="flex h-screen overflow-hidden" style={{ position: "relative", zIndex: 1 }}>
        <NavBar />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-8 py-16 animate-fade-up">

            {/* 오늘의 말 */}
            <div className="mt-20 mb-5">
              <p className="text-xs text-warm-faint tracking-widest mb-6">
                오늘의 말
              </p>
              <blockquote className="font-serif text-2xl sm:text-3xl text-warm-ink leading-relaxed">
                "{quote}"
              </blockquote>
            </div>

            {/* 구분선 */}
            <div className="w-12 h-px bg-warm-apricot/30 mb-16" />

            {/* 회복 도구 */}
            <div>
              <p className="text-xs text-warm-faint tracking-widest mb-6">
                함께하는 도구
              </p>
              <div className="space-y-0">
                {TOOLS.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => navigate(t.to)}
                    className={`w-full flex items-center gap-4 px-4 py-4 hover:bg-white/30 transition-all text-left group ${
                      idx === 0 ? "border-t border-b border-warm-apricot/20" : "border-b border-warm-apricot/20"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${t.accent} text-white inline-flex items-center justify-center flex-none`}>
                      <i className={`ti ${t.icon} text-base`} aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-warm-ink text-sm">{t.title}</div>
                      <div className="text-xs text-warm-soft mt-0.5">{t.desc}</div>
                    </div>
                    <i className="ti ti-arrow-right text-warm-apricot/40 group-hover:text-warm-apricot/70 transition-colors text-sm" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>

            {/* 안전 안내 */}
            <p className="text-center text-[11px] text-warm-soft/50 mt-16 leading-relaxed">
              전문 상담 시스템이 아닙니다.
              <br />
              많이 힘드시다면{" "}
              <span className="font-semibold text-warm-ink">자살예방상담 1393</span>
              으로 연락주세요.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}