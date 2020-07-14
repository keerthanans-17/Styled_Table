import React, { useState } from 'react'
import * as ReactBootStrap from 'react-bootstrap'
function ThingsToDo() {
    const [row, setRow] = useState([])
    const [colour, setColour] = useState("")
    let obj = {
        netural: "#84a9ac",
        done: "#09d940",
        working: "#f27e2c",
        critical: "#e02319",
        stuck: "#55b1f2"
    }
    const addRow = () => {
        const rows = { ttd: "New Item", status: "", due_Date: "july5", priority: "High", color: "" }; 
        setRow([...row, rows])
    } 
    const updateColour = (e, index) => {
        const updatitm = row.map((item, i) => {
            if (index === i) {
                const newItem = {
                    ...item,
                    color: obj[e.target.value]
                }
                return newItem;  
            }
            return item;
        })
        setColour(obj[e.target.value])
        console.log("-----", e.target.value)
        setRow(updatitm);
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
        document.getElementById("tb").insertBefore(document.getElementById(data),ev.target.parentNode);
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
                                        <span className="far fa-comment" style={{ fontSize: '20px' }}></span></td>
                                    <td ><span className="far fa-user-circle" style={{ fontSize: '25px' }}></span></td>
                                    <td className="status__column" style={{ backgroundColor: item.color }}> 
                                        <select className="status__dropdown" onChange={(e) => updateColour(e, index)}>
                                            <option className="grey" value="netural">Netural</option>
                                            <option className="orange" value="working">Working on it</option>
                                            <option className="green" value="done">Done</option>
                                            <option className="red" value="critical">Critical</option>
                                            <option className="blue" value="stuck">Stuck</option>
                                        </select>
                                    </td>
                                    <td><span className="fas fa-adjust" style={{ fontSize: '14px' }}></span>
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