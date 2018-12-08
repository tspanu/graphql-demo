import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { userOne, postOne, postTwo } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { getPosts, myPosts, updatePost, createPost, deletePost } from './utils/postOperations'

const client = getClient()

beforeEach(seedDatabase)

test('Should expose public posts', async () => {
    const response = await client.query({ query: getPosts })

    expect(response.data.posts.length).toBe(1)
    expect(response.data.posts[0].published).toBe(true)
})

test('Should fetch users posts', async () => {
    const client = getClient(userOne.jwt)

    const { data } = await client.query({ query: myPosts })
    expect(data.myPosts.length).toBe(2)
})

test('Should be able to update own post', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: postOne.data.id,
        data: {
            published: false
        }
    }
    const { data } = await client.mutate({
        mutation: updatePost,
        variables
    })
    const postExists = await prisma.exists.Post({ id: postOne.data.id, published: false })
    expect(data.updatePost.published).toBe(false)
    expect(postExists).toBe(true)
})

test('Should be able to create a post', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        data: {
            title: "This is my test post",
            body: "",
            published: true
        }
    }
   
    const { data } = await client.mutate({
        mutation: createPost,
        variables
    })

    expect(data.createPost.title).toBe('This is my test post')
    expect(data.createPost.body).toBe('')
    expect(data.createPost.published).toBe(true)
})

test('Should be able to delete a post', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: postTwo.data.id
    }
    await client.mutate({
        mutation: deletePost,
        variables
    })
    const postExists = await prisma.exists.Post({ id: postTwo.data.id })

    expect(postExists).toBe(false)
})