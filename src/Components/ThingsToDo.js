import React, { useState, useReducer } from "react";
import * as ReactBootStrap from "react-bootstrap";

const store = React.createContext();
const row = [];
const rows = [];
const initialState = { rowsData: rows, rowData: row };

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_ROW":
            return {
                ...state,
                rowData: [...state.rowData, action.data],
            };
        case "UPDATE_ROW":
            return {
                ...state,
                rowData: action.data,
            };
    }
};

function ThingsToDo() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [row, setRow] = useState([]);
    const [colour, setColour] = useState("");
    const [visible, setVisible] = useState(true);
    const [index, setIndex] = useState([]);
    const [column, setColumns] = useState({
        arr: ["Things to do", "Owner", "Status", "Due Date", "Priority"],
    });
    const { rowData } = state;
    let obj = {
        netural: "#84a9ac",
        done: "#09d940",
        working: "#f27e2c",
        critical: "#e02319",
        stuck: "#55b1f2",
    };
    let styles = {
        // width: "300px",
        backgroundColor: "white",
        color: "#fff",
        textalign: "center",
        borderRadius: "6px",
        padding: "5px 0",
        position: "absolute",
        zIndex: 1,
        left: 0,
        marginLeft: "-60px",
        color: "black",
        top: "35px",
        border: "thin solid lightgray",
        display: "flex",
        flexWrap: "wrap",
    };
    const addRow = () => {
        const data = ["", "", "Neutral", "", ""];
        let newRow = null;
        if (index.length > 0) {
            index.map((ini) => {
                const ri = data.splice(ini.x, 1);
                data.splice(ini.y, 0, ri[0]);
                newRow = { row: data };
            });
        } else {
            newRow = { row: data };
        }
        dispatch({ type: "ADD_ROW", data: { row: data } });
    };

    const allowDrop = (event) => {
        event.preventDefault();
    };

    const drag = async (event) => {
        event.dataTransfer.setData("text", event.target.id);
    };

    const colDrop = async (event) => {
        event.preventDefault();
        var data = event.dataTransfer.getData("text");

        //columns drag and drop
        var ri = column.arr.splice(data.split("_")[1], 1);
        console.log(ri, event.target.id);
        column.arr.splice(event.target.id.split("_")[1], 0, ri[0]);

        // row drag and drop
        const rr = rowData.map((item) => {
            var ci = item.row.splice(data.split("_")[1], 1);
            item.row.splice(event.target.id.split("_")[1], 0, ci[0]);
            return item;
        });
        // setRow(rr);
        dispatch({ type: "UPDATE_ROW", data: rr });
        setIndex([
            ...index,
            { x: data.split("_")[1], y: event.target.id.split("_")[1] },
        ]);
    };

    const drop = (event) => {
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        const removedItem = rowData.splice(data.split("_")[1], 1);
        rowData.splice(event.target.parentNode.id.split("_")[1], 0, removedItem[0]);
        dispatch({ type: "UPDATE_ROW", data: rowData });
    };

    const handleChange = (e, index, ind) => {
        const newState = rowData.map((item, i) => {
            if (index === i) {
                item.row[ind] = e.target.value;
            }
            return item;
        });
        dispatch({ type: "UPDATE_ROW", data: newState });
    };

    const updateColour = (e, index, ind) => {
        const updatitm = rowData.map((item, i) => {
            if (index === i) {
                item.row[ind] = e.target.value;
                const newItem = {
                    ...item,
                    color: obj[e.target.value],
                };
                return newItem;
            }
            return item;
        });
        setColour(obj[e.target.value]);
        dispatch({ type: "UPDATE_ROW", data: updatitm });
    };
    return (
        <div>
            <ReactBootStrap.Table bordered hover>
                <thead>
                    <tr id="header_row">
                        {column.arr.map((header, index) => {
                            return header === "Status" ? (
                                <th
                                    onClick={() => setVisible(!visible)}
                                    id={`col_${index}`}
                                    draggable={true}
                                    onDragStart={(event) => drag(event)}
                                    onDrop={(event) => colDrop(event)}
                                    onDragOver={(event) => allowDrop(event)}
                                    className={`${header}_col`}
                                >
                                    <div className="tool1" style={{ position: "relative" }}>
                                        Status
                                     <div className="tool2" hidden={visible} style={styles}>
                                            <table>
                                                <tr>
                                                    <td>
                                                        <div
                                                            style={{
                                                                backgroundColor: "#84a9ac",
                                                                width: "100px",
                                                                position: "relative",
                                                                left: "0",
                                                                top: "0",
                                                                height: "100%",
                                                                padding: "10px"
                                                                // margin: "10px",
                                                            }}
                                                        >
                                                            Neutral
                                                     </div>
                                                    </td>
                                                    <td>
                                                        <div
                                                            style={{
                                                                backgroundColor: "#09d940",
                                                                width: "100px",
                                                                position: "relative",
                                                                left: "0",
                                                                top: "0",
                                                                height: "100%",
                                                                padding: "10px"
                                                                // margin: "10px",
                                                            }}
                                                        >
                                                            Working On it
                                                    </div>
                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td>
                                                        <div
                                                            style={{
                                                                backgroundColor: "#f27e2c",
                                                                width: "100px",
                                                                position: "relative",
                                                                left: "0",
                                                                top: "0",
                                                                height: "100%",
                                                                padding: "10px"
                                                                // margin: "10px",
                                                            }}
                                                        >
                                                           Critical
                                                    </div>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                    <div
                                                            style={{
                                                                backgroundColor: "#e02319",
                                                                width: "100px",
                                                                position: "relative",
                                                                left: "0",
                                                                top: "0",
                                                                height: "100%",
                                                                padding: "10px"
                                                                // margin: "10px",
                                                            }}
                                                        >
                                                            Done
                                                   </div>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </th>
                            ) : (
                                    <th
                                        id={`col_${index}`}
                                        draggable={true}
                                        onDragStart={(event) => drag(event)}
                                        onDrop={(event) => colDrop(event)}
                                        onDragOver={(event) => allowDrop(event)}
                                        className={`${header}_col`}
                                    >
                                        {header}
                                    </th>
                                );
                        })}
                    </tr>
                </thead>
                <tbody id="tb">
                    {rowData &&
                        rowData.map((item, index) => {
                            return (
                                <tr
                                    id={`row_${index}`}
                                    key={index}
                                    draggable={true}
                                    onDragStart={(event) => drag(event)}
                                    onDrop={(event) => drop(event)}
                                    onDragOver={(event) => allowDrop(event)}
                                >
                                    {item.row.map((cell, i) => {
                                        console.log("cell", cell);
                                        return column.arr.indexOf("Status") === i ? (
                                            <td
                                                className="status__column"
                                                style={{ backgroundColor: item.color }}
                                            >
                                                <select
                                                    className="status__dropdown"
                                                    onChange={(e) => updateColour(e, index, i)}
                                                >
                                                    <option
                                                        className="grey"
                                                        value="netural"
                                                        selected={cell === "netural"}
                                                    >
                                                        Neutral
                                                  </option>
                                                    <option
                                                        className="orange"
                                                        value="working"
                                                        selected={cell === "working"}
                                                    >
                                                        Working
                                                   </option>
                                                    <option
                                                        className="green"
                                                        value="done"
                                                        selected={cell === "done"}
                                                    >
                                                        Done
                                                   </option>
                                                    <option
                                                        className="red"
                                                        value="critical"
                                                        selected={cell === "critical"}
                                                    >
                                                        Critical
                                                   </option>
                                                    <option
                                                        className="blue"
                                                        value="stuck"
                                                        selected={cell === "stuck"}
                                                    >
                                                        Stuck
                                               </option>
                                                </select>
                                            </td>
                                        ) : (
                                                <td key={i} className="row__input__cell">
                                                    <input
                                                        className="rowInputElements"
                                                        type="text"
                                                        value={cell}
                                                        onChange={(e) => handleChange(e, index, i)}
                                                    />
                                                </td>
                                            );
                                    })}
                                </tr>
                            );
                        })}
                </tbody>
            </ReactBootStrap.Table>
            <div className="container-fluid">
                <div className="row" type="button" onClick={addRow}>
                    <div className="col-sm-2"> + Add</div>
                </div>
            </div>
        </div>
    );
}
export default ThingsToDo;