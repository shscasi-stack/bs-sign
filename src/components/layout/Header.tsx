import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BRAND_NAME, NAV_ITEMS, QUOTE_CTA } from '@/lib/data/navigation';
import { MobileNav } from './MobileNav';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 text-white backdrop-blur supports-backdrop-filter:bg-ink/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="shrink-0 font-heading text-base font-bold tracking-tight">
          {BRAND_NAME}
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
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
