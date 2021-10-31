import React, { Component } from 'react'
import axios from 'axios'
class DisplayTasks extends Component {
    constructor (props) {
        super(props)
        this.state={tasks:[]}
    }
    componentDidMount(){
        let url= "http://localhost:9999/allTasks"
        axios.get(url)
        .then(result=>{ this.setState({tasks:result.data})})
        .catch(err=>console.log(err))
    }
    render () {
        let tasks= this.state.tasks.map(t=><tr key={t.id}>
            <td>{t.id}</td>
            <td>{t.task_content}</td>
            <td>{t.completed.toString()}</td>
            </tr>)
        return (
            <div>
                <h2>Tasks</h2>
                <table border="1px solid black">
                    <thead>
                        <tr>
                        <th>Task</th>
                        <th>Is it completed</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tasks}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DisplayTasks