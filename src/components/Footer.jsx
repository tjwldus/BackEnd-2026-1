import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-warm-faint/20 mt-auto bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          {/* 로고 및 간단한 설명 */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-serif text-lg font-bold text-warm-ink/80 tracking-widest">
              다시
            </span>
            <p className="text-xs text-warm-soft text-center md:text-left">
              당신의 마음을 가장 잘 아는 공간
            </p>
          </div>

          {/* 하단 링크 메뉴 */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-warm-soft">
            <Link to="/about" className="hover:text-warm-ink transition-colors">서비스 소개</Link>
            <Link to="/privacy" className="font-medium hover:text-warm-ink transition-colors">개인정보처리방침</Link>
            <Link to="/terms" className="hover:text-warm-ink transition-colors">이용약관</Link>
          </div>
        </div>

        {/* 카피라이트 */}
        <div className="mt-8 pt-6 border-t border-warm-faint/10 text-center md:text-left text-[11px] text-warm-faint">
          &copy; {new Date().getFullYear()} 다시. All rights reserved.
        </div>
        
      </div>
    </footer>
  );
}