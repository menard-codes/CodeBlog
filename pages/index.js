import { getBlogs } from '../utils/firestoreOperations';
import BlogSnapshotWidget from '../components/widgets/BlogSnapshot';

import styles from '../styles/Home.module.css';

const extractTitle = htmlStr => {
  // /(<h[1-6]{1}>)|(<\/h[1-6]{1}>)/g
  const hTag = /<h[1-6]{1}>.*<\/h[1-6]{1}>/g;
  const match = htmlStr.match(hTag);
  const hElem = /(<h[1-6]{1}>)|(<\/h[1-6]{1}>)/g;
  const sanitized = match[0].replace(hElem, '')
  console.log(sanitized)
  return sanitized;
}
const extractSnapshot = htmlString => {
  // remove the header
  const hTag = /<h[1-6]{1}>.*<\/h[1-6]{1}>/;
  htmlString = htmlString.replace(hTag, '');
  // TODO: remove html tags, and style tags
  const htmlTags = /<[\w\W]{1,2}>|<\\[\w\W]{1,2}>/g
  htmlString = htmlString.replace(htmlTags, '')
  const styleTag = /<style>[\w\W]+<\/style>/;
  // get first 80 chars
  htmlString = htmlString.replace(styleTag, '');
  htmlString = htmlString.replace(/\n/g, '');
  return htmlString.slice(0, 161);
}

// TODO: Fetch paginated data from firestore
// TODO: AUTHOR IS NOT SHOWN, DO LATER
export default function Home({ blogData }) {
  /*
  data is an array of blog documents (createdAt, html, owner, status) and blog id
  transformations:
    1. summarize data
    2. get author data
  */


  return (
    <div className={styles.container}>
      {/* <Head>
        <title>CodeBlog</title>
        <meta name="description" content="CodeBlog for technical writers" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <div className={styles.blogStreamContainer}>
        <ul style={{listStyle: 'none'}}>
          {
            blogData.map(blogData => {
              // blog details: blog title, blog snapshot, blog id
              const blogDetails = {
                blogTitle: extractTitle(blogData.data.html),
                blogSnapshot: extractSnapshot(blogData.data.html),
                blogId: blogData.id
              }
              return (
                <li key={blogData.id}>
                  <BlogSnapshotWidget blogDetails={blogDetails} />
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

// TODO: use auth, cache the users data
export async function getServerSideProps() {
  const blogData = await getBlogs();
  return {props: {blogData}}
}
