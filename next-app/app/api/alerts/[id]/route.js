import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Alert from '@/models/Alert';

// GET a single alert by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    await dbConnect();
    
    const alert = await Alert.findById(id);
    
    if (!alert) {
      return NextResponse.json(
        { success: false, message: 'Alert not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: alert });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PUT (update) an alert by ID
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    await dbConnect();
    
    const alert = await Alert.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!alert) {
      return NextResponse.json(
        { success: false, message: 'Alert not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: alert });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE an alert by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await dbConnect();
    
    const alert = await Alert.findByIdAndDelete(id);
    
    if (!alert) {
      return NextResponse.json(
        { success: false, message: 'Alert not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}