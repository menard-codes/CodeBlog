import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

export async function parseMdToHtml(md) {
    const matterRes = matter(md);
    const processed = await remark().use(html).process(matterRes.content);
    const contentHtml = processed.toString();
    return contentHtml
}
