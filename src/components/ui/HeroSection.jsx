// src/components/HeroSection.jsx
import React from 'react';
import { ChevronRight } from 'lucide-react';
import Button from '../ui/button';
import '../../../src/LoanLandingPage.css';
const HeroSection = () => (
  <section className="hero">
    <h1>Quick and Easy Loan Applications</h1>
    <p>Get the financial support you need with our hassle-free online loan application process.</p>
    <div className="buttons">
      <Button size="lg" className="apply-button">
        Apply Now
        <ChevronRight />
      </Button>
      <Button size="lg" variant="outline">
        Learn More
      </Button>
    </div>
  </section>
);

export default HeroSection;
