export default function CardPreview() {
  return (
    <div className="p-6 border rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg aspect-[1.586/1] flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="w-12 h-8 bg-gray-700/50 rounded" />
        <div className="text-sm font-medium opacity-80 italic">VISA</div>
      </div>
      <div>
        <div className="text-xl tracking-widest mb-4">•••• •••• •••• ••••</div>
        <div className="flex justify-between items-end">
          <div>
            <div className="text-[10px] uppercase opacity-60 mb-1">Card Holder</div>
            <div className="text-sm font-medium uppercase tracking-wider">Your Name</div>
          </div>
          <div>
            <div className="text-[10px] uppercase opacity-60 mb-1">Expires</div>
            <div className="text-sm font-medium tracking-wider">MM/YY</div>
          </div>
        </div>
      </div>
    </div>
  );
}
