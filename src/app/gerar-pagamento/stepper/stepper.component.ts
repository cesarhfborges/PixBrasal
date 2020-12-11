import {Component, Input, OnInit} from '@angular/core';
import {Step} from '../../shared/models/step';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {

  @Input() steps: Step[];
  @Input() atual: number = 0;

  constructor() { }

  ngOnInit() {}

}
