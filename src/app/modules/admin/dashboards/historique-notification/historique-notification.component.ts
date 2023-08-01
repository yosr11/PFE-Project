import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-historique-notification',
  templateUrl: './historique-notification.component.html',
  styleUrls: ['./historique-notification.component.scss']
})
export class HistoriqueNotificationComponent {
  notifications: any[] = [];
  selectedDate: Date;
  constructor(private http: HttpClient) {}

  dateChanged(event: any) {
    const date = event.value.toISOString().slice(0, 10);
    const id_client=Number(sessionStorage.getItem('id_client').match(/\d+/)[0]);
    this.http.get<any[]>(`http://localhost:3000/notification/${id_client}/${date}`).subscribe({
      next: (response) => {
        console.log(response);
        this.notifications = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
