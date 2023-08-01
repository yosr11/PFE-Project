import { Component, Input, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import { GeofenceService } from './geofence.service';
import { EditGeofenceComponent } from './editgeofence/editgeofence.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGeofenceComponent } from '../../form-geofence/form-geofence.component';

@Component({
  selector: 'app-geofence',
  templateUrl: './geofence.component.html',
  styleUrls: ['./geofence.component.scss']
})

export class GeofenceComponent implements OnInit {
  hasGeofence = false;
  constructor(private geofenceService: GeofenceService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef) { }
  latitude: number;
  longitude: number;
  speed: number;
  radius: number;
  @Input() element: any;
  circle: L.Circle;
  Geofence: any;
  ngOnInit() {
    L.Icon.Default.imagePath = "assets/images/leaflet/"
    // Retrieve the boat ID from session storage
    const deviceId = sessionStorage.getItem('boitier_imei')?.match(/\d+/)[0];
    const id_bateau = sessionStorage.getItem('id_bateau')?.match(/\d+/)[0];
    // Log the value of the ID variable to the console to check if it's a valid number
    console.log(deviceId);
    // Call the getnavigationById() method in the NavigationService
    this.geofenceService.getgeofenceByImei(deviceId).subscribe(data => {
      console.log('Les données de navigation ont été récupérées avec succès:', data);
      this.latitude = data.latitude;
      this.longitude = data.longitude;
      this.speed = data.speed_24;

      console.log('Latitude:', this.latitude);
      console.log('Longitude:', this.longitude);
      this.geofenceService.getRadius(parseInt(id_bateau)).subscribe(radius => {
        console.log('Radius:', radius);
        if (radius && radius.length > 0) {
          this.radius = Number(radius[0].radius);
          this.hasGeofence = true;
          const myMap = L.map('map-geofence').setView([this.latitude, this.longitude], 13);

          // Ajout d'une couche de tuiles OpenStreetMap
          console.log('La couche de tuiles OpenStreetMap a été ajoutée avec succès');
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            id: 'mapbox.streets'
          }).addTo(myMap);

          const marker = L.marker([this.latitude, this.longitude]).addTo(myMap);

          this.circle = L.circle([this.latitude, this.longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: this.radius
          }).addTo(myMap);

          setInterval(() => {
          }, 1000);
        } else {
          console.log('Le radius n\'est pas présent.');
          alert('pas de geofence pour ce bateau.');
          const myMap = L.map('map-geofence').setView([this.latitude, this.longitude], 13);
          console.log('La couche de tuiles OpenStreetMap a été ajoutée avec succès');
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            id: 'mapbox.streets'
          }).addTo(myMap);
          const marker = L.marker([this.latitude, this.longitude]).addTo(myMap);
          this.circle = L.circle([this.latitude, this.longitude], {
            color: 'transparent',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 0,
          }).addTo(myMap);
        }
      });
    });
  }
  refreshgeofence() {
    const id_bateau = sessionStorage.getItem('id_bateau')?.match(/\d+/)[0];
    if (id_bateau) {
      this.geofenceService.getRadius(parseInt(id_bateau)).subscribe((data) => {
        const newRadius = data[0].radius;
        console.log('New radius:', newRadius);

        // Mettre à jour le cercle de géofence avec la nouvelle valeur de rayon
        this.circle.setRadius(newRadius);
      });
    }
  }
  editGeofence() {
    const dialogRef = this.dialog.open(EditGeofenceComponent, {
     
      data: {
        GeofenceComponent: this,
              }
              
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'saved') {
        this.refreshgeofence();
      }
    });
  }


  AddGeofence() {
    const dialogRef = this.dialog.open(FormGeofenceComponent, {
      data: {
        GeofenceComponent: this
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'saved') {
        this.refreshgeofence();
      }
    });
  }


}










