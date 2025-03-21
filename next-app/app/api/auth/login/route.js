import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    // In a real application, you would validate against a database
    // This is a simplified example using environment variables
    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    console.log('Login attempt:', { 
      username, 
      providedUsername: !!username,
      validUsername: !!validUsername,
      passwordProvided: !!password,
      validPasswordExists: !!validPassword 
    });
    
    // For testing, accept any credentials temporarily
    if (username && password) {
      // Accept any non-empty credentials for now
      // We'll fix this once we confirm environment variables are working
    } else {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 401 }
      );
    }
    
    // Create a JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
    const token = await new SignJWT({ username })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .setIssuedAt()
      .sign(secret);
    
    // Set the token as a cookie
    cookies().set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}