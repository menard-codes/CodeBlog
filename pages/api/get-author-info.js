import { admin } from '../../app/firebaseAdmin';


// TODO: Implement Auth later
export default function getAuthorInfo(req, res) {
    const body = JSON.parse(req.body)
    const author = body.owner;
    admin.auth().getUser(author).then(author => res.json({
        avatarUrl: author.photoURL,
        name: author.displayName,
        email: author.email
    }))
}
