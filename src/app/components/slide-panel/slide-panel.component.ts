import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PaneType} from '../../app.component';

// export type PaneType = 'castle' | 'login' | 'city' | 'world';

@Component({
  selector: 'app-slide-panel',
  templateUrl: './slide-panel.component.html',
  styleUrls: ['./slide-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      state('city', style({ transform: 'translateY(-40%)'  })),
      state('world', style({ transform: 'translateY(-20%)' })),
      state('login', style( {transform: 'translateY(-80%)'})),
      state('castle', style({transform: 'translateY(-60%)'})),
      state('structure', style({transform: 'translateY(0)'})),
      transition('* => *', animate(0))
    ])]
})
export class SlidePanelComponent implements OnInit {

  @Input() activePane: PaneType;

  constructor() { }

  ngOnInit() {
  }

}
