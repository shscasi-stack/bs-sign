'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileTextIcon, PhoneIcon } from 'lucide-react';

/**
 * 화면 하단에 계속 따라오는 견적·전화 버튼 (애드에어 벤치마킹).
 * 히어로를 지나 스크롤하면 나타난다. 핵심 전환은 전화가 아닌 견적 요청이므로
 * 견적 버튼을 주(主) 버튼으로 강조한다.
 */
export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2 transition-all duration-300 sm:right-6 sm:bottom-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <a
        href="tel:010-9804-8285"
        aria-label="전화 문의 010-9804-8285"
        className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white/95 px-4 py-3 text-sm font-medium text-neutral-900 shadow-lg backdrop-blur transition-colors hover:bg-white"
      >
        <PhoneIcon className="size-4 text-point" />
        <span className="hidden sm:inline">전화 문의</span>
      </a>
      <Link
        href="/quote"
        className="flex items-center gap-2 rounded-full bg-point px-5 py-3.5 text-sm font-semibold text-white shadow-xl shadow-point/25 transition-transform hover:scale-[1.03]"
      >
        <FileTextIcon className="size-4" />
        도면·시안 견적받기
      </Link>
    </div>
  );
}
