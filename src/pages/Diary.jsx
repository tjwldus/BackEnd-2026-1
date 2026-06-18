import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundBlobs from "../components/BackgroundBlobs.jsx";
import BackgroundLines from "../components/BackgroundLines.jsx";
import NavBar from "../components/Navbar.jsx";

const MOODS = [
  { id: "calm", label: "잔잔해요", icon: "ti-wave-sine" },
  { id: "sad", label: "슬퍼요", icon: "ti-cloud-rain" },
  { id: "missing", label: "그리워요", icon: "ti-heart" },
  { id: "ok", label: "괜찮아요", icon: "ti-sun" },
  { id: "tired", label: "지쳐요", icon: "ti-moon" },
];

export default function Write() {
  const navigate = useNavigate();
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/diary", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .catch(() => {});
  };

  const handleSubmit = async () => {
    if (!mood) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:8080/api/diary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mood, note }),
      });
      setMood("");
      setNote("");
      fetchRecords();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("이 기록을 삭제할까요?")) return;
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8080/api/diary/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const MOOD_MAP = Object.fromEntries(MOODS.map((m) => [m.id, m]));

  return (
    <>
      <BackgroundBlobs />
      <BackgroundLines />

      <div className="flex h-screen overflow-hidden" style={{ position: "relative", zIndex: 1 }}>
        <NavBar />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-8 py-16 animate-fade-up">

            <p className="text-xs text-warm-faint tracking-widest mb-1">마음일기</p>
            <h1 className="font-serif text-3xl text-warm-ink mb-2">오늘은 어땠어요?</h1>
            <p className="text-sm text-warm-soft mb-10">
              짧게라도 괜찮아요. 매일의 기록이 모이면 회복의 흐름이 보여요.
            </p>

            {/* 기분 선택 */}
            <div className="glass-warm rounded-3xl p-6 mb-4">
              <p className="text-sm font-semibold text-warm-ink mb-3">오늘의 기분</p>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMood(m.id)}
                    className={`rounded-full px-4 py-2 text-sm transition-all inline-flex items-center gap-1.5 ${
                      mood === m.id
                        ? "bg-gradient-to-br from-warm-apricot to-warm-rose text-white shadow-sm"
                        : "glass-warm text-warm-soft hover:text-warm-ink hover:-translate-y-0.5"
                    }`}
                  >
                    <i className={`ti ${m.icon}`} aria-hidden="true" />
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 메모 */}
            <div className="glass-warm rounded-3xl p-6 mb-6">
              <p className="text-sm font-semibold text-warm-ink mb-3">짧은 메모</p>
              <textarea
                rows={5}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="오늘 그리워졌던 순간, 한 걸음 나아간 일, 무엇이든..."
                className="w-full bg-transparent border-0 outline-none resize-none text-warm-ink text-sm leading-relaxed placeholder:text-warm-soft/40"
              />
            </div>

            <div className="text-center mb-14">
              <button
                onClick={handleSubmit}
                disabled={!mood || loading}
                className={`rounded-full px-7 py-3 text-sm font-semibold transition-all ${
                  mood
                    ? "bg-gradient-to-br from-warm-apricot to-warm-rose text-white shadow-[0_10px_28px_rgba(245,158,125,0.4)] hover:-translate-y-0.5"
                    : "bg-white/40 text-warm-soft/50 cursor-not-allowed"
                }`}
              >
                오늘을 기록하기
              </button>
            </div>

            {/* 지난 기록 */}
            <div>
              <p className="text-xs text-warm-faint tracking-widest mb-6">지난 기록</p>
              {records.length === 0 ? (
                <p className="text-sm text-warm-faint text-center py-8">아직 기록이 없어요.</p>
              ) : (
                <div className="space-y-0">
                  {records.map((r, idx) => (
                    <div
                      key={r.id}
                      className={`flex items-start gap-4 py-4 group ${
                        idx === 0 ? "border-t border-b border-warm-apricot/20" : "border-b border-warm-apricot/20"
                      }`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-warm-peach to-warm-apricot text-white inline-flex items-center justify-center flex-none">
                        <i className={`ti ${MOOD_MAP[r.mood]?.icon ?? "ti-mood-smile"} text-base`} aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold text-warm-ink">
                            {MOOD_MAP[r.mood]?.label ?? r.mood}
                          </span>
                          <span className="text-xs text-warm-faint">{r.createdLabel}</span>
                        </div>
                        {r.note && (
                          <p className="text-xs text-warm-soft leading-relaxed">{r.note}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-full bg-white/60 text-warm-soft hover:text-warm-rose flex items-center justify-center transition-all"
                      >
                        <i className="ti ti-x text-[10px]" aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}