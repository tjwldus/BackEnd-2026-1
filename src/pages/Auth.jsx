import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundBlobs from "../components/BackgroundBlobs.jsx";
import BackgroundLines from "../components/BackgroundLines.jsx";

export default function Auth() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", passwordConfirm: "", adult: false });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const authHanler = async () => {
    setError("");

    if (!form.email || !form.password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    if (isSignup && form.password !== form.passwordConfirm) {
      setError("비밀번호가 일치하지 않아요.");
      return;
    }
    if (isSignup && !form.adult) {
      setError("만 18세 이상만 가입할 수 있어요.");
      return;
    }

    try {
      const endpoint = isSignup ? "/api/auth/join" : "/api/auth/login";
      const body = isSignup
        ? { email: form.email, password: form.password, adult: form.adult }
        : { email: form.email, password: form.password };

      const res = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "오류가 발생했어요. 다시 시도해주세요.");
        return;
      }

      if (isSignup) {
        setIsSignup(false);
        setForm({ email: form.email, password: "", passwordConfirm: "", adult: false });
        setError("");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);

        // role에 따라 다른 페이지로
        if (data.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      }

    } catch {
      setError("서버에 연결할 수 없어요. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <>
      <BackgroundBlobs />
      <BackgroundLines />
      <div
        className="min-h-screen flex items-center justify-center px-5 py-10"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="w-full max-w-sm animate-fade-up">

          {/* 로고 */}
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl text-warm-ink mb-1">다시</h1>
            <p className="text-xs text-warm-soft tracking-wider">
              그리운 사람에게, 다시
            </p>
          </div>

          {/* 탭 */}
          <div className="flex glass-warm rounded-full p-1 mb-6">
            {["로그인", "회원가입"].map((label, i) => (
              <button
                key={label}
                onClick={() => { setIsSignup(i === 1); setError(""); }}
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${
                  isSignup === (i === 1)
                    ? "bg-gradient-to-br from-warm-apricot to-warm-rose text-white shadow-sm"
                    : "text-warm-soft"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* 입력 폼 */}
          <div className="glass-warm rounded-3xl px-6 py-5 space-y-4">
            <div>
              <p className="text-xs text-warm-soft mb-1.5">이메일</p>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요."
                className="w-full bg-transparent border-0 border-b border-warm-apricot/20 outline-none pb-1.5 text-warm-ink text-sm placeholder:text-warm-soft/40 focus:border-warm-apricot/50 transition-colors"
              />
            </div>
            <div>
              <p className="text-xs text-warm-soft mb-1.5">비밀번호</p>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요."
                onKeyDown={(e) => !isSignup && e.key === "Enter" && authHanler()}
                className="w-full bg-transparent border-0 border-b border-warm-apricot/20 outline-none pb-1.5 text-warm-ink text-sm placeholder:text-warm-soft/40 focus:border-warm-apricot/50 transition-colors"
              />
            </div>
            {isSignup && (
              <div>
                <p className="text-xs text-warm-soft mb-1.5">비밀번호 확인</p>
                <input
                  type="password"
                  name="passwordConfirm"
                  value={form.passwordConfirm}
                  onChange={handleChange}
                  placeholder="비밀번호 확인"
                  onKeyDown={(e) => e.key === "Enter" && authHanler()}
                  className="w-full bg-transparent border-0 border-b border-warm-apricot/20 outline-none pb-1.5 text-warm-ink text-sm placeholder:text-warm-soft/40 focus:border-warm-apricot/50 transition-colors"
                />
              </div>
            )}
            {isSignup && (
              <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                <div
                  onClick={() => setForm((prev) => ({ ...prev, adult: !prev.adult }))}
                  className={`mt-0.5 w-4 h-4 shrink-0 rounded border transition-all ${
                    form.adult
                      ? "bg-gradient-to-br from-warm-apricot to-warm-rose border-transparent"
                      : "border-warm-apricot/30 bg-transparent"
                  }`}
                >
                  {form.adult && (
                    <svg viewBox="0 0 12 12" fill="none" className="w-full h-full p-0.5">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span
                  onClick={() => setForm((prev) => ({ ...prev, adult: !prev.adult }))}
                  className="text-xs text-warm-soft leading-relaxed"
                >
                  만 18세 이상이며,{" "}
                  <span className="text-warm-ink underline underline-offset-2">이용약관</span>
                  {" "}및{" "}
                  <span className="text-warm-ink underline underline-offset-2">개인정보처리방침</span>
                  에 동의합니다.
                </span>
              </label>
            )}

            {error && (
              <p className="text-xs text-warm-rose text-center">{error}</p>
            )}
          </div>

          {/* 버튼 */}
          <div className="text-center mt-7">
            <button
              onClick={authHanler}
              className="rounded-full px-8 py-3 text-sm font-semibold bg-gradient-to-br from-warm-apricot to-warm-rose text-white shadow-[0_10px_28px_rgba(245,158,125,0.4)] hover:-translate-y-0.5 transition-all"
            >
              {isSignup ? "가입하고 시작하기" : "로그인"}
            </button>
          </div>

          {!isSignup && (
            <p className="text-center text-xs text-warm-soft/60 mt-5">
              비밀번호를 잊으셨나요?{" "}
              <span className="text-warm-ink underline underline-offset-2 cursor-pointer">
                비밀번호 찾기
              </span>
            </p>
          )}

        </div>
      </div>
    </>
  );
}