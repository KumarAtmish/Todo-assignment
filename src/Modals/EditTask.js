import React, { useEffect, useState } from "react"
import "../App.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function EditTask({modal, toggle, updateTask, taskObj}){
    const [taskName, setTaskName] = useState('');
    const [description, setDescription]= useState('');

    // handle change function
    const handleChange = (e) => {
        const { name, value } = e.target

        if( name === "taskName"){
            setTaskName(value)
        }else{
            setDescription(value)
        }
    }

    useEffect(() => {
        setTaskName(taskObj.Name)
        setDescription(taskObj.Description)
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault();
        let tempObj = {}
        tempObj['Name'] = taskName
        tempObj['Description'] = description
        updateTask(tempObj)
        
    }
    return(
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Update Task</ModalHeader>
        <ModalBody>
           <form>
              <div className="form-group">
              <label>Task Name</label>
                 <input type="text" className= "form-control" name="taskName" value = {taskName} onChange = {handleChange}/>
              </div>
              <div className="form-group">
                 <label>Description</label>
                 <textarea rows="5" className= "form-control" name="description" value = {description} onChange = {handleChange}></textarea>
              </div>
           </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
}