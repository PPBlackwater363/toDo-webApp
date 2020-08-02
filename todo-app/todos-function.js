'use strict'

// Fetch existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        return []
    }
}

// Save todos to localStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Remove the todo item by id
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((TODO) => TODO.id == id)

    if (todoIndex > - 1) {
        todos.splice(todoIndex, 1)
    }
}

// Toggle the completed value for a given todo
const toggleTodo = (id) => {
    const todo = todos.find((TODO) => TODO.id == id)

    if (todo) {
        todo.completed = !todo.completed
    }
}

// Get the DOM elements for an individual note
const generateTodoDom = (TODO) => {
    const todoEl = document.createElement('div')
    const todoText = document.createElement('span')
    const checkbox = document.createElement('input')
    const removeButton = document.createElement('button')

    // setup checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = TODO.completed
    todoEl.appendChild(checkbox)
    checkbox.addEventListener('change', function() {
        toggleTodo(TODO.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    
    // setup the todo text
    todoText.textContent = TODO.text
    todoEl.appendChild(todoText)

    // setup the remove button
    removeButton.textContent = 'x'
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(TODO.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    return todoEl
}

// Render application todos based on filters
const renderTodos = (todos, filters) => {
    const filteredToDos = todos.filter((todo) => {
        const searchTextMacth = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMacth && hideCompletedMatch
    })

    const incompleteTodos = filteredToDos.filter((todo) => !todo.completed)

    document.querySelector('#todos').innerHTML = ''

    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

    filteredToDos.forEach((TODO) => {
        document.querySelector('#todos').appendChild(generateTodoDom(TODO))
    }) 
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}

