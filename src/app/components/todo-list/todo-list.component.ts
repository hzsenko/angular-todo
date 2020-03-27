import { Component, OnInit } from '@angular/core';
import { Todo } from '../../interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: Todo[];
  name: string;
  description: string;

  constructor(private todoService: TodoService) { }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => this.todos = todos);
  }

  addTodo(name: string, description: string): void {
    if (!name || !description) { return; }

    name = name.trim();
    description = description.trim();

    this.todoService.addTodo({name, description } as Todo)
      .subscribe(todo => this.todos.push(todo));
  }

  onUpdate(todo: Todo) {
    this.todos.map(item => (item.id === todo.id) ? item.done = true : '');
  }

  onChanges(data: Todo) {
    this.todos = this.todos.filter(h => h !== data);
  }

  ngOnInit(): void {
    this.getTodos();
  }
}
