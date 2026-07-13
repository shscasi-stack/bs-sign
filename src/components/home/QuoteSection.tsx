import Link from 'next/link';
import { ArrowRightIcon, HardDriveIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/motion/FadeIn';

const CONTACTS = [
  { icon: PhoneIcon, label: '전화 문의', value: '010-9804-8285', href: 'tel:010-9804-8285' },
  { icon: MailIcon, label: '이메일 시안 전달', value: 'moon9291@naver.com', href: 'mailto:moon9291@naver.com' },
  {
    icon: HardDriveIcon,
    label: '웹하드 파일 전달',
    value: 'ID: bs9291 / PW: 9291',
    href: 'https://only.webhard.co.kr/login',
  },
];

export function QuoteSection() {
  return (
    <section id="quote" className="scroll-mt-16 bg-point text-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <FadeIn>
          <h2 className="text-2xl font-bold sm:text-3xl">도면·시안 보내고 견적받기</h2>
          <p className="mt-3 max-w-2xl text-white/80">
            도면과 시안을 보내주시면 제작 가능 여부, 예상 견적, 납기를 확인해드립니다.
            지원 파일: AI, PDF, JPG, PNG, CAD, DXF
          </p>
          <Button
            size="lg"
            variant="secondary"
            nativeButton={false}
            render={<Link href="/quote" />}
            className="mt-6 font-semibold"
          >
            온라인 견적 폼 작성하기
            <ArrowRightIcon />
          </Button>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {CONTACTS.map((contact, index) => (
            <FadeIn key={contact.label} delay={index * 0.06}>
              <a
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex h-full flex-col gap-3 rounded-xl border border-white/20 bg-white/10 p-6 transition-colors hover:bg-white/15"
              >
                <contact.icon className="size-6" />
                <div>
                  <p className="text-sm text-white/70">{contact.label}</p>
                  <p className="mt-0.5 font-semibold">{contact.value}</p>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

        <p className="mt-8 text-sm text-white/70">
          전화·이메일·웹하드로 시안과 규격을 보내주셔도 동일하게 안내드립니다.
        </p>
      </div>
    </section>
  );
}
