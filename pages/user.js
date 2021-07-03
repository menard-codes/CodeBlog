import { useAuthState } from 'react-firebase-hooks/auth';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { auth, storage } from '../app/firebaseApp';

import { useRouter } from 'next/router';

import Error from '../components/elements/Error';
import Loading from '../components/elements/Loading';
import CoverPhoto from '../components/widgets/CoverPhoto';
import Avatar from '../components/widgets/Avatar';
import UserStyles from '../styles/User.module.css';

/*
Auth rules: LogIn required
    if logged in:
    if not:
*/

// TODO: Set security later, maybe in firestore
export default function User() {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    if (error) return <Error msg={error} />
    else if (loading) return <Loading />

    else if (user) {
        return (
            <>
            <CoverPhoto url="/cover.jpg" />
            <div>
                <div className={UserStyles.userInfo}>
                    <Avatar url={user.photoURL} />
                    <h1>{user.displayName}</h1>
                    <p className={UserStyles.mutedText}>{user.email}</p>
                </div>
            </div>
            </>
        )
    }

    router.push('/login');
    return (
        <div>
            <h1>Forbidden</h1>
        </div>
    )
}
