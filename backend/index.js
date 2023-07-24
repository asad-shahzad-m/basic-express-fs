const express = require('express')
const cors = require('cors')
const fs = require('fs/promises')
const path = require('path')

const app = express()
const port = 3000
const usersFilePath = path.join(__dirname, './users.json')

app.use(cors())
app.use(express.json())

let usersData = {}

async function loadUsersData() {
    try {
        const fileContent = await fs.readFile(usersFilePath, 'utf-8')
        usersData = JSON.parse(fileContent)
    } catch (err) {
        console.error('Error loading users data:', err)
    }
}

async function saveUsersData() {
    try {
        await fs.writeFile(
            usersFilePath,
            JSON.stringify(usersData, null, 4),
            'utf-8'
        )
    } catch (err) {
        console.error('Error saving users data:', err)
    }
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/users', async (req, res) => {
    res.json(usersData)
})

app.put('/update', async (req, res) => {
    const { id, name, age, isMarried } = req.body
    const user = { id, name, age, isMarried: isMarried || false }

    if (
        usersData.users[id] &&
        JSON.stringify(usersData.users[id]) !== JSON.stringify(user)
    ) {
        usersData.users[id] = user
        await saveUsersData()
        res.send('User updated successfully!')
    } else if (usersData.users[id] === undefined) {
        res.send('No user!')
    } else {
        res.send('No info changed!')
    }
})

app.post('/add', async (req, res) => {
    const { id, name, age, isMarried } = req.body
    const user = { id, name, age, isMarried: isMarried || false }

    if (!usersData.users[id]) {
        usersData.users[id] = user
        await saveUsersData()
        res.send('User added successfully!')
    } else {
        res.send('User already exists')
    }
})

app.listen(port, () => {
    loadUsersData().then(() => {
        console.log(`http://localhost:${port}`)
    })
})
