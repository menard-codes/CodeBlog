import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import BlogSnapshotStyles from './BlogSnapshot.module.css';


function Author({ avatarUrl, name, email }) {
    return (
        <div className={BlogSnapshotStyles.authorComp}>
            <Image src={avatarUrl} alt="User Photo" width="70" height="70" className={BlogSnapshotStyles.avatar} />
            <div className={BlogSnapshotStyles.authorDetails}>
                <h3 className={BlogSnapshotStyles.authorName}>{name}</h3>
                <address>{email}</address>
            </div>
        </div>
    )
}

function BlogSnapshot({ blogTitle, blogSnapshot, blogId }) {
    return (
        <div className={BlogSnapshotStyles.blogComp}>
            <h2>{blogTitle}</h2>
            <p>{blogSnapshot}</p>
            <Link href={`/blog/${blogId}`}>
                <a>Read More...</a>
            </Link>
        </div>
    )
}

function BlogSnapshotWidget({ authorDetails, blogDetails }) {
    // const { avatarUrl, uname, email } = authorDetails;
    const { blogTitle, blogSnapshot, blogId } = blogDetails;
    return (
        <div className={BlogSnapshotStyles.blogSnapshotWidget}>
            {/* <Author avatarUrl={avatarUrl} name={uname} email={email} /> */}
            <BlogSnapshot blogTitle={blogTitle} blogSnapshot={blogSnapshot} blogId={blogId} />
        </div>
    )
}

export default BlogSnapshotWidget;
