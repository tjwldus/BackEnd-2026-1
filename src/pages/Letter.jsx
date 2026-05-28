import { useParams } from "react-router-dom";
import BackgroundBlobs from "../components/BackgroundBlobs.jsx";
import Navbar from "../components/Navbar.jsx";

export default function Letter() {
  const { personId } = useParams();

  return (
    <>
      <BackgroundBlobs />
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-10 pb-20 animate-fade-up">
        <p className="text-xs text-warm-faint mb-1">편지함</p>
        <h1 className="font-serif text-3xl text-warm-ink mb-2">
          부치지 못한 편지
        </h1>
        <p className="text-sm text-warm-soft mb-8">
          답장은 오지 않아요. 마음을 풀어놓는 공간이에요.
        </p>

        <div className="glass-warm rounded-3xl p-7">
          <input
            type="text"
            placeholder="제목을 적어보세요"
            className="w-full bg-transparent border-0 outline-none text-warm-ink font-serif text-xl placeholder:text-warm-soft/40 mb-4"
          />
          <div className="h-px bg-warm-soft/15 mb-4" />
          <textarea
            rows={14}
            placeholder="안녕, 잘 지내고 있어?"
            className="w-full bg-transparent border-0 outline-none resize-none text-warm-ink text-base leading-relaxed placeholder:text-warm-soft/40"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button className="glass-warm rounded-full px-5 py-2.5 text-sm text-warm-soft hover:text-warm-ink">
            임시 저장
          </button>
          <button className="bg-gradient-to-br from-warm-apricot to-warm-rose text-white rounded-full px-6 py-2.5 text-sm font-semibold shadow-md">
            보내기
          </button>
        </div>

        <p className="text-center text-[11px] text-warm-faint mt-8">
          personId: {personId}
        </p>
      </div>
    </>
  );
}