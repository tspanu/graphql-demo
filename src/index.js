import '@babel/polyfill'
import server from './server'

server.start({ port: process.env.PORT || 4000 }, () => {
    console.log('Server is running on http://localhost:4000')
})