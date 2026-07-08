import Link from 'next/link';
import { GlobeIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
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
              <span>전화번호 입력 예정</span>
            </li>
            <li className="flex items-center gap-1.5">
              <MailIcon className="size-3.5" />
              <span>이메일 입력 예정</span>
            </li>
            <li className="flex items-center gap-1.5">
              <MapPinIcon className="size-3.5" />
              <span>주소 입력 예정</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t px-4 py-4 text-center text-xs text-muted-foreground">
        © 2026 백송LED네온 (www.bs-sign.com). All rights reserved.
      </div>
    </footer>
  );
}
