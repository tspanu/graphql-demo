import uuidv4 from 'uuid'

const Mutation = {
    createUser(parent, args, { prisma }, info) {
        return prisma.mutation.createUser({ data: args.data }, info)
    },
    deleteUser(parent, args, { prisma }, info) {
        return prisma.mutation.deleteUser({ where: { id: args.id } }, info)
    },
    updateUser(parent, { id, data }, { prisma }, info) {
        return prisma.mutation.updateUser({
            where: {
                id: id
            },
            data
        }, info)
    },
    createPost(parent, { data: { title, body, published, author } }, { prisma }, info) {
        return prisma.mutation.createPost({
            data: {
                title,
                body,
                published,
                author: {
                    connect: {
                        id: author
                    }
                }

            }
        }, info)
    },
    deletePost(parent, args, { prisma }, info) {
        return prisma.mutation.deletePost({ where: { id: args.id } }, info)
    },
    updatePost(parent, { id, data }, { prisma }, info) {
        return prisma.mutation.updatePost({
            where: {
                id
            },
            data
        }, info)
    },
    createComment(parent, { data }, { prisma }, info) {
        return prisma.mutation.createComment({
            data: {
                text: data.text,
                post: {
                    connect: {
                        id: data.post
                    }
                },
                author: {
                    connect: {
                        id: data.author
                    }
                }
            }
        }, info)
    },
    deleteComment(parent, args, { prisma }, info) {
        return prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        }, info)
    },
    updateComment(parent, { id, data }, { prisma }, info) {
        return prisma.mutation.updateComment({
            where: {
                id
            },
            data
        }, info)
    }
}

export { Mutation as default }