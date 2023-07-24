import { useState } from 'react'
import './App.css'

function App() {
  const [responseMsg, setResponseMsg] = useState('')

  const handleGet = (event: any) => {
    event.preventDefault()
    fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.text()
      })
      .then((text) => {
        setResponseMsg(text)
        console.log(text)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleUpdate = (event: any) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const object = {}
    formData.forEach((value, key) => (object[key] = value))
    const json = JSON.stringify(object)
    // console.log(JSON.stringify(data))

    fetch('http://localhost:3000/update', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: json,
    })
      .then((response) => {
        return response.text()
      })
      .then((text) => {
        setResponseMsg(text)
        console.log(text)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  const handleCreate = (event: any) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const object = {}
    formData.forEach((value, key) => (object[key] = value))
    const json = JSON.stringify(object)
    // console.log(JSON.stringify(data))

    fetch('http://localhost:3000/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: json,
    })
      .then((response) => {
        return response.text()
      })
      .then((text) => {
        setResponseMsg(text)
        console.log(text)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  return (
    <>
      <div className="wrapper">
        <div className="request">
          <h3>Update User</h3>
          <form className="update-form" onSubmit={handleUpdate}>
            <input type="number" name="id" placeholder="id" required min={1} />
            <input type="text" name="name" placeholder="name" />
            <input type="age" name="age" min={0} placeholder="age" />
            <span>
              <input type="checkbox" name="isMarried" />
              <label>Married?</label>
            </span>
            <button placeholder="Submit">
              <input type="submit" name="submit" />
            </button>
          </form>
          <h3>Create User</h3>
          <form className="update-form" onSubmit={handleCreate}>
            <input type="number" name="id" placeholder="id" required min={1} />
            <input type="text" name="name" placeholder="name" required />
            <input type="age" name="age" min={0} placeholder="age" required />
            <span>
              <input type="checkbox" name="isMarried" />
              <label htmlFor="isMarried">Married?</label>
            </span>
            <button placeholder="Submit">
              <input type="submit" name="submit" />
            </button>
          </form>
        </div>
        <div className="response">
          <button>
            <input type="submit" onClick={handleGet} value="Get all users" />
          </button>
          {responseMsg}
        </div>
      </div>
    </>
  )
}

export default App
