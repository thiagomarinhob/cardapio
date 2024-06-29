import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req) {
  const token = req.cookies.get('token')?.value;
  console.log("🚀 ~ middleware ~ token:", token)

  if (token) {
    try {
      const decoded = jwt.verify(token, '25thiago99');
      console.log("🚀 ~ middleware ~ decoded:", decoded)
      req.user = decoded;
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL('/auth', req.url));
    }
  } else {
    return NextResponse.redirect(new URL('/auth', req.url));
  }
}

export const config = {
  matcher: ['/', '/profile'],
};
