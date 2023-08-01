import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.scss']
})
export class MeteoComponent {
  apikey = 'd86bc4a0527601a0bd362a0ce7d8f765';
  
  weatherData: any;
  forecastData: any;
  city: string = '';
  temperature: string = '';
  clouds: string = '';
  iconUrl: string = '';
  hourForecastList: any[] = [];
  dayForecastList: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCurrentLocationWeather();
  }

  getCurrentLocationWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apikey}`;

        this.http.get(url).subscribe((data) => {
         
          console.log(data);
          this.weatherReport(data);
        });
      });
    }
  }
  

  searchByCity(){
  
    var place=(<HTMLInputElement> document.getElementById('input')).
    value;
   var urlsearch=`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${this.apikey}`;
 console.log(place);
 this.http.get(urlsearch).subscribe((data) => {
         
  console.log(data);
  this.weatherReport(data);
});
    
    (<HTMLInputElement>document.getElementById('input')).value='';
  }
  
  weatherReport(data: any) {
    var urlcast = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&` + `appid=${this.apikey}`;
    

    this.http.get(urlcast).subscribe((forecast) => {
      console.log(forecast);
      this.hourForecast(forecast);
      this.dayForecast(forecast);
      
      document.getElementById('city').
      innerText=data.name+ ', '+data.sys.country;
      console.log(data.name, data.sys.country);

      console.log(Math.floor(data.main.temp - 273));
      document.getElementById('temperature').
      innerText = Math.floor(data.main.temp - 273) + ' °C';

      document.getElementById('clouds').
      innerText = data.weather[0].description;
      console.log(data.weather[0].description);
     
      let icon = data.weather[0].icon;
      let iconurl = `https://api.openweathermap.org/img/w/`+ icon + '.png';;
      (<HTMLImageElement>document.getElementById('img')).src = iconurl;
    });
  }

  hourForecast(forecast: any) {
    document.querySelector('.templist').innerHTML=''
    for (let i = 0; i < 5; i++) {

        var date= new Date(forecast.list[i].dt*1000)
        console.log((date.toLocaleTimeString(undefined,{timeZone:'Africa/Tunis'})).replace(':00',''))

        let hourR=document.createElement('div');
        hourR.setAttribute('class','next');

        let div= document.createElement('div');
        let time= document.createElement('p');
        time.setAttribute('class','time')
        time.innerText= (date.toLocaleTimeString(undefined,{timeZone:'Africa/Tunis'})).replace(':00','');

        let temp= document.createElement('p');
        temp.innerText= Math.floor((forecast.list[i].main.temp_max - 273))+ ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273))+ ' °C';

        div.appendChild(time)
        div.appendChild(temp)

        let desc= document.createElement('p');
        desc.setAttribute('class','desc')
        desc.innerText= forecast.list[i].weather[0].description;

        hourR.appendChild(div);
        hourR.appendChild(desc)
        document.querySelector('.templist').appendChild(hourR);
  }
}

  dayForecast(forecast: any) {
    document.querySelector('.weekF').innerHTML=''
    for (let i = 8; i < forecast.list.length; i+=8) {
        console.log(forecast.list[i]);
        let div= document.createElement('div');
        div.setAttribute('class','dayF');
        
        let day= document.createElement('p');
        day.setAttribute('class','date')
        day.innerText= new Date(forecast.list[i].dt*1000).toLocaleDateString(undefined,{timeZone:'Africa/Tunis'})
        div.appendChild(day);

        let temp= document.createElement('p');
        temp.innerText= Math.floor((forecast.list[i].main.temp_max - 273))+ ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273))+ ' °C';
        div.appendChild(temp)

        let description= document.createElement('p');
        description.setAttribute('class','desc')
        description.innerText= forecast.list[i].weather[0].description;
        div.appendChild(description);

        document.querySelector('.weekF').appendChild(div)
    }
  }
}
