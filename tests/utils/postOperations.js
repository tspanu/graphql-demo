import { gql } from 'apollo-boost'

const getPosts = gql`
    query {
        posts {
            id
            title
            published
        }
    }
`

const myPosts = gql`
    query {
        myPosts {
            id
            title
            body
            published
        }
    }
`

const updatePost = gql`
    mutation($id:ID!, $data:UpdatePostInput!) {
        updatePost(
            id: $id,
            data: $data
        ){
            id
            title
            body
            published
        }
    }
`
const createPost = gql`
    mutation($data:CreatePostInput!) {
        createPost(
            data: $data
        ){
            id
            title
            body
            published
        }
    }
`
const deletePost = gql`
    mutation($id:ID!) {
        deletePost(
            id: $id
        ){
            id
        }
    }
`

export { getPosts, myPosts, updatePost, createPost, deletePost }