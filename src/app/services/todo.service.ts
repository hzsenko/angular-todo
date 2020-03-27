import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from './../interfaces/todo';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosUrl = 'api/todos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
      .pipe(
        tap(_ => this.log('Fetched todos')),
        catchError(this.handleError<Todo[]>('getTodos', []))
      );
  }

  addTodo(todo: Todo): Observable<Todo> {
    this.log('Add todo');
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions);
  }

  deleteTodo(todo: Todo | number): Observable<Todo> {
    const id = typeof todo === 'number' ? todo : todo.id;
    const url = `${this.todosUrl}/${id}`;

    return this.http.delete<Todo>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log('Deleted todo')),
        catchError(this.handleError<Todo>('deletedHero'))
      );
  }

  searchTodos(term: string): Observable<Todo[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Todo[]>(`${this.todosUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ?
          this.log(`Found todos matching "${term}"`) :
          this.log(`No todos matching "${term}"`)),
          catchError(this.handleError<Todo[]>('searchTodos', []))
      );
  }

  private log(message: string) {
    this.messageService.add(`TodoService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
