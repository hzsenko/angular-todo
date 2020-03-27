import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Todo } from 'src/app/interfaces/todo';
import { DialogComponent } from '../dialog/dialog.component';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;
  @Output() delete = new EventEmitter<Todo>();
  @Output() update = new EventEmitter<Todo>();

  constructor(public dialog: MatDialog, public todoService: TodoService) { }

  closeTask(todo: Todo) {
    this.updateTodos(todo);
  }

  updateTodos(result: Todo) {
    this.update.emit(result);
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: this.todo
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) { this.changeTodos(result); }
    });
  }

  changeTodos(result: Todo) {
    this.delete.emit(result);
  }

  ngOnInit(): void {
  }
}
