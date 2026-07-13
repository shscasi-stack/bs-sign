import { HardDriveIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { FadeIn } from '@/components/motion/FadeIn';

// 1단계에서는 연락 수단 안내 중심. 도면·시안 첨부 온라인 견적 폼(입력검증 + 파일 드래그앤드롭)은
// 2단계에서 QuoteForm 컴포넌트로 추가한다.
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
            아래 정보를 보내주시면 제작 가능 여부, 예상 견적, 납기를 확인해드립니다.
            지원 파일: AI, PDF, JPG, PNG, CAD, DXF
          </p>
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
          온라인 견적 폼(도면·시안 첨부)은 준비 중입니다. 우선 위 연락 수단으로 시안과 규격을
          보내주시면 빠르게 안내드리겠습니다.
        </p>
      </div>
    </section>
  );
}
