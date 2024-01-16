import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NetappNavigationComponent } from '../netapp-navigation/netapp-navigation.component';
import { NetappTableComponent } from '../netapp-table/netapp-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'netapp-netapp-dashboard',
  templateUrl: './netapp-dashboard.component.html',
  styleUrl: './netapp-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    NetappNavigationComponent,
    NetappTableComponent,
    JsonPipe,
    MatProgressSpinnerModule,
  ],
})
export class NetappDashboardComponent {}
