import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ComplianceHero from '@/components/compliance/ComplianceHero';
import CountrySelector from '@/components/compliance/CountrySelector';
import RegulationOverview from '@/components/compliance/RegulationOverview';
import ChecklistGenerator from '@/components/compliance/ChecklistGenerator';

export default async function CompliancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div style={{ background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <ComplianceHero locale={locale} />
        <CountrySelector />
        <RegulationOverview />
        <ChecklistGenerator locale={locale} />
      </main>
      <Footer />
    </div>
  );
}
