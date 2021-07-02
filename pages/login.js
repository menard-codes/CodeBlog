import Head from 'next/head';
import { useRouter } from 'next/router';

import { useAuthState } from 'react-firebase-hooks/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth, firebase } from '../app/firebaseApp';
import { uiConfig } from '../config/firebaseAuthConfig';

import Logo from '../components/elements/Logo';
import Card from '../components/elements/Card';
import Error from '../components/elements/Error';
import Loading from '../components/elements/Loading';

import LoginStyle from '../styles/Login.module.css';


/*
Auth Rule: Show if not logged in
    If logged in:
        -redirect to Home page
    If not logged in:
        -show page
*/

export default function Login() {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    if (loading) return <Loading />
    else if (error) return <Error msg={error} />

    else if (user) {
        // redirect to home page
        router.push('/');
    }

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
