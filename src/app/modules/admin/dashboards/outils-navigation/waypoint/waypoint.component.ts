import { Component } from '@angular/core';
import * as L from 'leaflet';
import { MatDialog } from '@angular/material/dialog';
import { FormWaypointComponent } from '../../form-waypoint/form-waypoint.component';
import { WaypointService } from './waypoint.service';
import { WaypointDialogComponent } from '../../waypoint-dialog/waypoint-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { waypoint } from '../../waypoint-dialog/waypoint-dialog.component';
import { WaypointDialogService } from '../../waypoint-dialog/waypoint-dialog.service';
@Component({
  selector: 'app-waypoint',
  templateUrl: './waypoint.component.html',
  styleUrls: ['./waypoint.component.scss']
})
export class WaypointComponent {
  myMap: L.Map;
  dataSource = new MatTableDataSource<waypoint>([]);
  constructor(public dialog: MatDialog, private waypointService: WaypointService,
    private WaypointDialogService:WaypointDialogService) { 
    //this.refreshwaypoint = this.refreshwaypoint.bind(this);
  }
  latitude: number;
  longitude: number;
  vitesse: number;
  id_bateau: number; 
  

  ngOnInit() {
    L.Icon.Default.imagePath = "assets/images/leaflet/";
  
    // Retrieve the boat ID from session storage
    const id_bateau = sessionStorage.getItem('id_bateau');
  
    // Log the value of the ID variable to the console to check if it's a valid number
    console.log(id_bateau);
  
    // Initialiser la carte
    this.waypointService.getwaypointById(parseInt(id_bateau)).subscribe(data => {
      console.log('Les données de navigation ont été récupérées avec succès:', data);
      if (data.length > 0) {
      // Create a new Leaflet map centered on the first waypoint
      const myMap = L.map('map').setView([data[0].latitude, data[0].longitude], 6);
      this.myMap = myMap;
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(myMap);
  
      // Add a marker for each waypoint to the map
      data.forEach(waypoint => {
        const marker = L.marker([waypoint.latitude, waypoint.longitude]).addTo(myMap);
        setInterval(() => {
          waypoint.latitude = +marker.getLatLng().lat.toFixed(2);
          waypoint.longitude = +marker.getLatLng().lng.toFixed(2);
        }, 1000);
      });}
      else {
        // Create a new Leaflet map centered on the default location
        const myMap = L.map('map').setView([36.666, 21.666], 6);
        this.myMap = myMap;
  
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(myMap);
      }
    });
  }
  
  refreshwaypoint() {
    const id_bateau = Number(sessionStorage.getItem('id_bateau')?.match(/\d+/)[0]);
    if (id_bateau) {
      this.waypointService.getwaypointById(id_bateau).subscribe((data) => {
        this.dataSource.data = data; // stocker les données dans data.waypoints
        
        // Ajouter un marqueur pour chaque waypoint à la carte
        data.forEach(waypoint => {
          const marker = L.marker([waypoint.latitude, waypoint.longitude]).addTo(this.myMap);
          setInterval(() => {
            if (marker && marker.getLatLng) {
              waypoint.latitude = +marker.getLatLng().lat.toFixed(2);
              waypoint.longitude = +marker.getLatLng().lng.toFixed(2);
            }
          }, 1000);
        });
        
      });
    }
  }
  addwaypoint() {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log('Latitude: ' + latitude);
      console.log('Longitude: ' + longitude);
    
    const dialogRef = this.dialog.open(FormWaypointComponent,{
      data: { WaypointComponent: this }
    });
   
  });
  }

  list() {
    const dialogRef = this.dialog.open(WaypointDialogComponent, {
      width: '600px',
      //data: {WaypointComponent: this }
    });
    // Récupérez les données de la liste de waypoints
  const id_bateau = Number(sessionStorage.getItem('id_bateau')?.match(/\d+/)[0]);
  if (id_bateau) {
    this.WaypointDialogService.getwaypointById(id_bateau).subscribe((data: waypoint[]) => {
      // Initialisez la propriété dataSource avec les données récupérées
      dialogRef.componentInstance.dataSource.data = data;
    });
  }
  }
  
}
