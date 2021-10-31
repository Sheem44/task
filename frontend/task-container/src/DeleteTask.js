import React, { Component } from 'react'
import axios from 'axios'
class DeleteTask extends Component {
    constructor (props) {
        super(props)
        this.state={id:0,msg:''}
    }
    handleChange=(event)=>{
        this.setState({id:event.target.value})
    }
    handleSubmit=(event)=>{
        event.preventDefault();
       let id=this.state.id;
        let url=`http://localhost:9999/deleteTask/${id}`
        axios.delete(url)
        .then(result=>{this.setState({msg:result.data})})
        .catch(err=>console.log(err))
    } 
    render () {
        return (
            <div>
                <h2>Delete Task</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Task Id: </label>
                    <input type="text" name="id" onChange={this.handleChange}></input><br/>
                    <input type="submit" value="delete"></input>
                    <input type="reset" value="reset"></input>
                </form><br/>
                {this.state.msg} 
            </div>
        )
    }
}

export default DeleteTask