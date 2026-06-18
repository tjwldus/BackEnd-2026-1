// 따뜻한 톤의 떠다니는 블롭 - 황혼·복숭아·라벤더
export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute w-[420px] h-[420px] rounded-full blur-3xl opacity-55 animate-blob-float"
        style={{ background: "#fcb69f", top: "-80px", right: "-100px" }}
      />
      <div
        className="absolute w-[380px] h-[380px] rounded-full blur-3xl opacity-50 animate-blob-float"
        style={{
          background: "#e7c4dd",
          bottom: "-100px",
          left: "-80px",
          animationDelay: "-7s",
        }}
      />
      <div
        className="absolute w-[320px] h-[320px] rounded-full blur-3xl opacity-40 animate-blob-float"
        style={{
          background: "#fde68a",
          top: "45%",
          left: "30%",
          animationDelay: "-14s",
        }}
      />
      <div
        className="absolute w-[260px] h-[260px] rounded-full blur-3xl opacity-35 animate-blob-float"
        style={{
          background: "#e7a4a4",
          top: "20%",
          left: "-60px",
          animationDelay: "-3s",
        }}
      />
    </div>
  );
}
