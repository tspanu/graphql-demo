const Query = {
    users(parent, args, { db }, info) {
        return args.query ? db.users.filter((user) => user.name.toLowerCase().includes(args.query.toLowerCase())) : db.users
    },
    posts(parent, args, { db }, info) {
        return args.query ? db.posts.filter((post) => (post.title.toLowerCase() || post.body.toLowerCase()).includes(args.query.toLowerCase())) : db.posts
    },
    comments(parent, args, { db }, info) {
        return args.query ? db.comments.filter((comment) => comment.text.toLowerCase().includes(args.query.toLowerCase())) : db.comments
    }
}

export { Query as default }