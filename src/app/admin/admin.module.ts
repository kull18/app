import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { authGuard } from '../auth/auth.guard';
import { MyEventsUserComponent } from './my-events-user/my-events-user.component';

const adminRoutes: Route[] = [
  {
    path: 'event',
    component: EventComponent,
    canActivate: [authGuard]
  },
  {
    path: "events",
    component: EventsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'myEvents',
    component: MyEventsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'myEventsUser',
    component: MyEventsUserComponent,

  },
  {
    path: '',
    redirectTo: 'event',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminModule { }
