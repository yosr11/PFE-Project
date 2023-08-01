import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SosService } from './sos.service';
import { environment } from 'environments/environment';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { NotificationsComponent } from 'app/layout/common/notifications/notifications.component';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';
import { Notification } from 'app/layout/common/notifications/notifications.types';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sos',
  templateUrl: './sos.component.html',
  styleUrls: ['./sos.component.scss']
})
export class SOSComponent {
  @ViewChild(NotificationsComponent) notificationsComponent: NotificationsComponent;
  notification: any = null;
  notifications: Notification[] = [];
  showNotificationMenu: boolean = false;
  constructor(private http: HttpClient,
    private sosService: SosService,
    private notificationsService: NotificationsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.requestPermission();
    this.listen();
  }
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging,
      { vapidKey: environment.firebase.vapidKey }).then(
        (currentToken) => {
          if (currentToken) {
            console.log("Hurraaa!!! we got the token.....");
            console.log(currentToken);
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      const sos = localStorage.getItem('sos') === '1'; // vérifie la valeur de SOS

      if (sos) { // Traiter la notification uniquement si SOS est actif
        this.notification = payload;

        const now = new Date();
        const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
        const time = `${now.getHours()}:${now.getMinutes()}`;

        this.toastr.info(`Le client a envoyé une SOS - Message reçu le ${date} à ${time}`, 'Nouvelle notification', {
          timeOut: 5000,
        });
        const audio = new Audio('/assets/sound/sound-notification.mp3');
        audio.play();
        //const latitude = payload.notification?.latitude;
        //const longitude = payload.notification?.longitude;
        //const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const notificationOptions = {
          title: 'Nouvelle notification',
          message: `Le client a envoyé une SOS`,
          timestamp: new Date(),
          isRead: false,
          imei: payload.data?.imei,
          id_client: payload.data?.id_client
        };

        this.notifications.push(notificationOptions);
        this.notificationsService.addNotification(notificationOptions);
        this.sosService.sendNotification(notificationOptions).subscribe(
          (response) => {
            console.log('Notification envoyé:', response);
          },
          (error) => {
            console.error('Error sending :', error);
          }
        );
      }
    });
  }
  sendSOS() {
    const boitier_imei = Number(sessionStorage.getItem('boitier_imei')?.match(/\d+/)[0]);
    console.log(boitier_imei);

    // Get the client's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude, longitude);

        this.sosService.sendSOS(boitier_imei)
          .then(() => {
            console.log('SOS envoyé avec succès');
          })
          .catch((error) => console.error('Erreur lors de l\'envoi du SOS :', error));
        const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

        const body = {
          notification: {
            //title: 'Nouvelle notification ',
            body: `Le client a envoyé une SOS. Cliquez ici pour voir sa position : ${mapLink}`,
            click_action: 'http://localhost:4200/notifications',
            sound: 'default',
            data: {
              latitude: latitude,
              longitude: longitude
            }, // Include the client's location in the payload
          },
          to: 'cTDfUO7qHkkyJ1bR8OnDXY:APA91bFRITCy8dYURwO2HMs2ryYYBP9nfOIgGKHDGXxIrfPbhgjicXSqnIQUeU-GahqSyERqwMOqe1TwhATaAiF7OnwSzzFid8-PUC0t9-hcLUM6unl-LbXPgS5gpifKzp9OFwcJQzWM'
        };

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `key=${environment.firebase.serverKey}`
        };

        this.http.post('https://fcm.googleapis.com/fcm/send', body, { headers }).subscribe(
          (response) => {
            console.log('Notification sent:', response);

          },
          (error) => {
            console.error('Error sending notification:', error);
          }
        );
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}