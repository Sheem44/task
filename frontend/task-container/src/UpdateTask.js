import React, { Component } from 'react'
import axios from 'axios'
class UpdateTask extends Component {
    constructor (props) {
        super(props)
        this.state={id:0,task_content:'',msg:""}
    }
    componentDidMount(){
        let id= parseInt(this.props.id)
        this.setState({id:id})
    }
    handleChange=(event)=>{
        this.setState({task_content:event.target.value})
    }
    changeid=()=>{
        let id= parseInt(this.props.id)
        this.setState({id:id})
    }
    handleSubmit=(event)=>{
        event.preventDefault();
       // console.log(this.state)
        let ubdateTask=this.state
        let url="http://localhost:9999/updateTask"
        axios.put(url,ubdateTask)
        .then(result=>{this.setState({msg:result.data})})
        .catch(err=>console.log(err))
        this.setState({id:0})
    } 
    render () {
        return (
            <div>
                <h2>Update Task</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Task : </label>
                    <input type="text" name="task_content" onChange={this.handleChange}></input><br/>
                    <input type="submit" value="update" onClick={this.changeid}></input>
                    <input type="reset" value="reset"></input>
                </form><br/>
                {this.state.msg}
                {this.props.id}
            </div>
        )
    }
}

export default UpdateTask