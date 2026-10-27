import Link from 'next/link';

export const PHONE = '010-9804-8285';
/** 카카오톡 채널/오픈채팅 주소. 비어 있으면 카카오톡 버튼을 숨긴다. */
const KAKAO_URL = 'https://open.kakao.com/o/sLiV3SJh';

const BUTTON = 'inline-flex items-center justify-center rounded-full px-7 py-4 text-base font-bold sm:text-lg';

/** 도면·시안 견적 → 카카오톡 → 전화 순서의 문의 버튼 줄. */
export function ContactButtons({
  quoteClassName,
  phoneClassName,
  className = '',
  showCalculator = false,
}: {
  quoteClassName: string;
  phoneClassName: string;
  className?: string;
  /** 전화번호 오른쪽에 네온 가격 계산기 버튼을 붙인다. */
  showCalculator?: boolean;
}) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Link href="/quote" className={`${BUTTON} ${quoteClassName}`}>
        도면·시안 보내고 견적받기
      </Link>
      {KAKAO_URL && (
        <a
          href={KAKAO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${BUTTON} bg-[#FEE500] text-[#191919]`}
        >
          카카오톡 문의
        </a>
      )}
      <a href={`tel:${PHONE}`} className={`${BUTTON} ${phoneClassName}`}>
        {PHONE}
      </a>
      {showCalculator && (
        <Link href="/configurator" className={`${BUTTON} bg-[#FFC2D6] text-[#2B2840]`}>
          네온 가격 직접 계산해보기
        </Link>
      )}
    </div>
  );
}
