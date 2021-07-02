import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../app/firebaseApp';

import Error from '../../components/elements/Error';
import Loading from '../../components/elements/Loading';

/*
Auth rules: LogIn required
    if logged in:
        -uid === accountPageId: True: show account details, False: forbidden
    if not:
        -forbidden
*/

export default function User({ id, name }) {
    const [user, loading, error] = useAuthState(auth);

    if (error) return <Error msg={error} />
    else if (loading) return <Loading />

    if (user && user.uid === id) {
        return (
            <div>
                <h1>Name: {name}</h1>
                <p>ID: {id}</p>
            </div>
        )
    } else {
        return <h1>Forbidden</h1>
    }
}

export async function getStaticPaths() {
    // mock paths
    const nums = [1, 2, 3, 4, '5sNYVEk5NNarLLxbOPfbFryZJvs1'];
    return {paths: nums.map(num => ({params: {id: `${num}`}})), fallback: false}
}

export async function getStaticProps({ params }) {
    // mock props
    return {props: {id: params.id, name: `Nard ${params.id}`}}
}
