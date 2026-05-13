import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import PortfolioPreview from '@/components/sections/PortfolioPreview';
import Process from '@/components/sections/Process';
import WhyChoose from '@/components/sections/WhyChoose';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <PortfolioPreview />
      <Process />
      <WhyChoose />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
