export default function TransactionHistory() {
  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm">
      <h2 className="text-lg font-medium mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b last:border-0 border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-gray-50 flex items-center justify-center" />
              <div>
                <div className="h-4 w-24 bg-gray-100 rounded mb-1" />
                <div className="h-3 w-16 bg-gray-50 rounded" />
              </div>
            </div>
            <div className="h-4 w-12 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
