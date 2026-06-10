import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // Check against the environment variable
    const adminPass = process.env.ADMIN_PASS || process.env.admin_pass;
    
    if (!adminPass) {
      console.error("ADMIN_PASS is not set in environment variables");
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 });
    }

    if (password === adminPass) {
      // Set an HTTP-only cookie
      const cookieStore = await cookies();
      // For a real production app we would encrypt this. For now, a secure cookie flag is enough.
      cookieStore.set('admin_auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
  }
}
