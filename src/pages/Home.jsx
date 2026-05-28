import { Link, useNavigate } from "react-router-dom";
import BackgroundBlobs from "../components/BackgroundBlobs.jsx";
import Navbar from "../components/Navbar.jsx";

// 임시 사람 목록 (추후 백엔드/localStorage 연동)
const MOCK_PEOPLE = [
  { id: "p1", name: "외할머니", relation: "가족", lastTalkedAgo: "오늘" },
  { id: "p2", name: "철수", relation: "연인", lastTalkedAgo: "3일 전" },
];

// 회복 도구 카드들
const TOOLS = [
  {
    id: "letter",
    title: "편지 쓰기",
    desc: "답장이 오지 않는 편지를 부쳐보세요",
    icon: "ti-mail",
    accent: "from-warm-peach to-warm-apricot",
    to: (p) => `/letter/${p?.id || "p1"}`,
  },
  {
    id: "journal",
    title: "오늘의 마음",
    desc: "지금 느끼는 감정을 짧게 적어요",
    icon: "ti-notebook",
    accent: "from-warm-lavender to-warm-rose",
    to: () => "/journal",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <BackgroundBlobs />
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20 animate-fade-up">
        {/* 인사 헤더 */}
        <div className="mb-8">
          <p className="text-xs text-warm-faint mb-1">오늘도 잘 오셨어요</p>
          <h1 className="font-serif text-3xl sm:text-4xl text-warm-ink tracking-tight">
            잠시 머무르다 가세요
          </h1>
        </div>

        {/* 내 사람들 섹션 */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-lg font-semibold text-warm-ink">내 사람들</h2>
            <button
              onClick={() => navigate("/welcome")}
              className="text-xs text-warm-faint hover:text-warm-ink inline-flex items-center gap-1"
            >
              <i className="ti ti-plus" aria-hidden="true" /> 새로 추가
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MOCK_PEOPLE.map((p) => (
              <Link
                key={p.id}
                to={`/chat/${p.id}`}
                className="glass-warm rounded-2xl p-5 hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(180,95,80,0.14)] transition-all"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-warm-peach to-warm-rose text-white inline-flex items-center justify-center font-serif text-lg">
                    {p.name.slice(0, 1)}
                  </div>
                  <div>
                    <div className="font-semibold text-warm-ink">{p.name}</div>
                    <div className="text-[11px] text-warm-faint">
                      {p.relation}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-warm-soft">
                  마지막 만남 · {p.lastTalkedAgo}
                </div>
              </Link>
            ))}

            {/* 빈 슬롯 - 새 사람 추가 */}
            <button
              onClick={() => navigate("/welcome")}
              className="rounded-2xl border-2 border-dashed border-warm-faint/30 p-5 text-warm-faint hover:text-warm-ink hover:border-warm-faint/60 transition-all flex flex-col items-center justify-center gap-2 min-h-[120px]"
            >
              <i className="ti ti-plus text-2xl" aria-hidden="true" />
              <span className="text-sm">새 사람 추가</span>
            </button>
          </div>
        </section>

        {/* 회복 도구 섹션 */}
        <section>
          <h2 className="text-lg font-semibold text-warm-ink mb-4">
            함께하는 도구
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TOOLS.map((t) => (
              <Link
                key={t.id}
                to={t.to(MOCK_PEOPLE[0])}
                className="glass-warm rounded-2xl p-5 hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(180,95,80,0.14)] transition-all flex items-start gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${t.accent} text-white inline-flex items-center justify-center shadow-md flex-none`}
                >
                  <i className={`ti ${t.icon} text-xl`} aria-hidden="true" />
                </div>
                <div>
                  <div className="font-semibold text-warm-ink mb-0.5">
                    {t.title}
                  </div>
                  <div className="text-xs text-warm-soft leading-relaxed">
                    {t.desc}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}