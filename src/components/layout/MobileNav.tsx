'use client';

import Link from 'next/link';
import { MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CATEGORIES } from '@/lib/data/categories';

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" aria-label="메뉴 열기" />}
        className="md:hidden"
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>백송LED네온</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4 pb-4">
          {CATEGORIES.map((category) => (
            <SheetClose
              key={category.slug}
              render={<Link href={`/products/${category.slug}`} />}
              className="rounded-md px-2 py-2 text-sm hover:bg-muted"
            >
              {category.name}
            </SheetClose>
          ))}
          <SheetClose
            render={<Link href="/configurator" />}
            className="mt-2 rounded-md bg-primary px-2 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/80"
          >
            맞춤 견적 시작하기
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
