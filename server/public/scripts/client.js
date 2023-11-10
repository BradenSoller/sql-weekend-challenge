console.log('JS is sourced!');

function getTodos() {
    axios({
        type: 'GET',
        url: '/todos'
    }).then(res => {
        renderTodos(res.data)
    })
}

function renderTodos(todos) {
    
}