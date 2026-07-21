import { HeroSection } from '@/components/home/HeroSection';
import { ProductSection } from '@/components/home/ProductSection';
import { FacilitySection } from '@/components/home/FacilitySection';
import { BenefitSection } from '@/components/home/BenefitSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { PortfolioPreview } from '@/components/home/PortfolioPreview';
import { GuideSection } from '@/components/home/GuideSection';
import { QuoteSection } from '@/components/home/QuoteSection';
import { BottomCTA } from '@/components/home/BottomCTA';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <ProductSection />
      <BenefitSection />
      <ProcessSection />
      <FacilitySection />
      <PortfolioPreview />
      <GuideSection />
      <QuoteSection />
      <BottomCTA />
    </main>
  );
}
