import { useState, useEffect } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../app/firebaseApp';

import { useRouter } from 'next/router';

import { parseMdToHtml } from '../utils/parseMdToHtml';

import Error from '../components/elements/Error';
import Loading from '../components/elements/Loading';
import ImageUpload from '../components/widgets/ImageUpload';

import WriteBlogStyles from '../styles/WriteBlog.module.css';

/*
Auth Rule: LogIn Required
    If LoggedIn:
        Show the page
    If not:
        redirect to login


Logics:
Parsing Markdown:
    Saving (uses parsed md: out -> firestore)
    Preview (uses parsed md: out -> render)
Saving: {util: firestore interaction}
    Publish (uses firestore to save data. property status: published)
    Draft (uses firestore to save data. property status: draft)
*/

/*
NOTE: Prototype version just saves the blog to Firebase
TODO: Integrate with Headless-CMS (Contentful)
TODO: Sanitize the HTML from markdown
*/

export default function Blog() {
    const [ user, loading, error ] = useAuthState(auth);
    const router = useRouter();
    const [blog, setBlog] = useState('');
    const [htmlBlog, setHtmlBlog] = useState('');
    const [onEdit, setOnEdit] = useState(true);
    const previewStyle = `
        <style>
            img {
                width: 100%;
            }
        </style>
    `

    useEffect(() => {
        !onEdit && parseMdToHtml(blog).then(parsed => setHtmlBlog(`${parsed}\n${previewStyle}`))
    }, [onEdit])

    if (error) return <Error msg={error} />
    else if (loading) return <Loading />

    else if (user) {
        return (
            <div className={WriteBlogStyles.container}>
                <div className={WriteBlogStyles.innerBox}>
                    <h1>Write Your Tech Blog</h1>
                    <div className={WriteBlogStyles.btnContainer}>
                        <button className={WriteBlogStyles.publish}>Publish</button>
                        <button className={WriteBlogStyles.btn}>Save Draft</button>
                        <button className={WriteBlogStyles.btn} onClick={() => setOnEdit(!onEdit)}>{onEdit ? 'Preview' : 'Edit'}</button>
                    </div>
                    {
                        onEdit ? (
                            <>
                                <ImageUpload />
                                <p><strong style={{textDecoration: "underline"}}>NOTE</strong>: Use Markdown Syntax</p>
                                <textarea
                                    value={blog}
                                    onChange={e => setBlog(e.target.value)}
                                    className={WriteBlogStyles.txtArea}
                                    placeholder="Write your blog here..."
                                    autoFocus
                                />
                            </>
                        ) : (
                            <>
                                <hr />
                                <div style={{width: '50vw', marginBottom: '100px'}}>
                                    <div dangerouslySetInnerHTML={{__html: htmlBlog}} className={WriteBlogStyles.md} />
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        )
    }

    router.push('/login');
    return <h1>Redirecting to login...</h1>
}
