import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackgroundBlobs from "../components/BackgroundBlobs.jsx";
import BackgroundLines from "../components/BackgroundLines.jsx";
import NavBar from "../components/Navbar.jsx";

export default function ChatList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [people, setPeople] = useState([]);
  const [selected, setSelected] = useState(null);
  const [persona, setPersona] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  // 진입 시 타이머 시작
  const startTimeRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = Date.now();

    return () => {
      const minutes = Math.max(1, Math.floor((Date.now() - startTimeRef.current) / 1000 / 60));
      const token = localStorage.getItem("token");
      fetch("http://localhost:8080/api/usage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ minutes }),
        keepalive: true,
      });
    };
  }, []);

  useEffect(() => {
    if (location.state?.selectedId) {
      setSelected(location.state.selectedId);
    }
  }, [location.state]);

  // 목록 불러오기
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/personas", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPeople(data))
      .catch(() => setPeople([]));
  }, []);

  // 사람 선택 시 persona + 대화 히스토리 불러오기
  useEffect(() => {
    if (!selected) return;
    const token = localStorage.getItem("token");

    Promise.all([
      fetch(`http://localhost:8080/api/personas/${selected}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
      fetch(`http://localhost:8080/api/chat/${selected}/history`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
    ]).then(([personaData, history]) => {
      setPersona(personaData);
      setMessages(
        history.length > 0
          ? history
          : [{ role: "assistant", content: `오랜만이야.` }]
      );
    });
  }, [selected]);

  // 스크롤 하단 유지
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleBack = () => {
    setSelected(null);
    setPersona(null);
    setMessages([]);
  };

  const handleDelete = async (e, personaId) => {
    e.stopPropagation();
    if (!window.confirm("정말 삭제할까요? 대화 내역도 모두 사라져요.")) return;
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8080/api/personas/${personaId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setPeople((prev) => prev.filter((p) => p.id !== personaId));
    if (selected === personaId) handleBack();
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          personaId: Number(selected),
          messages: newMessages,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      setPeople((prev) =>
        prev.map((p) => (p.id === selected ? { ...p, lastChatLabel: "방금 전" } : p))
      );
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "잠시 연결이 끊겼어요. 다시 말해줄래요?" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackgroundBlobs />
      <BackgroundLines />

      <div className="flex h-screen overflow-hidden" style={{ position: "relative", zIndex: 1 }}>
        <NavBar />

        {/* ── 왼쪽 사이드바 ── */}
        <aside className="w-80 flex-shrink-0 glass-warm border-r border-white/40 flex flex-col">

          {/* 헤더 */}
          <div className="px-5 py-5 border-b border-white/30">
            <div className="flex items-center justify-between mb-1">
              <h1 className="font-serif text-2xl text-warm-ink">다시</h1>
              <button
                onClick={() => navigate("/welcome")}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-warm-apricot to-warm-rose text-white inline-flex items-center justify-center hover:scale-105 transition-all shadow-sm"
              >
                <i className="ti ti-plus text-sm" aria-hidden="true" />
              </button>
            </div>
            <p className="text-xs text-warm-faint">그리운 사람에게, 다시</p>
          </div>

          {/* 목록 */}
          <div className="flex-1 overflow-y-auto py-2">
            {people.length === 0 ? (
              <div className="text-center py-12 px-5">
                <p className="text-sm text-warm-soft mb-1">아직 아무도 없어요</p>
                <p className="text-xs text-warm-faint">+ 버튼으로 추가해보세요</p>
              </div>
            ) : (
              people.map((p) => (
                <div key={p.id} className="relative group">
                  <button
                    onClick={() => setSelected(p.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-all text-left ${
                      selected === p.id ? "bg-white/40" : "hover:bg-white/20"
                    }`}
                  >
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-warm-peach to-warm-rose text-white inline-flex items-center justify-center font-serif text-lg flex-shrink-0">
                      {p.name.slice(0, 1)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-warm-ink text-sm">{p.name}</div>
                      <div className="text-[11px] text-warm-faint truncate">{p.relation}</div>
                    </div>
                    <div className="text-[10px] text-warm-soft/60 flex-shrink-0">
                      {p.lastChatLabel}
                    </div>
                  </button>

                  {/* 삭제 버튼 */}
                  <button
                    onClick={(e) => handleDelete(e, p.id)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/70 text-warm-soft hover:text-warm-rose hidden group-hover:flex items-center justify-center transition-all"
                  >
                    <i className="ti ti-x text-[10px]" aria-hidden="true" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* 하단 */}
          <div className="border-t border-white/30 px-4 py-3 flex items-center gap-3">
            <div className="flex-1 text-xs text-warm-soft/60">
              많이 힘드시면{" "}
              <span className="font-semibold text-warm-ink">1393</span>
            </div>
            <button
              onClick={() => navigate("/settings")}
              className="w-8 h-8 rounded-full hover:bg-white/40 text-warm-soft hover:text-warm-ink transition-all inline-flex items-center justify-center"
            >
              <i className="ti ti-settings text-sm" aria-hidden="true" />
            </button>
          </div>
        </aside>

        {/* ── 오른쪽 ── */}
        {selected && persona ? (
          <div className="flex-1 flex flex-col">

            {/* 대화 헤더 */}
            <header className="glass-warm border-b border-white/40 px-5 py-3 flex items-center gap-3">
              <button
                onClick={handleBack}
                className="text-warm-soft hover:text-warm-ink p-1.5 rounded-full hover:bg-white/40 transition-all"
              >
                <i className="ti ti-arrow-left text-sm" aria-hidden="true" />
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-warm-peach to-warm-rose text-white inline-flex items-center justify-center font-serif">
                {persona.name.slice(0, 1)}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-warm-ink text-sm">{persona.name}</div>
                {persona.relation && (
                  <div className="text-[11px] text-warm-faint">{persona.relation}</div>
                )}
              </div>
            </header>

            {/* 메시지 */}
            <main className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <div className="glass-warm rounded-3xl p-4 text-center text-sm text-warm-soft">
                <p className="mb-1">지금부터의 대화는 당신의 기억과 함께 만드는 것이에요.</p>
                <p className="text-xs text-warm-faint">많이 힘드시면 1393으로 연락주세요.</p>
              </div>

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-warm-apricot to-warm-rose text-white rounded-br-sm"
                      : "glass-warm text-warm-ink rounded-bl-sm"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="glass-warm px-4 py-3 rounded-2xl rounded-bl-sm">
                    <span className="flex gap-1 items-center h-4">
                      {[0, 1, 2].map((i) => (
                        <span key={i} className="block w-1.5 h-1.5 rounded-full bg-warm-apricot/60"
                          style={{ animation: `bounce 1s ${i * 0.18}s infinite` }} />
                      ))}
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </main>

            {/* 입력창 */}
            <footer className="glass-warm border-t border-white/40 px-5 py-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={`${persona.name}에게 하고 싶은 말을 적어보세요`}
                  className="flex-1 bg-white/50 border border-white/70 rounded-full px-4 py-2.5 text-sm text-warm-ink placeholder:text-warm-soft/50 outline-none focus:bg-white/70"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className={`w-10 h-10 rounded-full inline-flex items-center justify-center transition-all ${
                    input.trim() && !loading
                      ? "bg-gradient-to-br from-warm-apricot to-warm-rose text-white shadow-md hover:scale-105"
                      : "bg-warm-apricot/20 text-warm-soft/40"
                  }`}
                >
                  <i className="ti ti-send" aria-hidden="true" />
                </button>
              </div>
            </footer>
          </div>
        ) : (
          /* 빈 화면 */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="font-serif text-2xl text-warm-ink mb-2">누구와 이야기할까요?</p>
              <p className="text-sm text-warm-soft mb-8">
                새로운 사람을 추가해보세요.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => navigate("/welcome")}
                  className="rounded-full px-6 py-2.5 text-sm font-semibold bg-gradient-to-br from-warm-apricot to-warm-rose text-white shadow-[0_8px_20px_rgba(245,158,125,0.4)] hover:-translate-y-0.5 transition-all"
                >
                  <i className="ti ti-plus text-xs mr-1.5" aria-hidden="true" />
                  새로운 사람 추가
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}