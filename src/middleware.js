import { NextResponse } from 'next/server';

export default function middleware(request) {

    const current_req = request.nextUrl.pathname;
    
    if (typeof window !== 'undefined') {
        const accessToken = localStorage.getItem('token')
        console.log("-----------accessToken------------------",accessToken)
        if (!accessToken) {
            return NextResponse.redirect(new URL(`/login?next=${current_req}`, request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
