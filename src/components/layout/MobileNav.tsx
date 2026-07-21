'use client';

import Link from 'next/link';
import { MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { BRAND_NAME, NAV_ITEMS, QUOTE_CTA } from '@/lib/data/navigation';

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="메뉴 열기" />
        }
        className="md:hidden"
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>{BRAND_NAME}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-1 flex-col gap-1 px-4">
          {NAV_ITEMS.map((item) => (
            <SheetClose
              key={item.href}
              render={<Link href={item.href} />}
              className="rounded-md px-2 py-2.5 text-sm hover:bg-muted"
            >
              {item.label}
            </SheetClose>
          ))}
        </nav>
        <SheetFooter>
          <SheetClose
            render={<Link href={QUOTE_CTA.href} />}
            className="rounded-md bg-primary px-2 py-3 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {QUOTE_CTA.label}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
