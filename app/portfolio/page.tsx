import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import FinalCTA from '@/components/sections/FinalCTA';
import PortfolioGrid from '@/components/PortfolioGrid';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Selected patent illustration samples across mechanical, medical, electronics, consumer products, and software figures.',
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title={
          <>
            Selected figure work,
            <br />
            <span className="text-ink-muted">filtered by category.</span>
          </>
        }
        description="A representative cross section of drawings prepared for utility, design, and software applications. Identifying information is redacted on confidential work."
      />

      <PortfolioGrid />

      <FinalCTA />
    </>
  );
}
