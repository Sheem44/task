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
        this.setState( {addContainer: true})
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
    render () {
        let tasks= this.state.tasks.map(t=><div className="row" key={t.id}>
            <div className="col-6 task_content">
            {t.id}
            {t.task_content}
            {t.completed.toString()}
            </div>
            <div className="col-6">
            <button className="_btn"onClick={()=>{this.showUpdate(t.id)}}>Edite</button>
            <button className="_btn"onClick={()=>{ this.deleteTask(t.id)}}>Delete</button>
            </div>
            <hr />
            </div>)
        return (
            <div className="center">
                <div className="header">
                <h2>Things to do</h2>
                <a href="#e" onClick={this.addTask}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg></a>
                </div>
                {this.state.addContainer &&  <AddTask />}<br/>
                    {tasks}
                    <br/>
                    {this.state.msg}
               <br/> 
               
                {this.state.updateContainer && <UpdateTask id={this.state.id}/>}
            </div>
        )
    }
}

export default DisplayTasks