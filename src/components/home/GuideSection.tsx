import { CircleAlertIcon, PackageIcon, ScissorsIcon, TruckIcon, WrenchIcon } from 'lucide-react';
import { FadeIn } from '@/components/motion/FadeIn';

const GUIDES = [
  {
    icon: WrenchIcon,
    title: '현장 시공은 진행하지 않습니다',
    description:
      '백송사인은 사인물 제작·가공 전문업체이며 현장 설치와 시공은 제공하지 않습니다.',
  },
  {
    icon: ScissorsIcon,
    title: '아크릴 후처리는 진행하지 않습니다',
    description: '아크릴 가공 후 별도의 후처리 작업은 제공하지 않습니다.',
  },
  {
    icon: CircleAlertIcon,
    title: '파일 전달이 필요합니다',
    description: '정확한 견적을 위해 AI 시안 파일과 규격을 전달해주세요.',
  },
  {
    icon: PackageIcon,
    title: '납기는 제품에 따라 달라집니다',
    description: '품목, 크기, 수량, 소재에 따라 제작 일정이 달라질 수 있습니다.',
  },
  {
    icon: TruckIcon,
    title: '전국 택배·화물 출고가 가능합니다',
    description: '제품 특성에 맞는 포장 방식으로 택배 또는 화물 출고를 진행합니다.',
  },
];

export function GuideSection() {
  return (
    <section id="guide" className="scroll-mt-16 bg-ink-light text-neutral-900">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 lg:grid-cols-[1fr_1.2fr]">
        <FadeIn>
          <h2 className="text-2xl font-bold sm:text-3xl">주문 전 확인해주세요</h2>
          <p className="mt-3 text-neutral-600">
            백송사인은 제작·가공 전문업체입니다. 아래 내용을 먼저 확인하시면 견적과 제작이
            더 빠르게 진행됩니다.
          </p>
          {/* TODO: 포장·출고 이미지 교체 — /public/images/packaging.jpg */}
          <div className="mt-6 hidden aspect-[4/3] items-center justify-center rounded-xl border border-neutral-200 bg-white text-sm text-neutral-400 lg:flex">
            포장·출고 이미지
          </div>
        </FadeIn>

        <ul className="flex flex-col gap-3">
          {GUIDES.map((guide, index) => (
            <FadeIn key={guide.title} delay={index * 0.05}>
              <li className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-point/10 text-point">
                  <guide.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{guide.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                    {guide.description}
                  </p>
                </div>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
