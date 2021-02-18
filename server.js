const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.json())


// POST method 
app.post('/user/add', (req, res) => {

    const existUsers = getUserData()
    const userData = req.body

    if (userData.fullName == null || userData.age == null || userData.userName == null || userData.password == null) {
        return res.status(401).send({ error: true, msg: 'User data missing' })
    }

    const findExist = existUsers.find(user => user.userName === userData.userName)
    if (findExist) {
        return res.status(402).send({ error: true, msg: 'username already exist' })
    }

    existUsers.push(userData)
    saveUserData(existUsers);
    res.send({ success: true, msg: 'User data added successfully' })
})


//  GET method 
app.get('/user/list', (req, res) => {
    const users = getUserData()
    res.send(users)
})


//  Patch method
app.patch('/user/update/:userName', (req, res) => {
    const userName = req.params.userName
    const userData = req.body
    const existUsers = getUserData()
           
    const findExist = existUsers.find(user => user.userName === userName)
    if (!findExist) {
        return res.status(409).send({ error: true, msg: 'username not exist' })
    }
    
    const updateUser = existUsers.filter(user => user.userName !== userName)
    updateUser.push(userData)
    saveUserData(updateUser)
    res.send({ success: true, msg: 'User data updated successfully' })
})


//  Delete method
app.delete('/user/delete/:userName', (req, res) => {
    const userName = req.params.userName
    const existUsers = getUserData()
    const filterUser = existUsers.filter(user => user.userName !== userName)
    if (existUsers.length === filterUser.length) {
        return res.status(409).send({ error: true, msg: 'username does not exist' })
    }
    
    saveUserData(filterUser)
    res.send({ success: true, msg: 'User removed successfully' })

})


// Methods to read and write data in json file
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('users.json', stringifyData)
}

const getUserData = () => {
    const jsonData = fs.readFileSync('users.json')
    return JSON.parse(jsonData)
}

//server up
app.listen(3000, () => {
    console.log('Server runs on port 3000')
})