import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token'); 

    const { pathname } = request.nextUrl;

    if (pathname === '/') {
        const url = request.nextUrl.clone();
        url.pathname = '/service';
        return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/service') && !token) {
        const url = request.nextUrl.clone();
        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/auth/login') && token) {
        const url = request.nextUrl.clone();
        url.pathname = '/service';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}
