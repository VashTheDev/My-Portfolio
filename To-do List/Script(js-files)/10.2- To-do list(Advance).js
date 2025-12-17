const todolist = [];

function addtodo() {

  const inputElement = document.querySelector('.js-name-input');

  todolist.push(inputElement.value);

  console.log(todolist);
  inputElement.value = '';
}

const todolist2 = [];

function addtodo2() {

  const inputElement2 = document.querySelector('.js-name-input2');

  todolist2.push(inputElement2.value);

  let todolistHTML = '';

  for (let i=0; i<todolist2.length; i++) {
    const todo = todolist2[i];
    const html = `<p>${todo}</p>`;
    todolistHTML += html;
 
  }

   document.querySelector('.js-todo-list')
      .innerHTML = todolistHTML;

  inputElement2.value = '';

}




/* 
//let todolist0;

//try {
//  const stored = JSON.parse(localStorage.getItem('list'));
// todolist0 = Array.isArray(stored) ? stored : [];
//} catch (e) {
//  todolist0 = [];
//} 
//as it was failing becuz of the below reason try{} catch(e){} is used to use the try code if error then use the catch code


let todolist0 = JSON.parse(localStorage.getItem('list') || "[]");
//let todolist0 = JSON.parse(localStorage.getItem('list')) || [];❌
//if the storage is empty,then ls is null and as its not an array the push in the addtodo0 doesnt works but with the "[]" in the parse it doesnt take the stored item if its null
//can also use if statement to fix the problem


displayTodo0();

function displayTodo0() {

  let todolistHTML0 = '';

  todolist0.forEach((todoObject) => {
    const { name,date } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${date}</div>
      <button class="js-delete-button delete-button"> 
        Delete 
      </button>
    `;
    
    todolistHTML0 += html;
  })
  

  document.querySelector('.js-todo-list0')
    .innerHTML = todolistHTML0;

  document.querySelectorAll('.js-delete-button')
  .forEach((deleteButton,index) =>
    {deleteButton.addEventListener('click', () => { 
      todolist0.splice(index,1);
      localStorage.setItem('list', JSON.stringify(todolist0))
      //save when delete
      displayTodo0();
    })  ;
  });
    
}

document.querySelector('.js-add-button').addEventListener('click',addtodo0)




function addtodo0() {
  const inputElement0 = document.querySelector('.js-name-input0');
  const name = inputElement0.value.trim();

  const dateinputElement0 = document.querySelector('.js-date-input0');
  const date = dateinputElement0.value;

  if (name !== '') {
    todolist0.push({name,date})
    localStorage.setItem('list', JSON.stringify(todolist0))
    //save when add
  }
   
  

  inputElement0.value = '';
  displayTodo0();
}
*/




let todolist0 = JSON.parse(localStorage.getItem('list') || "[]");
addtodo0()


function addtodo0() {

  const inputElement0 = document.querySelector('.js-name-input0');
  const name = inputElement0.value.trim(); 

  const dateinputElement0 = document.querySelector('.js-date-input0');
  const date = dateinputElement0.value;

  if (name !== '') {
    todolist0.push({name,date}); 
    localStorage.setItem('list', JSON.stringify(todolist0))
  }

  let todolistHTML0 = '';

  todolist0.forEach((todoObject, index) => {
    const { name,date } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${date}</div>
      <button class="js-delete-button delete-button"> 
        Delete 
      </button>
    `;
    
    todolistHTML0 += html;
    })
    

    document.querySelector('.js-todo-list0')
      .innerHTML = todolistHTML0;

  
  inputElement0.value = '';

  document.querySelectorAll('.js-delete-button')
  .forEach((deleteButton,index) =>
    {deleteButton.addEventListener('click', () => { 
      todolist0.splice(index,1);
      addtodo0();
      localStorage.setItem('list', JSON.stringify(todolist0))
    })  ;
  });


}


document.querySelector('.js-add-button').addEventListener('click',addtodo0);

