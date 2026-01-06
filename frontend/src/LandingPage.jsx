import { LandingPageNavbar } from "./components/LandingPageNavbar";
import { FirstPage } from "./Landing Page/FirstPage";
import { Features } from "./Landing Page/Features";
import { Testimonials } from "./Landing Page/Testimonials";
import { Pricing } from "./Landing Page/Pricing";
import { FAQs } from "./Landing Page/FAQs";
import { CTA } from "./Landing Page/CTA";
import { Footer } from "./Landing Page/Footer";
import "./styles/LandingPage.css";

export const LandingPage = () => {
  return (
    <div className="landing-page bg-white">
      <LandingPageNavbar />
      <main>
        <FirstPage />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQs />
        <CTA />
        <Footer />
      </main>
    </div>
  );
};
