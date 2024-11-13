// src/components/FeaturesSection.jsx
import React from 'react';
import { DollarSign, Shield, Clock } from 'lucide-react';
import '../../../src/LoanLandingPage.css';

const features = [
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Quick Loans",
    description: "Get approved within minutes with our streamlined process"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure Process",
    description: "Your data is protected with bank-level security"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "24/7 Service",
    description: "Apply anytime, anywhere with our online platform"
  }
];

const FeaturesSection = () => (
  <section className="features">
    {features.map((feature, index) => (
      <div key={index} className="features-item">
        <div className="icon">{feature.icon}</div>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
    ))}
  </section>
);

export default FeaturesSection;
