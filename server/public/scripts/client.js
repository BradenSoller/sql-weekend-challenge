//getting the response/data from server



//rending the data  
getTodos();


function getTodos(){
    console.log( 'in getKoalas' );
    // axios call to server to get koalas
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
            <ul data-testid="toDoItem" data-todoid = "${todo.id}">
            <li class = ${todo.isComplete ? "completed" : "todo-is-not-complete"}>${todo.text}</li>
          <button onclick="updateTodoStatus(event)">${todo.isComplete}</button>
           <button data-testid="deleteButton" onclick ="deleteTodo(event)">delete</button>
         </ul>
            `
    }

};

function deleteTodo(event) {
    event.preventDefault();
    let clickedButton = event.target;
    console.log(clickedButton);
    let theTableRow = clickedButton.closest("li");
 
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



