import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seedDatabase from './utils/seedDatabase'
import getClient from './utils/getClient'

const client = getClient()

beforeEach(seedDatabase)

test('Should create a new user', async () => {
    const createUser = gql`
        mutation {
            createUser(
                data: {
                    name: "Travis",
                    email: "travis@example.com"
                    password: "abcd1234"
                }
            ){
                token,
                user {
                    id
                }
            }
        }
    `
    const response = await client.mutate({
        mutation: createUser
    })

    const userExists = await prisma.exists.User({
        id: response.data.createUser.user.id
    })

    expect(userExists).toBe(true)
})

test('Should expose public author profiles', async () => {
    const getUsers = gql`
        query {
            users {
                id
                name
                email
            }
        }
    `
    const response = await client.query({ query: getUsers })

    expect(response.data.users.length).toBe(1)
    expect(response.data.users[0].email).toBe(null)
    expect(response.data.users[0].name).toBe('Jax')
})

test('Should not login with bad credentials', async () => {
    const login = gql`
        mutation {
            login (
                data: {
                    email: "jax@example.com",
                    password: "abcd1235"
                }
            ){
                token
            }
        }
    `
    await expect(client.mutate({ mutation: login })).rejects.toThrow()
})

test('Should not createUser with short password', async () => {
    const createUser = gql`
        mutation {
            createUser (
                data: {
                    name: "jinx"
                    email: "jinx@example.com",
                    password: "abcd"
                }
            ){
                token
            }
        }
    `
    await expect(client.mutate({ mutation: createUser })).rejects.toThrow()
})