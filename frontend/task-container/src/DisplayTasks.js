import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios'
import AddTask from './AddTask'
import UpdateTask from './UpdateTask'
class DisplayTasks extends Component {
    constructor (props) {
        super(props)
        this.state={tasks:[],addContainer: false ,msg:'',updateContainer:false, id:0}
    }
    componentDidMount(){
        let url= "http://localhost:9999/allTasks"
        axios.get(url)
        .then(result=>{ this.setState({tasks:result.data})})
        .catch(err=>console.log(err))
    }
    addTask=()=>{
        let theDiv=document.getElementById("add_task")
        theDiv.style.position="relative"
        theDiv.style.display="block"
       theDiv.style.height="auto"
       theDiv.style.opacity="1"
    }
  deleteTask=(id)=>{
         let url=`http://localhost:9999/deleteTask/${id}`
        axios.delete(url)
        .then(result=>{this.setState({msg:result.data})})
        .catch(err=>console.log(err)) 
       // console.log(id)
    }
    showUpdate=(id)=>{
        this.setState({updateContainer:true})
        this.setState({id:id})
    }
    done=(id,comp)=>{
        let doneDiv= document.getElementById(id);
        if(!comp){
        doneDiv.style.background="linear-gradient(to right, #ffc107 -73%,#fff 100%)";}
        else {
            doneDiv.style.background="white";
        }
        let completed={id:id}
        let url="http://localhost:9999/taskCompleted"
        axios.put(url,completed)
        .then(result=>console.log("done"))
        .catch(err=>console.log(err))
      }
      completed=(completed,id,btnid)=>{
        let doneDiv= document.getElementById(id);
        let btn=document.getElementById(btnid);
          if(completed){
            doneDiv.style.background="linear-gradient(to right, #ffc107 -73%,#fff 100%)";
            btn.style.color="white";
            btn.style.backgroundColor="#ffc107"
          }else {
            doneDiv.style.backgroundColor="white";
            btn.style.backgroundColor="white";
            btn.style.color="#ffc107"
        }
      }
    render () {
        let tasks= this.state.tasks.map(t=><div id={t.id} ref={()=>{this.completed(t.completed,t.id,"done_btn"+t.id)}} className=" task_container" key={t.id}>
            <div className="col-6 task_content">
            {t.task_content}
            </div>
            <div className="col-6 buttons">
            <button id="edit_btn"onClick={()=>{this.showUpdate(t.id)}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
            </svg></button>
            <button id="delet_btn"onClick={()=>{ this.deleteTask(t.id)}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg></button>
            <button id={"done_btn"+t.id} onClick={()=>{this.done(t.id,t.completed)}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                </svg></button>
            </div>
            </div>)
        return (
            <div className="center">
                <div className="header">
                <h2>Things to do</h2>
                <a href="#e" onClick={this.addTask}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg></a>
                </div>
                <div id="add_task" className="add_container">
                  <AddTask/>
                </div>
                <div>
                    {tasks}
                </div>
                    <br/>
                    {this.state.msg}
               <br/> 
               
                {this.state.updateContainer && <UpdateTask id={this.state.id}/>}
            </div>
        )
    }
}

export default DisplayTasks