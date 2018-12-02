import { Prisma } from 'prisma-binding'
import { extendResolversFromInterfaces } from 'graphql-tools';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})


const createPostForUser = async (authorId, data) => {
    const userExists = await prisma.exists.User({ id: authorId })

    if (!userExists) {
        throw new Error('User not found')
    }

    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ author { id name email posts { id title published } } }')

    return post.author
}

const updatePostForUser = async (postId, data) => {
    const postExists = await prisma.exists.Post({ id: postId })

    if (!postExists) {
        throw new Error('Post not found')
    }

    const post = await prisma.mutation.updatePost({
        where: {
            id: postId
        },
        data: {
            ...data
        }
    }, '{ author { id name email posts { id title published } } }')

    return post.author
}

updatePostForUser('cjp565dxe002g0a53zn34rnuw', {
    title: "Being hungover sucks",
    body: "I don't want to clean my closet.",
    published: false
}).then ((user) => {
    console.log(JSON.stringify(user, undefined, 2))
}).catch((error) => {
    console.log(error.message)
})



// createPostForUser("cjp52d7ue000v0a53gj0zedcy", {
//     title: "Girls can be complicated",
//     body: "You just have to roll with the punches",
//     published: true
// }).then ((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//     console.log(error.message)
// })
