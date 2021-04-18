import React, { useState, useEffect } from 'react';
import './App.css';
import FormInput from './components/input/input';
import Button from './components/button/button';
import axios from "./axios";
import { RiArrowDropDownFill, RiArrowDropUpFill } from 'react-icons/ri'

function App() {
  const [tableRow, setTableRow] = useState([]);
  const [tableData, SetTableData] = useState([]);
  const [deleteReset, setDeleteReset] = useState([]);
  const [showSave, SetShowSave] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({
    id: "",
    firstName: "",
    lastName: "",
    className: "",
    subject: "",
    marks: ""
  })

  const handleAddStudent = () => {
    SetShowSave(true)
    setTableRow([...tableRow, tableRow.length + 1])
  }

  useEffect(async () => {
    await axios.get('/').then((response) => {
      SetTableData(response.data)
    });
  }, [currentStudent, deleteReset])

  const handleDelete = async (index) => {
    const config = {
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: JSON.stringify(index)
    };
    await axios.delete(`/delete/${JSON.stringify(index)}`, config).then((response) => {
      setDeleteReset(response)
    });
  }

  const handleSave = async () => {
    SetShowSave(false)
    let body = JSON.stringify(currentStudent)

    const config = {
      headers: {
        'Content-Type': 'application/JSON'
      }
    };
    await axios.post('/', body, config).then((response) => {
    });

    setCurrentStudent({
      id: "",
      firstName: "",
      lastName: "",
      className: "",
      subject: "",
      marks: ""
    })

  }

  const handleSubmit = async event => {
    event.preventDefault()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    return setCurrentStudent({
      ...currentStudent,
      [name]: value
    })
  }

  const handleSearch = async event => {
    const data = [...tableData]
    const filteredData = await data.filter(row =>
      row.firstName.toLowerCase().includes(event.target.value)
    );
    SetTableData(filteredData)
  }

  return (
    <div className="App">
      <div className="headerWrap">
        <div className="SearchWrap">
          <FormInput placeholder="Search..." handleChange={handleSearch} />
          <Button title="Filter by" bropdown iconDown={<RiArrowDropDownFill />} iconUp={<RiArrowDropUpFill />} />
        </div>
        <div className="add_student_btn">
          <Button title="Add Students" handleStudent={handleAddStudent} />
        </div>
      </div>
      <div className="tableWrap">
        <form onSubmit={handleSubmit}>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Class</th>
                <th>Subject</th>
                <th>Marks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {showSave && (
                <tr >
                  <td></td>
                  <td><input className="tableInput" required value={currentStudent.firstName} type='text' name="firstName" onChange={(e) => handleChange(e)} /></td>
                  <td><input className="tableInput" required value={currentStudent.lastName} type='text' name="lastName" onChange={(e) => handleChange(e)} /></td>
                  <td><input className="tableInput" required value={currentStudent.class} name="className" min="1" max="12" type='number' onChange={(e) => handleChange(e)} /></td>
                  <td><input className="tableInput" required value={currentStudent.subject} name="subject" type='text' onChange={(e) => handleChange(e)} /></td>
                  <td><input className="tableInput" required value={currentStudent.marks} name="marks" type='text' onChange={(e) => handleChange(e)} /></td>
                  <td style={{ display: "flex" }}>
                    <button className="edit_btn" type="submit" onClick={() => handleSave()}>Save</button>
                  </td>
                </tr>
              )}
              {tableData.length > 0 && tableData.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.firstName}</td>
                    <td>{data.lastName}</td>
                    <td>{data.className}th</td>
                    <td>{data.subject}</td>
                    <td>{data.marks}</td>
                    <td style={{ display: "flex" }}>
                      <React.Fragment>
                        <button className="edit_btn">Edit</button>
                        <button className="delete_btn" onClick={() => handleDelete(index)} >Delete</button>
                      </React.Fragment>
                    </td>
                  </tr>)
              })}
            </tbody>
          </table>
        </form>
      </div>

    </div>
  );
}

export default App;
