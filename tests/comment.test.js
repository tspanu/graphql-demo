import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { userOne, postOne, postTwo, commentOne, commentTwo } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { deleteComment } from './utils/commentOperations';

const client = getClient()

beforeEach(seedDatabase)

test('Should delete own comment', async() => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: commentTwo.data.id
    }

    await client.mutate({
        mutation: deleteComment,
        variables
    })

    const commentExists = await prisma.exists.Comment({ id: commentTwo.data.id })

    expect(commentExists).toBe(false)
})

test('Should not delete other users comment', async() => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: commentOne.data.id
    }

    await expect(
        client.mutate({ mutation: deleteComment, variables })
    ).rejects.toThrow()
})