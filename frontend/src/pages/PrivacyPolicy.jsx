import React, { useEffect } from "react";
import AOS from "aos";

const PrivacyPolicy = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="bg-gradient-to-br from-white via-gray-50 to-gray-100 py-16 px-6 md:px-10 min-h-screen">
      <div className="max-w-4xl mx-auto text-gray-800" data-aos="fade-up">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-700">
          Privacy Policy
        </h1>

        <p className="mb-6 leading-relaxed text-lg">
          At <strong>Afshan Store</strong>, we value your privacy. This policy outlines how we collect and protect your personal data while providing an enjoyable shopping experience.
        </p>

        {[
          {
            title: "1. Information We Collect",
            content: (
              <>
                <p className="mb-4">We collect information when you:</p>
                <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">
                  <li>Create an account</li>
                  <li>Place an order</li>
                  <li>Subscribe to newsletters</li>
                  <li>Leave reviews or contact support</li>
                </ul>
                <p>This includes your name, email, address, phone number, and payment details (processed securely).</p>
              </>
            ),
          },
          {
            title: "2. How We Use Your Information",
            content: (
              <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">
                <li>To fulfill and manage your orders</li>
                <li>To respond to your inquiries</li>
                <li>To personalize your experience</li>
                <li>To send updates and promotional content (if subscribed)</li>
              </ul>
            ),
          },
          {
            title: "3. Sharing Your Data",
            content: (
              <>
                <p className="mb-2">We only share data with:</p>
                <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">
                  <li>Trusted payment gateways (e.g., Stripe)</li>
                  <li>Shipping providers</li>
                  <li>Email platforms (for newsletter distribution)</li>
                </ul>
              </>
            ),
          },
          {
            title: "4. Data Security",
            content: <p className="mb-4">We use secure servers, encryption, and access control. While we aim for top security, no method is 100% safe.</p>,
          },
          {
            title: "5. Your Rights",
            content: <p className="mb-4">You can request access, edit, or delete your data anytime via your account or by contacting support.</p>,
          },
          {
            title: "6. Cookies",
            content: <p className="mb-4">We use cookies to optimize your shopping experience. You can manage them via browser settings.</p>,
          },
          {
            title: "7. Changes to This Policy",
            content: <p className="mb-4">We may update this policy as needed. You’ll find any changes reflected on this page.</p>,
          },
          {
            title: "8. Contact Us",
            content: (
              <p className="mb-4">
                For any privacy-related concerns:
                <br />
                📧 <strong>Email:</strong> support@afshanstore.com
                <br />
                📞 <strong>Phone:</strong> +92 300 4556654
              </p>
            ),
          },
        ].map((section, idx) => (
          <div key={idx} data-aos="fade-up" className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">{section.title}</h2>
            {section.content}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PrivacyPolicy;
