import { useEffect, useRef } from "react";

export default function BackgroundLines() {
  const svgRef = useRef(null);

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
      {/* glow */}
      <div className="pointer-events-none fixed inset-0" style={{ zIndex: 0 }}>
        <div
          style={{
            position: "absolute",
            top: "38%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "900px", height: "900px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,158,125,0.28) 0%, rgba(251,191,182,0.16) 40%, transparent 68%)",
            animation: "glow-spread 2s 0.1s both cubic-bezier(0.2,0,0.2,1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "68%", left: "18%",
            width: "560px", height: "560px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251,191,182,0.2) 0%, transparent 60%)",
            animation: "glow-spread 2.4s 0.4s both cubic-bezier(0.2,0,0.2,1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "10%", left: "72%",
            width: "420px", height: "420px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,158,125,0.15) 0%, transparent 60%)",
            animation: "glow-spread 2.2s 0.7s both cubic-bezier(0.2,0,0.2,1)",
          }}
        />
      </div>

      {/* SVG 선 */}
      <svg
        ref={svgRef}
        className="pointer-events-none fixed inset-0 w-full h-full"
        style={{ zIndex: 0 }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path d="M -60 700 C 200 500, 600 420, 900 370 S 1300 180, 1520 60"
          stroke="rgba(245,158,125,0.45)" strokeWidth="2" data-dur="2.2" data-delay="0.2" />
        <path d="M -60 700 C 200 500, 600 420, 900 370 S 1300 180, 1520 60"
          stroke="rgba(245,158,125,0.12)" strokeWidth="14" data-dur="2.2" data-delay="0.2" />
        <path d="M 750 920 C 900 700, 1080 560, 1460 420"
          stroke="rgba(251,191,182,0.38)" strokeWidth="1.5" data-dur="2.0" data-delay="0.6" />
        <path d="M 0 130 C 160 70, 420 150, 650 90 S 1020 10, 1260 50"
          stroke="rgba(245,158,125,0.28)" strokeWidth="1.5" data-dur="2.3" data-delay="0.9" />
        <path d="M 200 880 C 350 650, 500 500, 720 420 S 1000 300, 1200 200"
          stroke="rgba(251,191,182,0.22)" strokeWidth="1" data-dur="2.6" data-delay="1.1" />
        <path d="M 1100 900 C 1200 750, 1350 650, 1460 580"
          stroke="rgba(245,158,125,0.3)" strokeWidth="1" data-dur="1.6" data-delay="1.3" />
      </svg>

      <style>{`
        @keyframes glow-spread {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.3); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </>
  );
}