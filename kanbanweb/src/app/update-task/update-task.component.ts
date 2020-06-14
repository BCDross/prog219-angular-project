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
    const id = +this.route.snapshot.paramMap.get('TaskID');
    this.taskService.getTask(id).subscribe();
  }

  goBack(): void {
    this.location.back();
  }


  update(): void {
    this.taskService.updateTask(this.task)
    .subscribe(() => this.goBack());
  }

  delete(): void {
    this.taskService.deleteTask(this.task)
    .subscribe(() => this.goBack());
  }

}
