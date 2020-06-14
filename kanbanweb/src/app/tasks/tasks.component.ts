import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  nextID: number;
  newTaskForm = new FormGroup({
    formTaskName: new FormControl(''),
    formTaskDescription: new FormControl(''),
    formTaskStatus: new FormControl(''),
    formTaskNotes: new FormControl('')
  });

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
    this.nextID = this.tasks.length + 1;
    console.log(this.tasks);
    console.log(this.nextID);
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter((t) => t !== task);
    this.taskService.deleteTask(task).subscribe();
  }

  add(TaskName: string, Description: string, Status: string,
      Notes: string, Archived: boolean = false/*, Creator: string, Owner: string*/): void {
    TaskName = TaskName.trim();
    Description = Description.trim();
    Status = Status;
    Notes = Notes.trim();
    // Creator = Creator.trim();
    // Owner = Owner.trim();
    if (!TaskName) {
      return;
    }
    this.taskService.addTask({TaskName, Description, Status, Notes, Archived/*, Creator, Owner*/ } as Task).subscribe((task) => {
      this.tasks.push(task);
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.newTaskForm.value);
  }

}
