import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/lib/data/categories';
import { MobileNav } from './MobileNav';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="shrink-0 font-heading font-semibold">
          백송LED네온
        </Link>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/products/${category.slug}`}
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            nativeButton={false}
            render={<Link href="/configurator" />}
            className="hidden md:inline-flex"
          >
            맞춤 견적
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
