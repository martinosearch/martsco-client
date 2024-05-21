import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventEmployee } from '../models/event-employee';
import { ConfirmDeleteComponent } from 'src/app/utilities/confirm-delete/confirm-delete.component';
import { EventAppService } from 'src/app/utilities/services/event-app.service';
import { RouteService } from 'src/app/utilities/services/route.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-journal-show',
  templateUrl: './journal-show.component.html',
  styleUrls: ['./journal-show.component.scss']
})
export class JournalShowComponent implements OnInit {
  displayedColumns = [
    'date',
    'user',
    'describ'
  ];
  liste: Observable<EventEmployee[]>;

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    private dataService: EventAppService,
    private router: Router,
    private routeService: RouteService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.liste = this.dataService.getAll();
  }

  onDelete(obj: EventEmployee) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
      data: { titre: 'Voulez- vous vraiment supprimer: ' + obj.description }
    });

    dialogRef.componentInstance.event.subscribe(response => {
      this.dataService.delete(obj.id).subscribe(resp => {
        console.log('deleted: ' + obj);
        this.refresh();
      });
      this.refresh();
    });
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
