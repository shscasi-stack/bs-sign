import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Category } from '@/lib/data/categories';
import type { PortfolioItem } from '@/lib/data/portfolio';

interface PortfolioCardProps {
  item: PortfolioItem;
  category: Category;
}

export function PortfolioCard({ item, category }: PortfolioCardProps) {
  return (
    <Card className="h-full overflow-hidden">
      {item.imageUrl ? (
        <div className="relative h-40 w-full">
          <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
        </div>
      ) : (
        <div
          className={`flex h-40 flex-col items-center justify-center gap-2 bg-gradient-to-br text-white ${category.gradientClassName}`}
        >
          <category.icon className="size-8" />
          <span className="text-xs text-white/80">사진 준비 중</span>
        </div>
      )}
      <CardContent className="flex flex-col gap-1">
        <p className="font-medium">{item.title}</p>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </CardContent>
    </Card>
  );
}
