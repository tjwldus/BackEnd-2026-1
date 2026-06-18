import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackgroundBlobs from "../components/BackgroundBlobs.jsx";
import BackgroundLines from "../components/BackgroundLines.jsx";

const STEPS = [
  {
    key: "name",
    question: "그분을 뭐라고 부르고 싶으세요?",
    placeholder: "예: 할머니, 민준이, 짝꿍",
    hint: "애칭이나 부르던 이름 그대로 적어주세요.",
  },
  {
    key: "relation",
    question: "어떤 관계셨나요?",
    placeholder: "예: 10년지기 친구, 첫사랑, 키우던 강아지",
    hint: "한 줄이면 충분해요.",
  },
  {
    key: "memory",
    question: "가장 먼저 떠오르는 기억이 있나요?",
    placeholder: "예: 같이 먹던 떡볶이, 매일 오던 문자, 냄새",
    hint: "사소한 것도 괜찮아요. 생각나는 대로요.",
  },
];

export default function AboutPerson() {
  const navigate = useNavigate();
  const location = useLocation();
  const situation = location.state?.situation ?? "";
  const svgRef = useRef(null);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ name: "", relation: "", memory: "" });

  const current = STEPS[step];
  const value = answers[current.key];
  const canNext = value.trim().length >= 1;
  const isLast = step === STEPS.length - 1;

const handleNext = async () => {
  if (!canNext) return;

  if (isLast) {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/personas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: answers.name,
          relation: answers.relation,
          situation,
          memory: answers.memory,
        }),
      });

      const data = await res.json();
      navigate(`/chat/list`, {
        state: { selectedId: data.id }
      });
    } catch {
      alert("오류가 발생했어요. 다시 시도해주세요.");
    }
  } else {
    setStep((s) => s + 1);
  }
};

  const handleBack = () => {
    if (step === 0) navigate(-1);
    else setStep((s) => s - 1);
  };

  return (
    <>
      <BackgroundBlobs />
      <BackgroundLines />

      {/* ── 본문 ── */}
      <div
        className="min-h-screen flex items-center justify-center px-5 py-10"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="w-full max-w-xl animate-fade-up">

          {/* 뒤로 */}
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-xs text-warm-soft hover:text-warm-ink transition-colors mb-10"
          >
            <i className="ti ti-arrow-left" aria-hidden="true" />
            돌아가기
          </button>

          {/* 스텝 인디케이터 */}
          <div className="flex gap-1.5 justify-center mb-8">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`block h-1 rounded-full transition-all duration-500 ${
                  i <= step
                    ? "w-6 bg-warm-apricot"
                    : "w-3 bg-warm-apricot/25"
                }`}
              />
            ))}
          </div>

          {/* 질문 — step 바뀔 때마다 fade-up */}
          <div key={step} className="text-center mb-8 animate-fade-up">
            <p className="text-xs text-warm-faint tracking-wider mb-2">
              {step + 1} / {STEPS.length}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl text-warm-ink leading-tight mb-2.5">
              {current.question}
            </h1>
            <p className="text-sm text-warm-soft">{current.hint}</p>
          </div>

          {/* 입력 카드 */}
          <div className="glass-warm rounded-3xl px-6 py-4">
            <input
              key={step}
              type="text"
              value={value}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, [current.key]: e.target.value }))
              }
              onKeyDown={(e) => e.key === "Enter" && handleNext()}
              placeholder={current.placeholder}
              autoFocus
              className="w-full bg-transparent border-0 outline-none text-warm-ink text-base placeholder:text-warm-soft/50 placeholder:italic"
            />
          </div>

          {/* 다음 버튼 */}
          <div className="text-center mt-9">
            <button
              onClick={handleNext}
              disabled={!canNext}
              className={`rounded-full px-7 py-3 text-sm font-semibold inline-flex items-center gap-2 transition-all ${
                canNext
                  ? "bg-gradient-to-br from-warm-apricot to-warm-rose text-white shadow-[0_10px_28px_rgba(245,158,125,0.4)] hover:-translate-y-0.5"
                  : "bg-white/40 text-warm-soft/50 cursor-not-allowed"
              }`}
            >
              {isLast ? "대화 시작하기" : "다음"}
              <i
                className={`ti ${isLast ? "ti-message" : "ti-arrow-right"}`}
                aria-hidden="true"
              />
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
    </>
  );
}