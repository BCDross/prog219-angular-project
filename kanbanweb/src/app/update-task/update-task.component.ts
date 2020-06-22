import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
  task: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskService.getTask(id).subscribe((task) => (this.task = task));
  }

  goBack(): void {
    this.location.back();
  }

  update(TaskName: string, Description: string, Status: string,
         Notes: string, Archived: string): void {
    this.task.TaskName = TaskName.trim();
    this.task.Description = Description.trim();
    this.task.Status = Status.trim();
    this.task.Notes = Notes.trim();
    this.task.Archived = Archived.trim();
    this.taskService.updateTask(this.task)
    .subscribe(() => this.goBack());
  }

  delete(): void {
    this.taskService.deleteTask(this.task)
    .subscribe(() => this.goBack());
  }

}
