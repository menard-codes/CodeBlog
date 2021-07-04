import { firestore } from '../../app/firebaseApp';

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

export default function Blog(props) {
    if (props.data) {
        return (
            <div style={{display: "grid", placeItems: "center", fontSize: "1.5rem"}}>
                <div style={{width: '50vw', marginTop: '30px'}} dangerouslySetInnerHTML={{__html: props.data.html}}></div>
            </div>
        )
    } else if (props.error === 404) {
        return <h1>Not Found</h1>
    }
    return <h1>Error</h1>
}

export async function getStaticPaths() {
    // TODO: make efficient querying, since the foreach just gets id

    // get list of ids
    const collectionRef = firestore.collection('blogs');
    const docsSnapshot = await collectionRef.get();
    const paths = [];
    docsSnapshot.forEach(blog => {
        paths.push({
            params: {id: blog.id}
        })
    })
    return {paths, fallback: false}
}

export async function getStaticProps({ params }) {
    // get blog id
    // retrieve blog
    const docRef = firestore.collection('blogs').doc(params.id)
    const blog = await docRef.get();
    if (blog.exists) {
        const data = blog.data()
        data.createdAt = Date(data.createdAt)
        return {
            props: { data }
        }
    }
    return {props: {error: 404}}
}
