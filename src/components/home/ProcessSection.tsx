import { FadeIn } from '@/components/motion/FadeIn';
import { PROCESS_STEPS } from '@/lib/data/process';

export function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-16 bg-ink-light text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <FadeIn>
          <h2 className="text-2xl font-bold sm:text-3xl">간단하고 정확한 주문·제작 과정</h2>
        </FadeIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS_STEPS.map((step, index) => (
            <FadeIn key={step.step} delay={index * 0.06}>
              <div className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-5">
                <span className="font-heading text-2xl font-extrabold text-point">{step.step}</span>
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
