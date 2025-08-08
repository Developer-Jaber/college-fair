'use client'

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import React, { useEffect } from "react";



export default function AuthGuard ( {children}: {children: React.ReactNode} ) {
    const {status} = useSession()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(()=>{
        if ( status === 'unauthenticated' ) {
            router.push('/register')
        }
    },[status, router,pathname])

    if( status === 'loading' ) {
        return <div>Loading.....</div>
    }

    return status === 'authenticated' ? <>{children}</> : null
}