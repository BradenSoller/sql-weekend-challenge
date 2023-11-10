//getting the response/data from server
//rending the data  
getTodos();

function getTodos() {
    axios({
        type: 'GET',
        url: '/todos'
    }).then(response => {
        renderTodos(response.data)
    }).catch((error) => {
        console.log('error with GET', error);
      })
    
};

function addTodo(event) {
    event.preventDefault()
    
    let toDoText = document.getElementById('toDoTextInput').value;
    
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





//calling getTodos()
//gets back updated todo's and renders onto DOM
getTodos();