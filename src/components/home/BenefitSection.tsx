import { FadeIn } from '@/components/motion/FadeIn';
import { BENEFITS } from '@/lib/data/benefits';

export function BenefitSection() {
  return (
    <section id="company" className="scroll-mt-16 bg-white text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <FadeIn>
          <h2 className="text-2xl font-bold sm:text-3xl">
            광고사와 간판업체가 백송사인을 선택하는 이유
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, index) => (
            <FadeIn key={benefit.title} delay={index * 0.06}>
              <div className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex size-11 items-center justify-center rounded-lg bg-point/10 text-point">
                  <benefit.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{benefit.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
