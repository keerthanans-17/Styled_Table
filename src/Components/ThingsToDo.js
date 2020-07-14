import React, { useState } from 'react'
import * as ReactBootStrap from 'react-bootstrap'
function ThingsToDo() {
    const [row, setRow] = useState([])
    const addRow = () => {
        const rows = { ttd: "New Item", status: "", due_Date: "july5", priority: "High" };
        setRow([...row, rows])
    }
    const allowDrop = (ev) => {
        ev.preventDefault();
    }

    const drag = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    const drop = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        document.getElementById("tb").insertBefore(ev.target.parentNode, document.getElementById(data))
    }

    return (
        <div>
            <ReactBootStrap.Table bordered hover>
                <thead>
                    <tr>
                        <th onClick={() => addRow()}>Things To Do</th>
                        <th>Owner</th>
                        <th>Status </th>
                        <th>Due Date</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody id="tb">
                    {
                        row && row.map((item, index) => {
                            
                            return (
                                <tr
                                    id={`row_${index}`}
                                    key={index}
                                    draggable={true}
                                    onDragStart={(event) => drag(event)}
                                    onDrop={(event) => drop(event)}
                                    onDragOver={(event) => allowDrop(event)}
                                >
                                    <td><h5 className="things__text">{`${item.ttd}_${index}`}</h5>
                                    <span  className="far fa-comment" style={{fontSize:'20px'}}></span></td>
                                    <td ><span  className="far fa-user-circle" style={{fontSize:'25px'}}></span></td>
                                    <td className="status__column"> 
                                            <select className="status__dropdown">
                                                <option  value="1">Netural</option>
                                                <option  value="2">Working on it</option>
                                                <option  value="3">Done</option>
                                                <option  value="4">Critical</option>
                                                <option  value="5">Stuck</option>
                                            </select>
                                        </td>
                                    <td><span  className="fas fa-adjust" style={{fontSize:'14px'}}></span>
                                       <h5 className="due_Date">{item.due_Date} </h5> </td>
                                    <td>{item.priority}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </ReactBootStrap.Table>
            <div className="container-fluid">
                <div className="row" type="button" onClick={addRow}>
                <div className="col-sm-2"> + Add
            </div>
                </div>
            </div>
        </div>
    )
}
export default ThingsToDo