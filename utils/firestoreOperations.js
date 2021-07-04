import { firebase, firestore } from '../app/firebaseApp';


// takes a data and save to firestore. returns the outcome
export async function saveBlogToFirestore(blogData) {
    const blogsRef = firestore.collection('blogs')
    try {
        const docRef = await blogsRef.add({...blogData, timestamp: firebase.firestore.FieldValue.serverTimestamp()});
        const { id } = docRef;
        return {id};
    } catch (error) {
        return {error}
    }
}
export async function retrieveBlogFromFirestore(blogId) {
    const blogsRef = firestore.collection('blogs');
    try {
        const docRef = blogsRef.doc(blogId);
        const document = await docRef.get();
        const data = document;
        if (document.exists) {
            return data.data();
        } else {
            return {code: 404}
        }
    } catch (error) {
        return {error}
    }
}

export async function getBlogs() {
    const blogs = [];
    const docRef = await firestore.collection('blogs').get();
    docRef.forEach(blog => {
        const data = blog.data();
        data.createdAt = Date(data.createdAt);
        blogs.push({
            id: blog.id,
            data
        })
    })
    return blogs
}
