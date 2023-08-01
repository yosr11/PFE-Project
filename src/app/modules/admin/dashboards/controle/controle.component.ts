import { Component, OnInit, ViewChild, ElementRef , Renderer2,Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';
import Xrange from 'highcharts/modules/xrange';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListeBateauxService } from '../liste-bateaux/liste-bateaux.service';
//import { ControleService } from './controle.service';
HighchartsMore(Highcharts);// Activation du module Highcharts More
SolidGauge(Highcharts);// Activation du module Solid Gauge
Xrange(Highcharts)// Activation du module Xrange

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.scss']
})
export class ControleComponent implements OnInit {
  devices: Observable<any[]>;
  fuel_9: number = 0;
  speed_24: number = 0;
 boitier_imei:string;
 batteryLevel: number;
 gsmSignal:number;
bars:number[];
gnssStatut:number;
imei:string;
batteryVoltage:number;
  constructor(private realtime: AngularFireDatabase,
    private http: HttpClient,
    private listeBateauxService: ListeBateauxService,
    private el: ElementRef,
    private renderer: Renderer2
    ) {
    this.devices = this.realtime.list('devices').valueChanges();
  }


  //highcharts//
  @ViewChild('chart', { static: true }) chartElement: ElementRef;
  chart: Highcharts.Chart;

  @ViewChild('chartSpeed', { static: true }) chartSpeedElement: ElementRef;
  chartSpeed: Highcharts.Chart;

