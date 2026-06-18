import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundBlobs from "../components/BackgroundBlobs.jsx";
import BackgroundLines from "../components/BackgroundLines.jsx";
import NavBar from "../components/Navbar.jsx";

const EXAMPLES = [
  "3년 만난 연인과 헤어졌어요",
  "15년 같이 산 강아지가 무지개다리를 건넜어요",
  "먼 곳으로 떠난 친구가 그리워요",
  "작년에 돌아가신 외할머니가 자꾸 생각나요",
  "사고로 갑자기 떠나보낸 분이 있어요",
];

export default function Welcome() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const svgRef = useRef(null);

  const canContinue = text.trim().length >= 4;

  const handleNext = () => {
    if (!canContinue) return;
    navigate("/about", { state: { situation: text } });
  };

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll("path");
    paths?.forEach((path) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = len;
      requestAnimationFrame(() => {
        path.style.transition = `stroke-dashoffset ${path.dataset.dur}s ${path.dataset.delay}s cubic-bezier(0.4,0,0.2,1)`;
        path.style.strokeDashoffset = "0";
      });
    });
  }, []);

  return (
    <>
      <BackgroundBlobs />
      <BackgroundLines />

      <div className="flex h-screen overflow-hidden" style={{ position: "relative", zIndex: 1 }}>
        <NavBar />

        {/* 오른쪽 콘텐츠 — 세로 중앙 정렬 */}
        <div className="flex-1 flex items-center justify-center overflow-y-auto px-8 py-10">
          <div className="w-full max-w-2xl animate-fade-up">

            {/* 헤더 */}
            <div className="text-center mt-20 mb-8">
              <h1 className="font-serif text-3xl sm:text-4xl text-warm-ink leading-tight mb-2.5">
                누구를 떠올리고 계신가요?
              </h1>
              <p className="text-sm text-warm-soft">
                편하게 한두 문장으로 적어주세요.
              </p>
            </div>

            {/* 입력 카드 */}
            <div className="glass-warm rounded-3xl p-6">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={2}
                placeholder="예: 작년에 돌아가신 외할머니가 자꾸 생각나요. 마지막 인사를 못 드린 게 마음에 걸려요."
                className="w-full bg-transparent border-0 outline-none resize-none text-warm-ink text-base leading-relaxed placeholder:text-warm-soft/50 placeholder:italic"
              />
            </div>

            {/* 예시 칩 */}
            <p className="text-center text-xs text-warm-faint mt-5 mb-3">
              이런 분들도 계세요
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setText(ex)}
                  className="glass-warm rounded-full px-3.5 py-1.5 text-xs text-warm-soft hover:text-warm-ink hover:-translate-y-0.5 transition-all"
                >
                  {ex}
                </button>
              ))}
            </div>

            {/* 다음 버튼 */}
            <div className="text-center mt-9">
              <button
                onClick={handleNext}
                disabled={!canContinue}
                className={`rounded-full px-7 py-3 text-sm font-semibold inline-flex items-center gap-2 transition-all ${
                  canContinue
                    ? "bg-gradient-to-br from-warm-apricot to-warm-rose text-white shadow-[0_10px_28px_rgba(245,158,125,0.4)] hover:-translate-y-0.5"
                    : "bg-white/40 text-warm-soft/50 cursor-not-allowed"
                }`}
              >
                이어서 적기{" "}
                <i className="ti ti-arrow-right" aria-hidden="true" />
              </button>
            </div>

            {/* 안전 안내 */}
            <p className="text-center text-[11px] text-warm-soft/60 mt-10 leading-relaxed">
              전문 상담 시스템이 아닙니다.
              <br />
              많이 힘드시다면{" "}
              <span className="font-semibold text-warm-ink">자살예방상담 1393</span>
              으로 연락주세요.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}