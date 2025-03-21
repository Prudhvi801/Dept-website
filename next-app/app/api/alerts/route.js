import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Alert from '../../../models/Alert';

// GET all alerts
export async function GET() {
  try {
    await dbConnect();
    const alerts = await Alert.find({}).sort({ date: -1 }); // Sort by date, newest first
    
    return NextResponse.json({ success: true, data: alerts });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST (create) a new alert
export async function POST(request) {
  try {
    const body = await request.json();
    
    await dbConnect();
    
    const alert = await Alert.create(body);
    
    return NextResponse.json(
      { success: true, data: alert },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}