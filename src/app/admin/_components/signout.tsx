'use client';
import { signOut } from 'next-auth/react';
import React from 'react';

const Signout = ({ children }: { children: React.ReactNode }) => {
    return <button onClick={() => signOut()}>{children}</button>;
};

export default Signout;
