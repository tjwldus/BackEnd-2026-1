import BackgroundBlobs from "../components/BackgroundBlobs.jsx";
import Navbar from "../components/Navbar.jsx";

// 임시 기분 옵션
const MOODS = [
  { id: "calm", label: "잔잔해요", icon: "ti-wave-sine" },
  { id: "sad", label: "슬퍼요", icon: "ti-cloud-rain" },
  { id: "missing", label: "그리워요", icon: "ti-heart" },
  { id: "ok", label: "괜찮아요", icon: "ti-sun" },
  { id: "tired", label: "지쳐요", icon: "ti-moon" },
];

export default function Journal() {
  return (
    <>
      <BackgroundBlobs />
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-10 pb-20 animate-fade-up">
        <p className="text-xs text-warm-faint mb-1">마음일기</p>
        <h1 className="font-serif text-3xl text-warm-ink mb-2">
          오늘은 어땠어요?
        </h1>
        <p className="text-sm text-warm-soft mb-8">
          짧게라도 괜찮아요. 매일의 기록이 모이면 회복의 흐름이 보여요.
        </p>

        {/* 기분 선택 */}
        <div className="glass-warm rounded-3xl p-6 mb-4">
          <p className="text-sm font-semibold text-warm-ink mb-3">
            오늘의 기분
          </p>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button
                key={m.id}
                className="glass-warm rounded-full px-4 py-2 text-sm text-warm-soft hover:text-warm-ink hover:-translate-y-0.5 transition-all inline-flex items-center gap-1.5"
              >
                <i className={`ti ${m.icon}`} aria-hidden="true" />
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* 자유 메모 */}
        <div className="glass-warm rounded-3xl p-6 mb-6">
          <p className="text-sm font-semibold text-warm-ink mb-3">
            짧은 메모 (선택)
          </p>
          <textarea
            rows={5}
            placeholder="오늘 그리워졌던 순간, 한 걸음 나아간 일, 무엇이든..."
            className="w-full bg-transparent border-0 outline-none resize-none text-warm-ink text-sm leading-relaxed placeholder:text-warm-soft/40"
          />
        </div>

        <div className="text-center">
          <button className="bg-gradient-to-br from-warm-apricot to-warm-rose text-white rounded-full px-7 py-3 text-sm font-semibold shadow-md">
            오늘을 기록하기
          </button>
        </div>

        {/* 지난 기록 미리보기 (골격) */}
        <div className="mt-12">
          <h2 className="text-base font-semibold text-warm-ink mb-3">
            지난 기록
          </h2>
          <p className="text-sm text-warm-faint text-center py-8">
            아직 기록이 없어요.
          </p>
        </div>
      </div>
    </>
  );
}