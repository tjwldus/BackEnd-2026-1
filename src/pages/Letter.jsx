import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackgroundBlobs from "../components/BackgroundBlobs.jsx";
import BackgroundLines from "../components/BackgroundLines.jsx";
import NavBar from "../components/Navbar.jsx";

const PAPERS = [
  {
    id: "default",
    label: "기본",
    style: "bg-white/60",
    lines: false,
  },
  {
    id: "lined",
    label: "줄지",
    style: "bg-white/60",
    lines: true,
  },
  {
    id: "spring",
    label: "봄",
    style: "bg-gradient-to-br from-pink-50/80 to-rose-50/60",
    lines: false,
    deco: "🌸",
  },
  {
    id: "autumn",
    label: "가을",
    style: "bg-gradient-to-br from-amber-50/80 to-orange-50/60",
    lines: false,
    deco: "🍂",
  },
  {
    id: "night",
    label: "밤",
    style: "bg-gradient-to-br from-slate-100/80 to-blue-50/60",
    lines: false,
    deco: "🌙",
  },
  {
    id: "warm",
    label: "따뜻",
    style: "bg-gradient-to-br from-warm-peach/40 to-warm-apricot/20",
    lines: false,
    deco: "🕯️",
  },
];

export default function Letter() {
  const { personId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [letters, setLetters] = useState([]);
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState(false);
  const [paper, setPaper] = useState(PAPERS[0]);
  const [showPapers, setShowPapers] = useState(false);

  useEffect(() => { fetchLetters(); }, []);

  const fetchLetters = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/letters", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setLetters(data))
      .catch(() => {});
  };

  const handleSend = async () => {
    if (!content.trim()) return;
    const token = localStorage.getItem("token");
    await fetch("http://localhost:8080/api/letters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        personaId: personId ? Number(personId) : null,
        title,
        content,
      }),
    });
    setTitle("");
    setContent("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    fetchLetters();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("이 편지를 삭제할까요?")) return;
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8080/api/letters/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setLetters((prev) => prev.filter((l) => l.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  return (
    <>
      <BackgroundBlobs />
      <BackgroundLines />

      <div className="flex h-screen overflow-hidden" style={{ position: "relative", zIndex: 1 }}>
        <NavBar />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-8 py-16 animate-fade-up">

            <p className="text-xs text-warm-faint tracking-widest mb-1">편지함</p>
            <h1 className="font-serif text-3xl text-warm-ink mb-2">부치지 못한 편지</h1>
            <p className="text-sm text-warm-soft mb-8">
              답장은 오지 않아요. 마음을 풀어놓는 공간이에요.
            </p>

            {/* 편지지 선택 */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => setShowPapers(!showPapers)}
                className="flex items-center gap-1.5 text-xs text-warm-soft hover:text-warm-ink transition-colors glass-warm rounded-full px-3 py-1.5"
              >
                <i className="ti ti-palette text-xs" aria-hidden="true" />
                편지지 · {paper.label}
              </button>

              {showPapers && (
                <div className="flex gap-2 flex-wrap animate-fade-up">
                  {PAPERS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => { setPaper(p); setShowPapers(false); }}
                      className={`rounded-full px-3 py-1.5 text-xs transition-all ${
                        paper.id === p.id
                          ? "bg-gradient-to-br from-warm-apricot to-warm-rose text-white"
                          : "glass-warm text-warm-soft hover:text-warm-ink"
                      }`}
                    >
                      {p.deco ? `${p.deco} ` : ""}{p.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 편지 작성 카드 */}
            <div
              className={`${paper.style} rounded-3xl p-7 mb-4 shadow-sm relative overflow-hidden transition-all duration-500`}
              style={{ backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.5)" }}
            >
              {/* 장식 이모지 */}
              {paper.deco && (
                <span className="absolute top-4 right-5 text-2xl opacity-20 select-none">
                  {paper.deco}
                </span>
              )}

              {/* 줄지 라인 */}
              {paper.lines && (
                <div className="absolute inset-0 pointer-events-none" style={{ paddingTop: "80px" }}>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="border-b border-warm-apricot/10"
                      style={{ height: "32px" }}
                    />
                  ))}
                </div>
              )}

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 적어보세요"
                className="w-full bg-transparent border-0 outline-none text-warm-ink font-serif text-xl placeholder:text-warm-soft/40 mb-4 relative z-10"
              />
              <div className="h-px bg-warm-soft/15 mb-4" />
              <textarea
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="안녕, 잘 지내고 있어?"
                className="w-full bg-transparent border-0 outline-none resize-none text-warm-ink text-base leading-relaxed placeholder:text-warm-soft/40 relative z-10"
              />
            </div>

            <div className="flex justify-end gap-2 mb-14">
              <button
                onClick={handleSend}
                disabled={!content.trim()}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                  content.trim()
                    ? "bg-gradient-to-br from-warm-apricot to-warm-rose text-white shadow-[0_10px_28px_rgba(245,158,125,0.4)] hover:-translate-y-0.5"
                    : "bg-white/40 text-warm-soft/50 cursor-not-allowed"
                }`}
              >
                {saved ? "보냈어요 ✓" : "보내기"}
              </button>
            </div>

            {/* 지난 편지 */}
            <p className="text-xs text-warm-faint tracking-widest mb-6">지난 편지</p>
            {letters.length === 0 ? (
              <p className="text-sm text-warm-faint text-center py-8">아직 편지가 없어요.</p>
            ) : (
              <div className="border-t border-warm-apricot/20">
                {letters.map((l) => (
                  <div key={l.id}>
                    <button
                      onClick={() => setSelected(selected?.id === l.id ? null : l)}
                      className="w-full flex items-center gap-4 py-4 border-b border-warm-apricot/20 text-left group hover:bg-white/20 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-warm-peach to-warm-apricot text-white inline-flex items-center justify-center flex-none">
                        <i className="ti ti-mail text-base" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-warm-ink truncate">
                          {l.title || "제목 없음"}
                        </div>
                        <div className="text-xs text-warm-faint">
                          {l.personaName ? `To. ${l.personaName} · ` : ""}{l.createdLabel}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(l.id); }}
                          className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-full bg-white/60 text-warm-soft hover:text-warm-rose flex items-center justify-center transition-all"
                        >
                          <i className="ti ti-x text-[10px]" aria-hidden="true" />
                        </button>
                        <i className={`ti ${selected?.id === l.id ? "ti-chevron-up" : "ti-chevron-down"} text-warm-soft/40 text-sm`} aria-hidden="true" />
                      </div>
                    </button>

                    {selected?.id === l.id && (
                      <div className="glass-warm rounded-2xl p-6 my-3 animate-fade-up">
                        {l.title && (
                          <p className="font-serif text-lg text-warm-ink mb-3">{l.title}</p>
                        )}
                        <p className="text-sm text-warm-ink leading-relaxed whitespace-pre-wrap">{l.content}</p>
                        <p className="text-xs text-warm-faint mt-4 text-right">{l.createdLabel}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}