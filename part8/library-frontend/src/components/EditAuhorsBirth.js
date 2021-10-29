import React, {useState} from 'react'
import {useMutation} from '@apollo/client'
import {ALL_AUTHORS, EDIT_AUTHOR} from '../queries'
import Select from 'react-select'

const EditAuthorsBirth = ({authors}) => {
  const [name, setName] = useState({value: "", label:""})
  const [year, setYear] = useState("")

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    editAuthor({variables: {name: name.value, setBornTo: Number(year)}})
    setName("")
    setYear("")
  }

  return (
  
  <div>
    <h3>Set Birth Year</h3>
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <Select value={name} onChange={setName} options={authors.map(a => ({value:a.name, label: a.name}))}></Select>
      </div>
      <div>
        year:
        <input type="text" value={year} required onChange={e => setYear(e.target.value)}></input>
      </div>
      <input type="submit" value="update author"></input>
    </form>
  </div>
  )
}

export default EditAuthorsBirth