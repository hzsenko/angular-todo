import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from '../interfaces/todo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const todos = [  {
      id: 1,
      name: 'Learn JS',
      description: 'Учить JS',
      done: false,
    },
    {
      id: 2,
      name: 'Learn PHP',
      description: 'Учить PHP',
      done: false,
    },
    {
      id: 3,
      name: 'Learn Angular',
      description: 'Учить Angular',
      done: false,
    },
    {
      id: 4,
      name: 'Bugfix',
      description: 'Фиксить баги',
      done: false,
    }];
    return {todos};
  }

  genId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 11;
  }
}
