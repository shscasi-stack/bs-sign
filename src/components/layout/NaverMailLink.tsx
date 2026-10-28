'use client';

import { useState } from 'react';

const NAVER_MAIL_URL = 'https://mail.naver.com/';

/**
 * 이메일 주소 링크. mailto: 는 방문자 기기의 기본 메일 앱(대개 Gmail)을 열기 때문에,
 * 대신 네이버 메일을 새 창으로 열고 주소는 복사해 둔다(받는사람에 붙여넣기).
 */
export function NaverMailLink({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <a
      href={NAVER_MAIL_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="네이버 메일 열기 (주소는 자동으로 복사돼요)"
      className={className}
      onClick={() => {
        navigator.clipboard?.writeText(email).then(
          () => {
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
          },
          () => {},
        );
      }}
    >
      {email}
      {copied && <span className="ml-1.5 text-xs">주소 복사됨</span>}
    </a>
  );
}
