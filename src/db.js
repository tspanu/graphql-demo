const users = [{
    id: '1',
    name: 'Travis',
    email: 'tjspanu@gmail.com',
    age: 27
}, {
    id: '2',
    name: 'Mark',
    email: 'markyb@gmail.com'
}, {
    id: '3',
    name: 'Frazier',
    email: 'frazi@gmail.com',
    age: 29
}]

const posts = [{
    id: "11",
    title: "How to shred",
    body: "This is how you shred on guitar",
    published: true,
    author: '1'
}, {
    id: "12",
    title: "How to eat a bunch",
    body: "Just put it in your mouth",
    published: true,
    author: '1'
}, {
    id: "13",
    title: "How to act",
    body: "Ahoy! Didn't see you there sailor",
    published: false,
    author: '2'
}]

const comments = [{
    id: "101",
    text: "Wow, that's awesome!",
    author: '3',
    post: '12'
}, {
    id: "102",
    text: "Duhhhh",
    author: '2',
    post: '12'
}, {
    id: "103",
    text: "Movie time!!",
    author: '1',
    post: '13'
}, {
    id: "104",
    text: "My face is melting!!!",
    author: '1',
    post: '11'
}]

const db = {
    users,
    posts,
    comments
}

export { db as default }