//losd modules
let express= require("express");
let bodyParser=require("body-parser");
let cors= require("cors");

// creat express reference
let app = express();

//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());


//inial data
let tasks=[
    {"id":100,"task_content":"send an email","completed":true},
    {"id":101,"task_content":"complete the project","completed":false}
]

//display all tasks
app.get("/allTasks",(req,res)=>{
    res.json(tasks);
})

//add task
app.post("/addTask",(req,res)=>{
    let newid= tasks[tasks.length-1].id+1
    let newtaskContent=req.body.task_content
    let newtask= {"id":newid,"task_content":newtaskContent,"completed":false}
    tasks.push(newtask)
    res.send("Task added successfully")
})

//delete task
app.delete("/deleteTask/:id",(req,res)=>{
    let id= req.params.id;
    let index= tasks.findIndex(t=>t.id==id)
    if(index >=0){
        tasks.splice(index,1);
        res.send("Task with id "+id+" deleted successfully ")
    } else{
        res.send("task is not exist ")
    }
})

//ubdate task
app.put("/updateTask",(req,res)=>{
    let id= req.body.id;
    let ubdatedTask= req.body.task_content
    let index= tasks.findIndex(t=>t.id==id)
    if(index >=0){
        let task= tasks[index];
        task.task_content= ubdatedTask
        res.send("update task"+ task.task_content)
    } else{
        res.send("task is not exist ")
    }
})

app.listen(9999,()=>console.log("Server is running on port number 9999"))