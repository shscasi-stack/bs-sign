import Image from 'next/image';
import { FadeIn } from '@/components/motion/FadeIn';

interface FacilityPhoto {
  src: string;
  alt: string;
  caption: string;
  description: string;
}

/** 실제 작업장 촬영 사진 — 공정·장비를 그대로 보여줘 "믿을 만한 제작공장" 인상을 준다(애드에어 벤치마킹). */
const FACILITY_PHOTOS: FacilityPhoto[] = [
  {
    src: '/images/factory/machine-cnc.jpg',
    alt: 'HOWON CNC 라우터 장비',
    caption: 'CNC 라우터',
    description: '자동 공구 교환 방식으로 대형 판재를 정밀 가공합니다.',
  },
  {
    src: '/images/factory/machine-laser.jpg',
    alt: '레이저 커팅 장비',
    caption: '레이저 커팅기',
    description: '아크릴 문자·로고를 매끄러운 절단면으로 커팅합니다.',
  },
  {
    src: '/images/factory/process-laser-acrylic.jpg',
    alt: '레이저로 아크릴 문자를 커팅하는 모습',
    caption: '레이저 가공 중',
    description: '아크릴 판재에서 문자를 커팅하는 실제 작업 장면입니다.',
  },
  {
    src: '/images/factory/process-cnc-cutting.jpg',
    alt: 'CNC로 판재 외곽선을 컷팅하는 모습',
    caption: 'CNC 가공 중',
    description: '시안 외곽선을 따라 판재를 컷팅하는 실제 작업 장면입니다.',
  },
];

export function FacilitySection() {
  return (
    <section id="facility" className="scroll-mt-16 bg-white text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <FadeIn>
          <p className="text-xs font-semibold tracking-[0.2em] text-point">IN-HOUSE FACTORY</p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            자체 CNC·레이저 설비로 직접 제작합니다
          </h2>
          <p className="mt-3 max-w-2xl text-neutral-600">
            외주 없이 자체 설비로 가공하기 때문에 시안 조율과 납기 대응이 빠릅니다. 아래는 실제
            작업장에서 촬영한 장비와 가공 장면입니다.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FACILITY_PHOTOS.map((photo, index) => (
            <FadeIn key={photo.src} delay={index * 0.06}>
              <figure className="flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    quality={90}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="flex flex-1 flex-col p-4">
                  <span className="font-heading font-semibold">{photo.caption}</span>
                  <span className="mt-1 text-sm leading-relaxed text-neutral-600">
                    {photo.description}
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
