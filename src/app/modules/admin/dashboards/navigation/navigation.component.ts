// fichier TypeScript
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { NavigationService } from './navigation.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-navigation-bateaux',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
 
  constructor(private navigationService:NavigationService,
               private route:ActivatedRoute,
               private http:HttpClient) { }
  latitude:number;
  longitude:number;
  speed:number;
  //id_bateau:number;
  
 
  
  ngOnInit()  {
    L.Icon.Default.imagePath = "assets/images/leaflet/";
    const mapContainer = document.getElementById('mapid');
  if (mapContainer) {
    // Retrieve the boat ID from session storage
    const deviceId = sessionStorage.getItem('boitier_imei')?.match(/\d+/)[0];

    // Log the value of the ID variable to the console to check if it's a valid number
    console.log(deviceId);

    // Call the getnavigationById() method in the NavigationService
    this.navigationService.getnavigationById(deviceId).subscribe(data => {
      if (data && data.latitude && data.longitude) {
      //console.log('Les données de navigation ont été récupérées avec succès:', data);
      this.latitude = data.latitude;
      this.longitude = data.longitude;
      this.speed=data.speed_24;
      const date = new Date().toISOString();
      console.log('Latitude:', this.latitude);
      console.log('Longitude:', this.longitude);
      
      const myMap = L.map('mapid').setView([this.latitude, this.longitude], 13);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        id: 'mapbox.streets'
      }).addTo(myMap);
  
      const marker = L.marker([this.latitude, this.longitude]).addTo(myMap);
     
      setInterval(() => {
        this.latitude = +marker.getLatLng().lat.toFixed(2);
        this.longitude = +marker.getLatLng().lng.toFixed(2);
        this.speed;
        this.saveLocationToMySQL(this.latitude, this.longitude, date);
      },5000);
      
  }});
  
 
}}
saveLocationToMySQL(latitude: number, longitude: number, date: string): void {
  const imei = sessionStorage.getItem('boitier_imei')?.match(/\d+/)[0];

  const location = {
    latitude,
    longitude,
    date,
    imei
  };

  this.http.post(`http://localhost:3000/history/${imei}`, location).subscribe(
    (response: any) => {
      console.log('Location saved to MySQL:', response.message);
    },
    (error: any) => {
      console.error('Error saving location to MySQL:', error);
    }
  );
}
}





  





 

