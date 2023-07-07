document.addEventListener('DOMContentLoaded', function() {
  const todoInput = document.getElementById('todo-input');
  const addBtn = document.getElementById('add-btn');
  const todoList = document.getElementById('todo-list');
  const filterButtons = document.querySelectorAll('.filter-btn');

  addBtn.addEventListener('click', addTodo);

  todoList.addEventListener('click', toggleTodo);

  todoList.addEventListener('keydown', function(event) {
    const todoItem = event.target.closest('li');
    if (event.key === 'Enter') {
      toggleTodoItem(todoItem);
    } else if (event.key === 'Backspace' || event.key === 'Delete') {
      deleteTodoItem(todoItem);
    }
  });

  filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const filter = button.dataset.filter;
      const todoItems = todoList.getElementsByTagName('li');
      for (let i = 0; i < todoItems.length; i++) {
        const todoItem = todoItems[i];
        todoItem.style.display = 'block';
        if (filter === 'active' && todoItem.classList.contains('completed')) {
          todoItem.style.display = 'none';
        } else if (filter === 'completed' && !todoItem.classList.contains('completed')) {
          todoItem.style.display = 'none';
        }
      }
    });
  });

  function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
      const li = createTodoItem(todoText);
      todoList.appendChild(li);
      todoInput.value = '';
    }
  }

  function createTodoItem(text) {
    const li = document.createElement('li');
    const todoTextSpan = document.createElement('span');
    todoTextSpan.innerText = text;
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', function() {
      deleteTodoItem(li);
    });
    li.appendChild(todoTextSpan);
    li.appendChild(deleteBtn);
    return li;
  }

  function toggleTodo() {
    const todoItem = event.target.closest('li');
    toggleTodoItem(todoItem);
  }

  function toggleTodoItem(todoItem) {
    if (todoItem) {
      todoItem.classList.toggle('completed');
    }
  }

  function deleteTodoItem(todoItem) {
    if (todoItem) {
      todoItem.remove();
    }
  }
});