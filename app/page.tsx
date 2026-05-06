import PaymentForm from '../components/PaymentForm';
import CardPreview from '../components/CardPreview';
import PaymentStatus from '../components/PaymentStatus';
import TransactionHistory from '../components/TransactionHistory';

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-12">
          <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
        </div>

        <div className="md:col-span-7 space-y-6">
          <PaymentForm />
          <PaymentStatus />
        </div>

        <div className="md:col-span-5 space-y-6">
          <CardPreview />
          <TransactionHistory />
        </div>
      </div>
    </main>
  );
}
