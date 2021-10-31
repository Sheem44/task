
import AddTask from './AddTask';
import './App.css';
import DeleteTask from './DeleteTask';
import DisplayTasks from './DisplayTasks';
import UpdateTask from './UpdateTask';

function App() {
  return (
    <div className="App">
      <DisplayTasks/>
      <hr/>
      <AddTask/>
      <hr/>
      <DeleteTask/>
      <hr/>
      <UpdateTask/>
    </div>
  );
}

export default App;
