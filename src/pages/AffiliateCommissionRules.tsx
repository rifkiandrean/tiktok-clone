import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PullToRefresh from '../components/PullToRefresh';

export default function AffiliateCommissionRules() {
  const navigate = useNavigate();

  const handleRefresh = async () => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-white font-sans text-slate-900">
        {/* Header */}
        <header className="sticky top-0 bg-white z-10 flex items-center px-4 py-3 border-b border-gray-100">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 mr-4">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold">Affiliate commission rules</h1>
        </header>

        <div className="px-4 py-6">
          <h2 className="text-xl font-bold mb-6">Affiliate commission rules</h2>

          <div className="space-y-6">
            <section>
              <h3 className="font-bold text-base mb-2">1. How does the affiliate program work?</h3>
              <p className="text-sm text-gray-800 leading-relaxed">
                You can add affiliate products to your TikTok Product Showcase and earn commissions on qualifying purchases. Different products have different commission rates.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">2. How do I access the affiliate program?</h3>
              <p className="text-sm text-gray-800 leading-relaxed">
                The affiliate program is available for all creators. To access the affiliate program, you need to verify your name and make sure it matches the name on your beneficiary account. Your name can't be changed after it is submitted for verification. If the information is inaccurate, the withdrawal can't be processed and you won't receive your commissions.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">3. How do I receive commissions?</h3>
              <p className="text-sm text-gray-800 leading-relaxed">
                You'll earn commissions from qualifying purchases of affiliate items. Your commission is calculated using this formula: Commission = (Revenue - Refunds) x Commission rate.<br />
                After a customer purchases one of your affiliate items, we'll show an estimated commission. This estimated commission is not final. After an order is delivered, customers have 6 days to decide if they'll keep or return the item. Your final commission is calculated based on the actual revenue.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-2">4. When will I receive the commission?</h3>
              <p className="text-sm text-gray-800 leading-relaxed">
                You will receive a commission on the 7th day after the order become delivered.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PullToRefresh>
  );
}
