getTodos();

//getting the response/data from server
//rending the data  
function getTodos(){
    console.log( 'in getTodos' );
    // axios call to server to get todos
    axios({
      method: 'GET',
      url: '/todos'
    }).then((response) => {
      console.log('GET/ todos', response.data);
      renderTodos(response.data)
    }).catch((error) => {
      console.log('error with GET', error);
    })
  
    
  } 

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
      
    }).then(function(response) {
        getTodos()
    }).catch(function (error) {
        console.log('error in post', error);
    })
};
      


//renders todo's onto the DOM
function renderTodos(todos) {
    let todoList = document.getElementById('todoList');
    todoList.innerHTML = ""
    for (let todo of todos) {
        todoList.innerHTML +=
            `
            <ul data-todoid = "${todo.id}">
            <li data-testid="toDoItem" class=${todo.isComplete ? "completed" : "todo-is-not-complete"}>${todo.text} 
             <button data-testid="completeButton" onclick="updateTodoStatus(event)">${todo.isComplete}
             </button>  <button data-testid="deleteButton" onclick ="deleteTodo(event)">delete</button> </li>
         </ul>
            `
    }


};

function deleteTodo(event) {
    event.preventDefault();
    let clickedButton = event.target;
    console.log(clickedButton);
    let theTableRow = clickedButton.closest("ul");
 
    console.log(theTableRow);
    let TodoId = theTableRow.getAttribute("data-todoid");
    console.log(TodoId);
   

    axios({
      method: "DELETE",
      url: `/todos/${TodoId}`,
    })
      .then((response) => {
        
          getTodos()
      })
      .catch((error) => {
        console.log("DELETE /todo/:id fail:", error);
      });
  }


function updateTodoStatus(event) {
    

    let todoID = event.target.closest("ul").getAttribute("data-todoid");
    console.log(todoID);
    axios({
      method: 'PUT',
      url: `todos/${todoID}`
    }).then((response)=>{
      console.log("todoByID");
     getTodos()
    }).catch((error)=>{
      console.log("error in put",error)
    })
  }



