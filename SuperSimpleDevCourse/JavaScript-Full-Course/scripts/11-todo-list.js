const todoList=[{
    name:'make dinner',
    dueDate:'2022-12-22'
}];
renderTodoList();
const currentTodo={name:'',dueDate:''}
function renderTodoList(){
    let todoListHTML=''
    for (let i=0;i<todoList.length;i++){
        const {name,dueDate} = todoList[i]

        const html =` 
        <div>${name}</div>
        <div>${dueDate}</div>
        <button class="delete-todo-button"
         onclick="
         todoList.splice(${i},1);
         renderTodoList();
        ">Delete</button>
       `
        todoListHTML+=html;
    }
    document.querySelector('.js-todo-list').innerHTML=todoListHTML;
}


function addTodo(){
    
    const inputElement =
    document.querySelector('.js-name-input');
    const dateInputElement=document.querySelector('.js-due-date-input');

    const name = inputElement.value;
    const dueDate = dateInputElement.value;
    if(name&&dueDate){
    todoList.push({name,dueDate});
    //todoList.push(name);
    
    
    
    inputElement.value='';
    dateInputElement.value=''
    renderTodoList();
    }
}