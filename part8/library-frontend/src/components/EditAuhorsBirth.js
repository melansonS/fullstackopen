import React, {useState} from 'react'
import {useMutation} from '@apollo/client'
import {ALL_AUTHORS, EDIT_AUTHOR} from '../queries'

const EditAuthorsBirth = () => {
  const [name, setName] = useState("")
  const [year, setYear] = useState("")

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    editAuthor({variables: {name, setBornTo: Number(year)}})
    setName("")
    setYear("")
  }

  return (
  
  <div>
    <h3>Set Birth Year</h3>
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input type="text" value={name} onChange={e => setName(e.target.value)}></input>
      </div>
      <div>
        year:
        <input type="text" value={year} onChange={e => setYear(e.target.value)}></input>
      </div>
      <input type="submit" value="update author"></input>
    </form>
  </div>
  )
}

export default EditAuthorsBirth