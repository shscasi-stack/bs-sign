import Link from 'next/link';
import { CalculatorIcon, PhoneIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BRAND_NAME, NAV_ITEMS, QUOTE_CTA } from '@/lib/data/navigation';
import { MobileNav } from './MobileNav';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 text-neutral-900 backdrop-blur supports-backdrop-filter:bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-point font-heading text-sm font-extrabold text-white">
            BS
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-base font-bold tracking-tight">{BRAND_NAME}</span>
            <span className="text-[11px] text-neutral-500">사인물 제작·가공 전문</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-neutral-600 transition-colors hover:text-neutral-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:010-9804-8285"
            className="hidden items-center gap-1.5 text-sm font-semibold whitespace-nowrap text-neutral-700 transition-colors hover:text-point xl:flex"
          >
            <PhoneIcon className="size-4 text-point" />
            010-9804-8285
          </a>
          <Link
            href="/configurator"
            className="hidden items-center gap-1.5 rounded-full bg-[#FFD6E2] px-4 py-2 text-sm font-bold whitespace-nowrap text-[#2B2840] transition-colors hover:bg-[#FFC2D6] lg:flex"
          >
            <CalculatorIcon className="size-4" />
            LED네온 단가 계산
          </Link>
          <Button
            nativeButton={false}
            render={<Link href={QUOTE_CTA.href} />}
            className="hidden font-semibold md:inline-flex"
          >
            {QUOTE_CTA.label}
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