  options: Highcharts.Options = {
    chart: {
      type: 'solidgauge',
    },
    title: {
      text: 'carburant',
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: 'Valeur',
      },
      labels: {
        enabled: false, // Désactive les étiquettes d'axe
      },
      stops: [
        [0.1, '#55BF3B'], // green
        [0.5, '#DDDF0D'], // yellow
        [0.9, '#DF5353'], // red
      ],
      lineWidth: 0, // Supprime les lignes de l'axe
      tickWidth: 0, // Supprime les marqueurs de l'axe
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Valeur',
        data: [this.fuel_9],
        dataLabels: {
          format:
            '<div style="text-align:center"><span style="font-size:25px;color:' +
            ((Highcharts as any).theme && (Highcharts as any).theme.contrastTextColor || 'black') +
            '">{y}</span><br/>' +
            '<span style="font-size:12px;color:silver">%</span></div>',
          y: -30,
        },
        tooltip: {
          valueSuffix: '%',
        },
        type: 'solidgauge',
      },
    ],
  };
  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'gauge'
      
    },
    title: {
      text: 'speed'
    },
    pane: {
      startAngle: -150,
      endAngle: 150,
      background: [
        {
          // Fond du graphique de jauge
          backgroundColor: '#03224c',
          borderWidth: 0,
          outerRadius: '109%',
          innerRadius: '107%'
        }
      ]
    },
    yAxis: {
      min: 0,
      max: 100,
      labels: {
        style: {
          color: '#ffa633' // Couleur des degrés de la jauge
        }
      },
      plotBands: [
        {
          from: 0,
          to: 60,
          className: 'green-plot-band',
          color: 'rgba(85, 191, 59, 0.8)', // green
          thickness: '20',
          borderWidth: 0
        },
        {
          from: 60,
          to: 80,
          className: 'yellow-plot-band',
          color: 'rgba(221, 223, 13, 0.8)', // yellow
          thickness: '20',
          borderWidth: 0
        },
        {
          from: 80,
          to: 100,
          className: 'red-plot-band',
          color: 'rgba(223, 83, 83, 0.8)', // red
          thickness: '20',
          borderWidth: 0
        }
      ]
    },
    series: [
      {
        name: 'Valeur',
        data: [this.speed_24],

        tooltip: {
          valueSuffix: 'Km/h'
        },
        type: 'gauge',
      }
    ]
  }
  getFuel(deviceId: string) {
    const fuelRef = this.realtime.object(`/devices/${deviceId}/fuel_9`);
    fuelRef.valueChanges().subscribe(fuel => {
      console.log(`Fuel value for device ${deviceId}: ${fuel}`);
      if (fuel !== undefined) {
        const point = this.chart.series[0].points[0]; // Get the point of the series for fuel
        point.update(fuel); // Update the point with the new value
        //this.fuel_9 = fuel; // Update the component variable with the new value
      }
    });
  }
 
  getSpeed(deviceId:string){
    const speedRef = this.realtime.object(`/devices/${deviceId}/speed_24`);
    speedRef.valueChanges().subscribe(speed => {
      console.log(`Fuel value for device ${deviceId}: ${speed}`);
      if (speed !== undefined) {
        const point = this.chartSpeed.series[0].points[0]; // Get the point of the series for fuel
        point.update(speed); // Update the point with the new value
      }
    });
      }
      

      getBattery(deviceId: string) {
        const level = this.realtime.object<number>(`/devices/${deviceId}/battery_voltage_113`);
        level.valueChanges().subscribe((level: number) => {
            console.log(`Battery level value for device ${deviceId}: ${level}`);
            this.batteryLevel = level;
            const batteryPercentage = level * 100 / 100; // Assumer que le niveau de batterie est une valeur de 0 à 100
    
            // Mettre à jour le style de l'icône de batterie en fonction du niveau de remplissage
            const percentageElement = this.el.nativeElement.querySelector('.percentage');
            percentageElement.style.setProperty('--battery-level', `${batteryPercentage}%`);
        });
    }
    
    
    getSignal(deviceId:string){
      const signal = this.realtime.object<number>(`/devices/${deviceId}/gsm_signal_21`);
      signal.valueChanges().subscribe((signal: number) => {
          console.log(`gsm signal value for device ${deviceId}: ${signal}`);
          this.gsmSignal = signal;
          this.updateBars();
    });
  }
  updateBars() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
      if (index < this.gsmSignal) {
        bar.classList.remove('inactive');
        bar.classList.add('active');
      } else {
        bar.classList.remove('active');
        bar.classList.add('inactive');
      }
    });
  }
  getGnss(deviceId:string){
    const gnss = this.realtime.object<number>(`/devices/${deviceId}/gnss_status_69`);
    gnss.valueChanges().subscribe((gnss: number) => {
        console.log(`gnss value for device ${deviceId}: ${gnss}`);
        this.gnssStatut = gnss;
       
  });
  }

  getImei(deviceId: string) {
    const device = this.realtime.object<number>(`/devices`);
    console.log(`imei value for device : ${deviceId}`); 
    this.imei=deviceId;
  }

  getBatteryBoat(deviceId:string){
    const batterie = this.realtime.object<number>(`/devices/${deviceId}/unplug_detection_252`);
    batterie.valueChanges().subscribe((batterie: number) => {
        console.log(`batterie value for device ${deviceId}: ${batterie}`);
        this.batteryVoltage = batterie;
       
  });
  } 

  ngOnInit() {
    this.chart = Highcharts.chart(this.chartElement.nativeElement, this.options);
    this.chartSpeed = Highcharts.chart(this.chartSpeedElement.nativeElement, this.chartOptions);
    this.devices.subscribe((data) => {
      console.log('Data from Firebase:', data);
      this.getFuel( this.boitier_imei = sessionStorage.getItem('boitier_imei')?.match(/\d+/)[0]);
      this.getSpeed( this.boitier_imei = sessionStorage.getItem('boitier_imei')?.match(/\d+/)[0]);
      this.getBattery(this.boitier_imei = sessionStorage.getItem('boitier_imei')?.match(/\d+/)[0]);
      this.getSignal(this.boitier_imei = sessionStorage.getItem('boitier_imei')?.match(/\d+/)[0]);
      this.getGnss(this.boitier_imei = sessionStorage.getItem('boitier_imei')?.match(/\d+/)[0]);
      this.getImei(this.boitier_imei = sessionStorage.getItem('boitier_imei')?.match(/\d+/)[0]);
      this.getBatteryBoat(this.boitier_imei = sessionStorage.getItem('boitier_imei')?.match(/\d+/)[0]);
    });
    
  }
}







