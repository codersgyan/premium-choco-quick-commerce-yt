import { withAuth } from 'next-auth/middleware';

export default withAuth({
    callbacks: {
        authorized: ({ token, req }) => {
            console.log('token', token);

            if (req.nextUrl.pathname.startsWith('/admin')) {
                return token?.role === 'admin';
            } else if (req.nextUrl.pathname.startsWith('/account')) {
                return token?.role === 'customer';
            } else {
                return false;
            }
        },
    },
});

export const config = {
    matcher: ['/admin(/.*)?', '/account(/.*)?'],
};
