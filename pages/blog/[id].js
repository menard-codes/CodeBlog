import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../app/firebaseApp';

import Error from '../../components/elements/Error';
import Loading from '../../components/elements/Loading';

import { useRouter } from 'next/router';

/*
Auth Rule: Role Based
    If LoggedIn:
        Author:
            (post related)
            -edit/update/delete the post
            -react(like, heart, dislike)
            -tweet

            (comment related)
            -comment
            -edit/update/delete own comment
            -react to own comment
        Reader:
            -react(like, heart, dislike)
            -tweet

            (comment related)
            -comment
            -edit/update/delete own comment
            -react to own comment
    If not:
        Anonymous:
            read only
*/

export default function Blog({ id, name }) {
    const [ user, loading, error ] = useAuthState(auth)
    const router = useRouter()

    if (error) return <Error msg={error} />
    else if (loading) return <Loading />

    else if (user) {
        // TODO: Further check if uid === blog id. True: Author, False: Reader
        return (
            <div>
                <h1>Title: {name}</h1>
                <p>ID: {id}</p>
                <h2>Logged In</h2>
            </div>
        )
    }

    return (
        <div>
            <h1>Title: {name}</h1>
            <p>ID: {id}</p>
            <h2>Anonymous</h2>
        </div>
    )
}

export async function getStaticPaths() {
    // mock paths
    const nums = [1, 2, 3, 4];
    return {paths: nums.map(num => ({params: {id: `${num}`}})), fallback: false}
}

export async function getStaticProps({ params }) {
    // mock props
    return {props: {id: params.id, name: `Next.js ${params.id}`}}
}
