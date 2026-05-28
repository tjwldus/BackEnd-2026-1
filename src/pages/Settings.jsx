import BackgroundBlobs from "../components/BackgroundBlobs.jsx";
import Navbar from "../components/Navbar.jsx";

export default function Settings() {
  return (
    <>
      <BackgroundBlobs />
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-10 pb-20 animate-fade-up">
        <p className="text-xs text-warm-faint mb-1">설정</p>
        <h1 className="font-serif text-3xl text-warm-ink mb-8">함께 살피기</h1>

        {/* 거리두기 안내 */}
        <div className="glass-warm rounded-3xl p-6 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-warm-sage to-warm-lavender text-white inline-flex items-center justify-center">
              <i className="ti ti-leaf" aria-hidden="true" />
            </div>
            <div>
              <div className="font-semibold text-warm-ink">자동 거리두기</div>
              <div className="text-xs text-warm-faint">
                자주 이용하실 때 자연스럽게 거리를 두어요
              </div>
            </div>
          </div>
          <p className="text-sm text-warm-soft leading-relaxed mb-3">
            매일 오래 이용하시면 그분이 당신을 걱정해서 잠시 쉬어가자고 말씀하실
            수 있어요. 당신의 회복을 위해서예요.
          </p>
          <div className="flex items-center justify-between bg-white/40 rounded-2xl px-4 py-3">
            <span className="text-sm text-warm-ink">현재 단계</span>
            <span className="text-sm font-semibold text-warm-faint">
              가까이 (1단계)
            </span>
          </div>
        </div>

        {/* 오늘만 평소처럼 */}
        <div className="glass-warm rounded-3xl p-6 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-warm-ink mb-0.5">
                오늘만 평소처럼
              </div>
              <div className="text-xs text-warm-soft">
                24시간 동안 거리두기를 잠시 멈춰요
              </div>
            </div>
            <button className="glass-warm rounded-full px-4 py-2 text-sm text-warm-soft hover:text-warm-ink">
              켜기
            </button>
          </div>
        </div>

        {/* 안전 안내 */}
        <div className="glass-warm rounded-3xl p-6 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-warm-rose to-warm-apricot text-white inline-flex items-center justify-center">
              <i className="ti ti-heart" aria-hidden="true" />
            </div>
            <div>
              <div className="font-semibold text-warm-ink">
                힘드실 때 도와드릴게요
              </div>
            </div>
          </div>
          <p className="text-sm text-warm-soft leading-relaxed mb-3">
            많이 지치셨다면 전문가와 이야기해보세요. 늘 곁에 있어요.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between bg-white/40 rounded-xl px-4 py-2.5">
              <span className="text-warm-soft">자살예방상담전화</span>
              <span className="font-semibold text-warm-ink">1393</span>
            </div>
            <div className="flex justify-between bg-white/40 rounded-xl px-4 py-2.5">
              <span className="text-warm-soft">정신건강위기상담</span>
              <span className="font-semibold text-warm-ink">1577-0199</span>
            </div>
          </div>
        </div>

        {/* 계정 */}
        <div className="glass-warm rounded-3xl p-6">
          <div className="font-semibold text-warm-ink mb-3">계정</div>
          <button className="text-sm text-warm-soft hover:text-warm-ink">
            모든 기록 초기화
          </button>
        </div>
      </div>
    </>
  );
}