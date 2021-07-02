import React from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Logo from '../elements/Logo';
import { auth } from '../../app/firebaseApp';

import NavbarStyles from './Navbar.module.css';

/*
Navbar consists of:
    Brand
    *write blog
    SignIn/SignOut btn
    profile pic
*/

function Navbar() {
    const [user] = useAuthState(auth);
    const router = useRouter();

    return (
        <nav className={NavbarStyles.navbar}>
            <div className={NavbarStyles.leftContainer}>
                {/* <button className={NavbarStyles.hamburger} onClick={() => setExpand(!expand)} >
                    <div className={NavbarStyles.rectangle}></div>
                    <div className={NavbarStyles.rectangle}></div>
                    <div className={NavbarStyles.rectangle}></div>
                </button> */}
                <Link href="/">
                    <a>
                        <Logo />
                    </a>
                </Link>
                {user
                    ? (
                        <Link href="/write-blog">
                            <a>Write Blog</a>
                        </Link>
                    )
                    : (
                        <Link href="/login">
                            <a>Log In</a>
                        </Link>
                    )}
            </div>
            <div className={NavbarStyles.rightContainer}>
                {user && (
                    <>
                        <button className={NavbarStyles.signOutBtn} onClick={() => auth.signOut()}>Sign Out</button>
                        <Link href={`/user/${user.uid}`}>
                            <a className={NavbarStyles.avatarContainer}>
                                <Image
                                    src={user.photoURL}
                                    alt="user profile"
                                    width={50}
                                    height={50}
                                    className={NavbarStyles.avatar}
                                />
                            </a>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar
