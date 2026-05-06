import PaymentForm from '../components/PaymentForm';
import CardPreview from '../components/CardPreview';
import PaymentStatus from '../components/PaymentStatus';
import TransactionHistory from '../components/TransactionHistory';

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] selection:bg-brand-primary/10">
      <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-[60%] space-y-8">
            <header className="space-y-2">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Checkout</h1>
              <p className="text-slate-500 text-sm">Complete your payment securely with our encrypted gateway.</p>
            </header>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative">
                <PaymentForm />
              </div>
            </div>

            <PaymentStatus />
          </div>

          <div className="w-full lg:w-[40%] space-y-8 lg:sticky lg:top-8">
            <div className="space-y-6">
              <section className="space-y-4">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Card Preview</h3>
                <CardPreview />
              </section>

              <section className="space-y-4">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Recent Activity</h3>
                <TransactionHistory />
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
