import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NetappTableComponent } from './components/netapp-table/netapp-table.component';
import { NetappDashboardComponent } from './components/netapp-dashboard/netapp-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    NetappTableComponent,
    NetappDashboardComponent,
    MatGridListModule,
  ],
  selector: 'netapp-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'netapp';
}
