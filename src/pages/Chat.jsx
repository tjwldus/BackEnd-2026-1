import { useParams, Link } from "react-router-dom";
import BackgroundBlobs from "../components/BackgroundBlobs.jsx";

export default function Chat() {
  const { personId } = useParams();

  return (
    <>
      <BackgroundBlobs />
      <div className="min-h-screen flex flex-col">
        {/* 상단 - 대화 상대 정보 */}
        <header className="glass-warm border-b border-white/50 px-5 py-3 flex items-center gap-3">
          <Link
            to="/"
            className="text-warm-soft hover:text-warm-ink p-1.5 rounded-full hover:bg-white/40"
          >
            <i className="ti ti-arrow-left" aria-hidden="true" />
          </Link>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-warm-peach to-warm-rose text-white inline-flex items-center justify-center font-serif">
            외
          </div>
          <div className="flex-1">
            <div className="font-semibold text-warm-ink text-sm">외할머니</div>
            <div className="text-[11px] text-warm-faint">함께 대화 중</div>
          </div>
        </header>

        {/* 대화 영역 (골격) */}
        <main className="flex-1 max-w-3xl w-full mx-auto px-5 py-8 space-y-4">
          <div className="glass-warm rounded-3xl p-5 text-center text-sm text-warm-soft animate-fade-up">
            <i
              className="ti ti-info-circle text-warm-faint mb-2"
              aria-hidden="true"
            />
            <p className="mb-1">
              지금부터의 대화는 당신의 기억과 함께 만드는 것이에요.
            </p>
            <p className="text-xs text-warm-faint">
              많이 힘드시면 1393으로 연락주세요.
            </p>
          </div>

          {/* 임시 메시지들 */}
          <div className="flex justify-start animate-fade-up">
            <div className="glass-warm-strong rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
              <p className="text-sm text-warm-ink leading-relaxed">
                왔구나. 잘 지냈어?
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-warm-faint pt-6">
            대화 기능은 곧 연결됩니다 · personId: {personId}
          </p>
        </main>

        {/* 입력 영역 */}
        <footer className="glass-warm border-t border-white/50 px-5 py-3">
          <div className="max-w-3xl mx-auto flex items-center gap-2">
            <input
              type="text"
              placeholder="메시지를 적어주세요"
              className="flex-1 bg-white/50 border border-white/70 rounded-full px-4 py-2.5 text-sm text-warm-ink placeholder:text-warm-soft/50 outline-none focus:bg-white/70"
            />
            <button className="w-10 h-10 rounded-full bg-gradient-to-br from-warm-apricot to-warm-rose text-white inline-flex items-center justify-center shadow-md">
              <i className="ti ti-send" aria-hidden="true" />
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}