import axios from 'axios'
import React, { Component } from 'react'

class AddTask extends Component {
    constructor (props) {
        super(props)
        this.state={task_content:'',msg:''}
    }
    handleChange=(event)=>{
        this.setState({task_conten:event.target.value})
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        let task=this.state
        let url="http://localhost:9999/addTask"
        axios.post(url,task)
        .then(result=>{this.setState({msg:result.data})})
        .catch(err=>console.log(err))
    }
    render () {
        return (
            <div>
                 <h2>Add Task</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Task: </label>
                    <input type="text" name="task_conten" onChange={this.handleChange}></input><br/>
                    <input type="submit" value="submit"></input>
                    <input type="reset" value="reset"></input>
                </form><br/>
                {this.state.msg}
            </div>
        )
    }
}

export default AddTask