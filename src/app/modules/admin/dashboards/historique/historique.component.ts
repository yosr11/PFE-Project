import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { HistoriqueService } from './historique.service';
import { HistoriqueDialogComponent } from './historique-dialog/historique-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})

export class HistoriqueComponent implements OnInit{

  constructor(private historiqueService: HistoriqueService,
    private dialog:MatDialog){}
  private map: L.Map;
  private trajectoryLayer: L.Polyline;
  
  
  ngOnInit(): void {
    L.Icon.Default.imagePath = "assets/images/leaflet/";
   
    const myMap = L.map('mapiid').setView([36.666, 21.666],3);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      id: 'mapbox.streets'
    }).addTo(myMap);

    // Ajoutez d'autres éléments à votre carte ici, tels que des marqueurs, des cercles, des polygones, etc.

    this.map = myMap;
  }
  dateChanged($event): void {
    const imei = Number(sessionStorage.getItem('boitier_imei')?.match(/\d+/)[0]);
    const selectedDate: Date = $event.value;
    const selectedDateStr: string = selectedDate.toISOString().slice(0, 10);
    console.log(selectedDateStr);
    this.historiqueService.getTrajet(imei, selectedDateStr).subscribe(
      data => {
        console.log('data',data);
        const latLngs: L.LatLng[] = data.map(d => L.latLng(d.latitude, d.longitude));
        this.trajectoryLayer.setLatLngs(latLngs);
        this.map.fitBounds(this.trajectoryLayer.getBounds());
      },
      (error:any) => {
        
          // Afficher la boîte de dialogue d'erreur
          this.dialog.open(HistoriqueDialogComponent, {
            data: { message: 'Le bateau n\'a pas navigué à la date sélectionnée.' }
          });
       
      }
    );
  }
  

  ngAfterViewInit(): void {
    // Add the trajectory layer to the map after the view is initialized
    this.trajectoryLayer = L.polyline([], { color: 'red' }).addTo(this.map);
  }
  
  
}

