import React,{useEffect, useState, useRef} from "react"
import "../App.css"
import CreateTask from "../Modals/createTask"
import Card from "./Card"

export default function TodoList(){
    const inputEl = useRef("");
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    useEffect(() => {
        let arr = localStorage.getItem("taskList")
        // convert array string to array object
        // let obj = JSON.parse(arr)
        if(arr){
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])

    const searchHandler = (searchTerm) => {
        //  console.log(searchTerm)
        setSearchTerm(searchTerm);
        if(searchTerm !== ""){
            const newTaskList = taskList.filter((task) => {
              return  Object.value(task).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
            });
            setSearchResults(newTaskList)
        }else{
            setSearchResults(taskList)
        }
     }
     const getSearchTerm = () => {
        //  console.log(inputEl.current.value)
        searchHandler(inputEl.current.value);
     }

    const deleteTask = (index) => {
       let tempList = taskList
       tempList.splice(index, 1)
       localStorage.setItem("taskList", JSON.stringify(tempList))
       setTaskList(tempList)
    //    refresh the page after deleting the task
       window.location.reload()
    }

    const updateListArray = (obj, index) => {
       let tempList = taskList
       tempList[index ] = obj
       localStorage.setItem("taskList", JSON.stringify(tempList))
       setTaskList(tempList)
       window.location.reload()
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        setModal(false)
    }
    return(
        <>
            <div className="header text-center">
              <h3>Todo List</h3>
              <button className = "btn btn-primary" onClick = {() => setModal(true)}>Create Task</button>
              <br />
             
            </div>
            <div className="task-container">
            <input className= "form-control" style={{ height: "43px"}} type="text" placeholder="Search" value={searchTerm} onChange={ getSearchTerm } ref={inputEl}/>
              {/* <div>{searchTerm}</div> */}{searchResults}
               {taskList && taskList.map((obj , index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray= {updateListArray} />)}
            </div>
            <CreateTask toggle = {toggle} modal={modal} save = { saveTask }/>
        </>
    )
}