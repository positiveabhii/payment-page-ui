export default function PaymentForm() {
  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm">
      <h2 className="text-lg font-medium mb-4">Payment Details</h2>
      <div className="space-y-4">
        <div className="h-10 bg-gray-50 rounded animate-pulse" />
        <div className="h-10 bg-gray-50 rounded animate-pulse" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 bg-gray-50 rounded animate-pulse" />
          <div className="h-10 bg-gray-50 rounded animate-pulse" />
        </div>
        <div className="h-12 bg-gray-900 rounded-lg mt-6" />
      </div>
    </div>
  );
}
