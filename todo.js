const todoList = document.getElementById('todo-list')
const todoForm = document.getElementById('todo-form')
let todoArr = [];

// 로컬에 저장
function saveTodos(){
    const todoString = JSON.stringify(todoArr)
    localStorage.setItem("myTodos", todoString)
}

//로컬에서 가져오기
function loadTodos(){
    const myTodos = localStorage.getItem("myTodos")
    if(myTodos !== null){
    todoArr = JSON.parse(myTodos)
    displayTodos()
    }
}
loadTodos()
//삭제하기

function handleTodoItemClick(clickedId){
    todoArr = todoArr.filter(function(aTodo){
        return aTodo.todoId !== clickedId
    })
    displayTodos()
    saveTodos()
}
//수정하기
function handleTodoItemClick(clickedId){
    todoArr = todoArr.map(function(aTodo){
        if(aTodo.todoId === clickedId){
            return {
            ...aTodo,todoDone: !aTodo.todoDone
        }
    }else{
        return aTodo
    }
})
displayTodos()
saveTodos()
}

//할일 보여주시기
function displayTodos(){
    todoList.innerHTML = ""
    todoArr.forEach(function(aTodo){
        const todoItem = document.createElement('li')
        const todoDelBtn = document.createElement('span')
        todoDelBtn.textContent = 'x'
        todoItem.textContent = aTodo.todoText
        todoItem.title = "클릭하면 생성"
        if(aTodo.todoDone){
            todoItem.classList.add("done")
        }else{
            todoItem.classList.add("yet")
        }
        todoDelBtn.title = "클릭하면 지워짐"
        todoItem.addEventListener("click", function(){
            handleTodoItemClick(aTodo.todoId)
        })
        todoDelBtn.addEventListener("click", function(){
            handleTodoDelBtnClick(aTodo.todoId)
        })
        todoItem.appendChild(todoDelBtn)
        todoList.appendChild(todoItem)
    })
}

//할일 추가
todoForm.addEventListener("submit", function(e){
    e.preventDefault()
    const toBeAdded = {
        todoText: todoForm.todo.value,
        todoId: new Date().getTime(),
        todoDone: false
    }
    todoForm.todo.value = ""
    todoArr.push(toBeAdded)
    displayTodos()
    saveTodos()
    
})
