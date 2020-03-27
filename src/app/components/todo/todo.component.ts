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
  @Output() onChanges = new EventEmitter<Todo>();
  @Output() onUpdate = new EventEmitter<Todo>();

  constructor(public dialog: MatDialog, public todoService: TodoService) { }

  changeTodos(result: Todo) {
    this.onChanges.emit(result);
  }

  updateTodos(result: Todo) {
    this.onUpdate.emit(result);
  }

  closeTask(todo: Todo) {
    this.updateTodos(todo);
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: this.todo
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.changeTodos(result);
      }
      console.log('The dialog was closed', result);
    });
  }

  ngOnInit(): void {
  }
}
