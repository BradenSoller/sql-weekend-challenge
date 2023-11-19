const router = require('express').Router();
const pool = require('../modules/pool');


router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todos" ORDER BY "id";'
    pool.query(queryText)
    .then((dbresult) => {
        console.log('dbresult.rows:', dbresult.rows)
        res.send(dbresult.rows)
    })
    .catch(dbError => {
        console.log("error getting todos",dbError)
        res.sendStatus(500)
    })
});

//posting a new todo
router.post('/', (req, res) => {
    console.log('In post route', req.body);
    let queryText = `
    INSERT INTO "todos"
    ("text")
    VALUES
    ($1);

    `
    
    
    

    const sqlValues = [
        req.body.toDoText //$1
    ]

    pool.query(queryText, sqlValues)
    .then((dbResult) => {
        res.sendStatus(201)
    })
    .catch((dbError) => {
        console.log('POST /koalas query faild', dbError)
    })
});

router.put('/:id',(req, res) => {
    //             👆🏻
    // this sets the id as the first value 

    let idOfTodos = req.params.id;
    // req.body vs req.params.property
    // we use req.body when data is static, but when data is dynamic, we use
    // req.params.property



    const sqlText = `
    UPDATE "todos"
     SET "isComplete" = NOT "isComplete"
     WHERE "id" = ($1);
      `
    const sqlValues = [idOfTodos];

    pool.query(sqlText,sqlValues)
    .then((dbResult) =>{
        res.sendStatus(200);
    })
    .catch((dbError)=>{
        console.log('PUT /koalas:id failed', dbError)
        res.sendStatus(500);
    })
});


router.delete('/:id',(req,res)=>{
    let idOfTodoToDelete = req.params.id;
    const sqlText =
    `
    DELETE FROM "todos"
    WHERE "id" = ($1)

    ` 
    const sqlValues = [idOfTodoToDelete];
    pool.query(sqlText,sqlValues)
    .then((dbResult) =>{
        res.sendStatus(200);
    })
    .catch((dbError)=> {
        console.log("DELETE /todos/:id failed:", dbError);
        res.sendStatus(500);
    })
});
module.exports = router;
