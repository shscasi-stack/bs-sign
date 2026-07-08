import Link from 'next/link';
import { GlobeIcon, HardDriveIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { CATEGORIES } from '@/lib/data/categories';

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-heading font-semibold">백송LED네온</p>
          <p className="mt-2 text-sm text-muted-foreground">
            LED네온 · 고무스카시 · 아크릴가공 · 포맥스 사인물 전문 제작
          </p>
          <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
            <GlobeIcon className="size-3.5" />
            <span>www.bs-sign.com</span>
          </p>
        </div>

        <div>
          <p className="text-sm font-medium">카테고리</p>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm text-muted-foreground">
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/products/${category.slug}`}
                  className="hover:text-foreground"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium">문의</p>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-1.5">
              <PhoneIcon className="size-3.5" />
              <a href="tel:010-9804-8285" className="hover:text-foreground">
                010-9804-8285
              </a>
            </li>
            <li className="flex items-center gap-1.5">
              <MailIcon className="size-3.5" />
              <a href="mailto:moon9291@naver.com" className="hover:text-foreground">
                moon9291@naver.com
              </a>
            </li>
            <li className="flex items-center gap-1.5">
              <MapPinIcon className="size-3.5" />
              <span>부천로167번길 11</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-8">
        <a
          href="https://only.webhard.co.kr/login"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <HardDriveIcon className="size-3.5" />
          <span>웹하드 (ID: bs9291 / PW: 9291)</span>
        </a>
      </div>

      <div className="border-t px-4 py-4 text-center text-xs text-muted-foreground">
        © 2026 백송LED네온 (www.bs-sign.com). All rights reserved.
      </div>
    </footer>
  );
}
