//getting the response/data from server
//rending the data  
getTodos();

function getTodos() {
    axios({
        type: 'GET',
        url: '/todos'
    }).then(res => {
        renderTodos(res.data)
    }).catch((error) => {
        console.log('error with GET', error);
      })
    
};

function addTodo(event) {
    event.preventDefault()
    
    let toDoText = document.getElementById('toDoTextInput').value;
    document.getElementById('toDoTextInput').value = ""
    
    axios({
        method: 'POST',
        url: '/todos',
        data:
        {
            toDoText: toDoText
        }
      
    }).then(function (response) {
        getTodos()
    }).catch(function (error) {
        console.log('error in post', error);
    })
};
      


//renders todo's onto the DOM
function renderTodos(todos) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = ""
    for (let todo of todos) {
        todoList.innerHTML +=
            `
         <ul data-todoid = "${todo.id}>
            <li>${todo.text}</li>
          <li><button onclick"updateTodoStatus(event)">${todo.isComplete}</button></li>
           <button></button>
         </ul>
            `
    }
        
};

function updateKoalaTransferStatus(event){
    let todoID = event.target.closest("ul").getAttribute("data-todoid");
    console.log(todoID);
    axios({
      method: 'PUT',
      url: `todos/${todoID}`
    }).then((response)=>{
      console.log("koalaByID");
      getKoalas();
    }).catch((error)=>{
      console.log("error in put",error)
    })
  }





//calling getTodos()
//gets back updated todo's and renders onto DOM
getTodos();