import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  AlertTriangleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  ClipboardListIcon,
  FileTextIcon,
  MessageSquareTextIcon,
  WrenchIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/motion/FadeIn';
import { PortfolioCard } from '@/components/portfolio/PortfolioCard';
import { getCategoryBySlug } from '@/lib/data/categories';
import {
  PORTFOLIO_ITEMS,
  getPortfolioByCategory,
  getPortfolioItemBySlug,
} from '@/lib/data/portfolio';
import { QUOTE_CTA } from '@/lib/data/navigation';

interface CasePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PORTFOLIO_ITEMS.filter((item) => item.caseStudy).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioItemBySlug(slug);
  if (!item) return {};
  return {
    title: `${item.title} 제작 사례 | 백송사인`,
    description: `${item.description} 소재·가공방식·주문 시 필요한 정보를 정리한 백송사인 제작 사례입니다.`,
  };
}

export default async function PortfolioCasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const item = getPortfolioItemBySlug(slug);
  if (!item?.caseStudy) notFound();

  const category = getCategoryBySlug(item.category);
  if (!category) notFound();

  const { caseStudy } = item;
  const related = getPortfolioByCategory(item.category).filter((i) => i.slug !== item.slug);

  const specs = [
    { label: '소재', value: item.material },
    { label: '제작 방식', value: item.method },
    { label: '두께', value: item.thickness ?? '문의' },
    { label: '크기', value: item.size ?? '문의' },
  ];

  return (
    <main className="flex flex-1 flex-col bg-white text-neutral-900">
      {/* 헤더 */}
      <section className="border-b border-neutral-200 bg-ink-light px-4 pt-10 pb-12">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
            >
              <ArrowLeftIcon className="size-4" />
              제작 사례 전체 보기
            </Link>
            <div className="mt-6 flex items-center gap-2">
              <div
                className={`flex size-8 items-center justify-center rounded-lg bg-gradient-to-br text-white ${category.gradientClassName}`}
              >
                <category.icon className="size-4" />
              </div>
              <span className="text-sm font-medium text-point">{category.name} 제작 사례</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight">{item.title}</h1>
            <p className="mt-3 text-neutral-600">{item.description}</p>
          </FadeIn>
        </div>
      </section>

      {/* 대표 이미지 */}
      <section className="px-4 pt-10">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            {item.imageUrl ? (
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-neutral-200">
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
              </div>
            ) : (
              // TODO: 실제 완성 사진 교체 — /public/portfolio/{slug}.jpg (제작 과정 컷 포함 권장)
              <div
                className={`flex aspect-[16/9] flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br text-white ${category.gradientClassName}`}
              >
                <category.icon className="size-10" />
                <span className="text-sm text-white/80">사진 준비 중</span>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* 본문 — 요청 → 소재·스펙 → 가공 → 주의점 → 결과 → 주문 정보 */}
      <section className="px-4 py-12">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <FadeIn>
            <div className="flex items-center gap-2 text-point">
              <MessageSquareTextIcon className="size-5" />
              <h2 className="text-lg font-bold text-neutral-900">제작 요청 내용</h2>
            </div>
            <p className="mt-3 leading-relaxed text-neutral-700">{caseStudy.request}</p>
          </FadeIn>

          <FadeIn>
            <div className="flex items-center gap-2 text-point">
              <ClipboardListIcon className="size-5" />
              <h2 className="text-lg font-bold text-neutral-900">사용한 소재와 스펙</h2>
            </div>
            <p className="mt-3 leading-relaxed text-neutral-700">{caseStudy.materialDetail}</p>
            <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 sm:grid-cols-4">
              {specs.map((spec) => (
                <div key={spec.label} className="bg-neutral-50 px-4 py-3">
                  <dt className="text-xs text-neutral-400">{spec.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-neutral-800">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>

          <FadeIn>
            <div className="flex items-center gap-2 text-point">
              <WrenchIcon className="size-5" />
              <h2 className="text-lg font-bold text-neutral-900">가공방식 — 어떻게 만들었나</h2>
            </div>
            <p className="mt-3 leading-relaxed text-neutral-700">{caseStudy.methodDetail}</p>
          </FadeIn>

          <FadeIn>
            <div className="flex items-center gap-2 text-point">
              <AlertTriangleIcon className="size-5" />
              <h2 className="text-lg font-bold text-neutral-900">제작 시 주의점</h2>
            </div>
            <ul className="mt-3 flex flex-col gap-2.5">
              {caseStudy.cautions.map((caution) => (
                <li key={caution} className="flex gap-2.5 text-neutral-700">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-point" />
                  <span className="leading-relaxed">{caution}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn>
            <div className="flex items-center gap-2 text-point">
              <CheckCircle2Icon className="size-5" />
              <h2 className="text-lg font-bold text-neutral-900">완성 결과</h2>
            </div>
            <p className="mt-3 leading-relaxed text-neutral-700">{caseStudy.result}</p>
          </FadeIn>

          {/* 주문 시 필요한 정보 — 견적 전 준비물 체크리스트 */}
          <FadeIn>
            <div className="rounded-xl border border-neutral-200 bg-ink-light p-6">
              <div className="flex items-center gap-2 text-point">
                <FileTextIcon className="size-5" />
                <h2 className="text-lg font-bold text-neutral-900">같은 제작을 주문하려면</h2>
              </div>
              <p className="mt-2 text-sm text-neutral-500">
                아래 정보를 함께 보내주시면 견적 안내가 빨라집니다.
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {caseStudy.orderInfo.map((info) => (
                  <li key={info} className="flex items-center gap-2.5 text-neutral-700">
                    <CheckCircle2Icon className="size-4 shrink-0 text-point" />
                    <span className="text-sm">{info}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  nativeButton={false}
                  render={<Link href={QUOTE_CTA.href} />}
                  className="font-semibold"
                >
                  {QUOTE_CTA.label}
                  <ArrowRightIcon />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  nativeButton={false}
                  render={<Link href={`/products/${category.slug}`} />}
                >
                  {category.name} 품목 보기
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 같은 품목의 다른 사례 */}
      {related.length > 0 && (
        <section className="border-t border-neutral-200 bg-ink-light px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <h2 className="text-xl font-bold">같은 품목의 다른 사례</h2>
            </FadeIn>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedItem, index) => (
                <FadeIn key={relatedItem.slug} delay={index * 0.06}>
                  <PortfolioCard item={relatedItem} category={category} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
