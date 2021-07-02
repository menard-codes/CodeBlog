import Head from 'next/head';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth, firebase } from '../app/firebaseApp';
import { uiConfig } from '../config/firebaseAuthConfig';

import Logo from '../components/elements/Logo';
import Card from '../components/elements/Card';

import LoginStyle from '../styles/Login.module.css';


export default function Login() {
    const authConfig = uiConfig(firebase);

    return (
        <>
            <Head>
                <title>CodeBlog | LogIn</title>
            </Head>
            <div className={LoginStyle.login}>
                <Card>
                    <div className={LoginStyle.loginTitleContainer}>
                        <h1>Log In to</h1>
                        <Logo />
                    </div>
                    <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={auth} />
                </Card>
            </div>
        </>
    )
}
