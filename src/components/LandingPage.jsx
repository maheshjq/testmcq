import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import Philosophy from './Philosophy';
import HowItWorks from './HowItWorks';
import Pricing from './Pricing';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <HowItWorks />
      <Pricing />
      <Footer />
    </div>
  );
}
