import React, { Component } from 'react'
import axios from 'axios'
class UpdateTask extends Component {
    constructor (props) {
        super(props)
        this.state={id:0,task_content:'',msg:""}
    }
    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }
    handleSubmit=(event)=>{
        event.preventDefault();
       // console.log(this.state)
        let ubdateTask=this.state
        let url="http://localhost:9999/updateTask"
        axios.put(url,ubdateTask)
        .then(result=>{this.setState({msg:result.data})})
        .catch(err=>console.log(err))
    } 
    render () {
        return (
            <div>
                <h2>Update Task</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Task Id: </label>
                    <input type="text" name="id" onChange={this.handleChange}></input><br/>
                    <label>Task : </label>
                    <input type="text" name="task_content" onChange={this.handleChange}></input><br/>
                    <input type="submit" value="update"></input>
                    <input type="reset" value="reset"></input>
                </form><br/>
                {this.state.msg}
            </div>
        )
    }
}

export default UpdateTask