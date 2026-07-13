import Link from 'next/link';
import { GlobeIcon, HardDriveIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { BRAND_NAME, NAV_ITEMS } from '@/lib/data/navigation';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="font-heading text-base font-bold text-white">{BRAND_NAME}</p>
          <p className="mt-2 text-sm">
            광고사와 간판업체를 위한 사인물 제작·가공 전문 파트너
          </p>
          <p className="mt-1 text-sm text-white/50">
            고무스카시 · 아크릴 가공 · 포맥스 가공 · LED 네온
          </p>
          <p className="mt-3 flex items-center gap-1.5 text-sm">
            <GlobeIcon className="size-3.5" />
            <span>www.bs-sign.com</span>
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-white">바로가기</p>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-white">문의</p>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm">
            <li className="flex items-center gap-1.5">
              <PhoneIcon className="size-3.5" />
              <a href="tel:010-9804-8285" className="hover:text-white">
                010-9804-8285
              </a>
            </li>
            <li className="flex items-center gap-1.5">
              <MailIcon className="size-3.5" />
              <a href="mailto:moon9291@naver.com" className="hover:text-white">
                moon9291@naver.com
              </a>
            </li>
            <li className="flex items-center gap-1.5">
              <MapPinIcon className="size-3.5" />
              <span>부천로167번길 11</span>
            </li>
            {/* TODO: 사업자등록번호 실제 값 입력 필요 */}
            <li className="text-white/50">사업자등록번호 000-00-00000</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-8">
        <a
          href="https://only.webhard.co.kr/login"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-1.5 text-sm hover:text-white"
        >
          <HardDriveIcon className="size-3.5" />
          <span>웹하드 (ID: bs9291 / PW: 9291)</span>
        </a>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-white/50 sm:flex-row">
          <span>© 2026 백송사인 (www.bs-sign.com). All rights reserved.</span>
          <div className="flex items-center gap-4">
            {/* TODO: 실제 방침 페이지 연결 필요 */}
            <Link href="/#" className="hover:text-white">
              개인정보처리방침
            </Link>
            <Link href="/#" className="hover:text-white">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
