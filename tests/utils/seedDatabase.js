import bcrypt from 'bcrypt'
import prisma from '../../src/prisma'

const seedDatabase = async () => {
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()
    const user = await prisma.mutation.createUser({
        data: {
            name: 'Jax',
            email: 'jax@example.com',
            password: bcrypt.hashSync('Abcd123$', 10)
        }
    })
    await prisma.mutation.createPost({
        data: {
            title: "My published post",
            body: "...",
            published: true,
            author: {
                connect: {
                    id: user.id
                }
            }
        }
    })

    await prisma.mutation.createPost({
        data: {
            title: "My draft post",
            body: "The cheesiest",
            published: false,
            author: {
                connect: {
                    id: user.id
                }
            }
        }
    })
}

export { seedDatabase as default }