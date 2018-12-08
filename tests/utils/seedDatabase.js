import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'

const userOne = {
    input: {
        name: 'Jax',
        email: 'jax@example.com',
        password: bcrypt.hashSync('Abcd123$', 10)
    },
    data: undefined,
    jwt: undefined
}

const userTwo = {
    input: {
        name: 'Lux',
        email: 'lux@example.com',
        password: bcrypt.hashSync('abcd1234', 10)
    },
    data: undefined,
    jwt: undefined
}

const postOne = {
    input: {
        title: "My published post",
        body: "...",
        published: true,
    },
    data: undefined
}

const postTwo = {
    input: {
        title: "My draft post",
        body: "...",
        published: false,
    },
    data: undefined
}

const commentOne = {
    input: {
        text: "This is my first comment"
    },
    data: undefined
}

const commentTwo = {
    input: {
        text: "This is my second comment"
    },
    data: undefined
}

const seedDatabase = async () => {
    //Delete test data
    await prisma.mutation.deleteManyComments()
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()

    //Create user one
    userOne.data = await prisma.mutation.createUser({
        data: userOne.input
    })

    userOne.jwt = jwt.sign({ userId: userOne.data.id }, process.env.JWT_SECRET)

    //Create user two
    userTwo.data = await prisma.mutation.createUser({
        data: userTwo.input
    })

    userTwo.jwt = jwt.sign({ userId: userTwo.data.id }, process.env.JWT_SECRET)

    //Create post one
    postOne.data = await prisma.mutation.createPost({
        data: {
            ...postOne.input,
            author: {
                connect: {
                    id: userOne.data.id
                }
            }
        }
    })

    //Create post two
    postTwo.data = await prisma.mutation.createPost({
        data: {
            ...postTwo.input,
            author: {
                connect: {
                    id: userOne.data.id
                }
            }
        }
    })

    //Create comment one
    commentOne.data = await prisma.mutation.createComment({
        data: {
            ...commentOne.input,
            author: {
                connect: {
                    id: userTwo.data.id
                }
            },
            post: {
                connect: {
                    id: postOne.data.id
                }
            }
        }
    })

    //Create comment two
    commentTwo.data = await prisma.mutation.createComment({
        data: {
            ...commentTwo.input,
            author: {
                connect: {
                    id: userOne.data.id
                }
            },
            post: {
                connect: {
                    id: postOne.data.id
                }
            }
        }
    })
}

export { seedDatabase as default, userOne, userTwo, postOne, postTwo, commentOne, commentTwo }