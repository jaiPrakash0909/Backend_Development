export const todos = []
export const auditlog = []

let nextId = 1

export function creatTodo(title) {
    const todo = {id: nextId++, title, completed: false}
    todos.push(todo)
    return todo;
}

export function getTodos(id) {
    return todos.find(todo => todo.id === id)
}

export function updateTodo(id, patch) {
    const todo = getTodos(id)
    if(!todo) return null
    if(patch.title !== undefined) todo.title = patch.title
    if(patch.completed !== undefined) todo.completed = patch.completed
    return todo
}

export function deleteTodo(id) {
    const index = todos.findIndex(todo => todo.id === id)
    if(index === -1) return false
    return todos.splice(index, 1)[0]
}
