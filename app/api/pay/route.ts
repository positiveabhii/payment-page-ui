import { NextResponse } from 'next/server';

export async function POST() {
  const random = Math.random();
  
  if (random < 0.15) {
    await new Promise(resolve => setTimeout(resolve, 8000));
    return NextResponse.json({ status: 'timeout' }, { status: 408 });
  }
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  if (random < 0.40) { // 15% timeout + 25% failed = 0.40
    return NextResponse.json({ 
      status: 'failed', 
      message: 'Transaction declined by issuer' 
    }, { status: 402 });
  }
  
  return NextResponse.json({ 
    status: 'success',
    transactionId: crypto.randomUUID()
  });
}
