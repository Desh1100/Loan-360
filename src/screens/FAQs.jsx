import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';

const FAQs = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  
  const colors = {
    primary: '#015b59',
    secondary: '#005a76',
    accent: '#ff7300',
    background: '#e9f8fb',
    text: '#333333',
    white: '#ffffff',
  };

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I apply for a loan on Loan360?",
          answer: "Simply create an account, fill out our 3-part application form (Personal Details, Family & Education, Financial Information), and submit. Our AI system will instantly provide an eligibility assessment."
        },
        {
          question: "How long does it take to get approved?",
          answer: "You'll receive an instant AI-powered eligibility assessment immediately after submitting your application. Final approval from our team typically takes 24-48 hours."
        },
        {
          question: "What documents do I need to apply?",
          answer: "You'll need a valid National Identity Card (NIC), proof of income, and basic personal information. No guarantor or extensive documentation is required initially."
        }
      ]
    },
    {
      category: "Eligibility",
      questions: [
        {
          question: "Who is eligible to apply for a loan?",
          answer: "You must be between 22-60 years old, a Sri Lankan citizen with a valid NIC, have a stable income source, and reside anywhere in Sri Lanka."
        },
        {
          question: "What is the minimum and maximum loan amount?",
          answer: "Loan amounts vary based on your financial profile, income, and credit score. Our AI system will recommend the optimal loan amount for your situation."
        },
        {
          question: "Does my credit score affect my application?",
          answer: "Yes, your CIBIL score is one of many factors our AI considers. However, we look at your complete financial picture, not just your credit score."
        },
        {
          question: "Can self-employed individuals apply?",
          answer: "Absolutely! Self-employed individuals with stable income are welcome to apply. You'll need to provide proof of your business income."
        }
      ]
    },
    {
      category: "Application Process",
      questions: [
        {
          question: "How does the AI eligibility check work?",
          answer: "Our advanced Machine Learning model analyzes over 20 factors including your income, assets, credit history, employment, and dependents to predict your loan approval probability and provide personalized recommendations."
        },
        {
          question: "Can I save my application and complete it later?",
          answer: "Yes! You can save your progress at any stage and return to complete your application when convenient."
        },
        {
          question: "What happens after I submit my application?",
          answer: "After submission, our team reviews your application, verifies the information, and may request additional documents if needed. You'll be notified of the decision within 24-48 hours."
        },
        {
          question: "Can I edit my application after submission?",
          answer: "Once submitted, you cannot directly edit your application. However, you can contact our support team if you need to update any information."
        }
      ]
    },
    {
      category: "Loan Terms",
      questions: [
        {
          question: "What are the interest rates?",
          answer: "Interest rates are personalized based on your credit profile, loan amount, and term. You'll see the exact rate during your application process."
        },
        {
          question: "What loan terms are available?",
          answer: "We offer flexible repayment terms typically ranging from 12 to 60 months, depending on the loan amount and your financial situation."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No! Loan360 is completely transparent. All fees, charges, and interest rates are clearly displayed before you finalize your application."
        },
        {
          question: "Can I repay my loan early?",
          answer: "Yes, early repayment is allowed. Some loan products may have prepayment conditions, which will be clearly stated in your loan agreement."
        }
      ]
    },
    {
      category: "Disbursement & Repayment",
      questions: [
        {
          question: "How will I receive the loan amount?",
          answer: "Once approved, the loan amount is transferred directly to your registered bank account within 1-2 business days."
        },
        {
          question: "How do I repay my loan?",
          answer: "Repayments can be made through bank transfer, online payment, or direct debit from your bank account. You'll receive detailed payment instructions upon approval."
        },
        {
          question: "What happens if I miss a payment?",
          answer: "We understand that circumstances can change. Contact us immediately if you anticipate difficulty making a payment. Late payments may incur additional fees and affect your credit score."
        },
        {
          question: "Can I view my repayment schedule?",
          answer: "Yes! Once your loan is approved, you can view your complete repayment schedule, including due dates and amounts, in your account dashboard."
        }
      ]
    },
    {
      category: "Security & Privacy",
      questions: [
        {
          question: "Is my personal information safe?",
          answer: "Absolutely. We use bank-level encryption and security measures to protect your data. Your information is never shared with third parties without your consent."
        },
        {
          question: "How is my data used?",
          answer: "Your data is used solely for loan assessment and processing. Our AI models are trained on anonymized data and comply with all data protection regulations."
        },
        {
          question: "Can I delete my account?",
          answer: "Yes, you can request account deletion at any time. However, we're required to retain certain records for regulatory purposes even after account deletion."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What browsers are supported?",
          answer: "Loan360 works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience."
        },
        {
          question: "Is there a mobile app?",
          answer: "Currently, Loan360 is a web-based platform optimized for both desktop and mobile browsers. A dedicated mobile app is coming soon!"
        },
        {
          question: "Who do I contact for support?",
          answer: "You can reach our support team at support@loan360.lk or call 117750300. We're available Monday-Sunday, 8:30 AM to 5:30 PM."
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh', paddingTop: '80px' }}>
      <Header />
      
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            {/* Back Button */}
            <button 
              onClick={() => navigate('/')}
              className="btn btn-outline-primary mb-4"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <i className="fas fa-arrow-left me-2"></i>
              Back to Home
            </button>

            {/* Hero Section */}
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold mb-3" style={{ color: colors.primary }}>
                Frequently Asked Questions
              </h1>
              <p className="lead" style={{ color: colors.text }}>
                Find answers to common questions about Loan360
              </p>
            </div>

            {/* Search Box */}
            <div className="card border-0 shadow-sm mb-5">
              <div className="card-body p-4">
                <div className="input-group input-group-lg">
                  <span className="input-group-text" style={{ backgroundColor: colors.white, borderColor: colors.primary }}>
                    <i className="fas fa-search" style={{ color: colors.primary }}></i>
                  </span>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search for answers..."
                    style={{ borderColor: colors.primary }}
                  />
                </div>
              </div>
            </div>

            {/* FAQ Categories */}
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-4">
                <div className="card border-0 shadow-lg">
                  <div className="card-header" style={{ backgroundColor: colors.primary, color: colors.white, padding: '1.25rem' }}>
                    <h3 className="mb-0 h5">
                      <i className="fas fa-folder-open me-2"></i>
                      {category.category}
                    </h3>
                  </div>
                  <div className="card-body p-0">
                    {category.questions.map((faq, questionIndex) => {
                      const isActive = activeIndex === `${categoryIndex}-${questionIndex}`;
                      return (
                        <div key={questionIndex} style={{ borderBottom: '1px solid #e0e0e0' }}>
                          <button
                            className="btn btn-link text-start w-100 p-4 text-decoration-none"
                            onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                            style={{ 
                              color: colors.text,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <span style={{ fontWeight: '500', fontSize: '1.05rem' }}>
                              {faq.question}
                            </span>
                            <i 
                              className={`fas fa-chevron-${isActive ? 'up' : 'down'}`}
                              style={{ color: colors.accent }}
                            ></i>
                          </button>
                          {isActive && (
                            <div className="px-4 pb-4" style={{ 
                              backgroundColor: colors.background,
                              animation: 'fadeIn 0.3s ease-in'
                            }}>
                              <p style={{ 
                                fontSize: '1rem', 
                                lineHeight: '1.7',
                                color: colors.text,
                                marginBottom: 0
                              }}>
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Still Have Questions Section */}
            <div className="card border-0 shadow-lg mt-5">
              <div className="card-body p-5 text-center">
                <h3 className="mb-4" style={{ color: colors.primary }}>
                  Still Have Questions?
                </h3>
                <p className="mb-4" style={{ fontSize: '1.1rem', color: colors.text }}>
                  Our support team is here to help! Get in touch with us and we'll respond as soon as possible.
                </p>
                <div className="d-flex flex-wrap gap-3 justify-content-center">
                  <button 
                    onClick={() => navigate('/contact')}
                    className="btn btn-lg px-5 py-3 fw-bold"
                    style={{ 
                      backgroundColor: colors.accent,
                      borderColor: colors.accent,
                      color: colors.white
                    }}
                  >
                    <i className="fas fa-envelope me-2"></i>
                    Contact Support
                  </button>
                  <a 
                    href="tel:117750300"
                    className="btn btn-lg btn-outline-primary px-5 py-3 fw-bold"
                    style={{ 
                      borderColor: colors.primary,
                      color: colors.primary
                    }}
                  >
                    <i className="fas fa-phone me-2"></i>
                    Call: 117750300
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default FAQs;
