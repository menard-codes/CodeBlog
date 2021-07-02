import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../app/firebaseApp';

import Error from '../components/elements/Error';
import Loading from '../components/elements/Loading';

import { useRouter } from 'next/router';

/*
Auth Rule: LogIn Required
    If LoggedIn:
        Show the page
    If not:
        redirect to login
*/

/*
NOTE: Prototype version just saves the blog to Firebase
TODO: Integrate with Headless-CMS (Contentful)
*/

export default function Blog() {
    const [ user, loading, error ] = useAuthState(auth)
    const router = useRouter()

    if (error) return <Error msg={error} />
    else if (loading) return <Loading />

    else if (user) {
        return (
            <div>
                <h1>Write Blog Page</h1>
            </div>
        )
    }

    router.push('/login');
    return <h1>Redirecting to login...</h1>
}
