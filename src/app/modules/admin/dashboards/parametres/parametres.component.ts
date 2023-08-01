import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss']
})
export class ParametresComponent {
  constructor(private http: HttpClient) {
  }
  @Output() changed = new EventEmitter<boolean>();
  checked: boolean = false;


  updatePump(checked: boolean) {
    localStorage.setItem('pump', checked ? '1' : '0');

    let url = `http://localhost:3000/params/pump`;
    let value = this.checked ? 1 : 0;
    this.http.put(url, { pump: value }).subscribe(
      (response: any) => {
        console.log(response.message);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  updatemouillage(checked: boolean) {
    localStorage.setItem('ancher', checked ? '1' : '0');

    let url = `http://localhost:3000/params/ancher`;
    let value = this.checked ? 1 : 0;
    this.http.put(url, { ancher: value }).subscribe(
      (response: any) => {
        console.log(response.message);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  updateSecurity(checked: boolean) {
    localStorage.setItem('alarm', checked ? '1' : '0');

    let url = `http://localhost:3000/params/alarm`;
    let value = checked ? 1 : 0;
    this.http.put(url, { alarm: value }).subscribe(
      (response: any) => {
        console.log(response.message);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  updatePorte(checked: boolean) {
    localStorage.setItem('door', checked ? '1' : '0');

    let url = `http://localhost:3000/params/door`;
    let value = this.checked ? 1 : 0;
    this.http.put(url, { door: value }).subscribe(
      (response: any) => {
        console.log(response.message);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  updateFumee(checked: boolean) {
    localStorage.setItem('smoke', checked ? '1' : '0');

    let url = `http://localhost:3000/params/smoke`;
    let value = this.checked ? 1 : 0;
    this.http.put(url, { smoke: value }).subscribe(
      (response: any) => {
        console.log(response.message);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  updateSOS(checked: boolean) {
    localStorage.setItem('sos', checked ? '1' : '0');

    let url = `http://localhost:3000/params/sos`;
    let value = this.checked ? 1 : 0;
    this.http.put(url, { sos: value }).subscribe(
      (response: any) => {
        console.log(response.message);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  updateVol(checked: boolean) {
    localStorage.setItem('antitheft', checked ? '1' : '0');

    let url = `http://localhost:3000/params/vol`;
    let value = this.checked ? 1 : 0;
    this.http.put(url, { vol: value }).subscribe(
      (response: any) => {
        console.log(response.message);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  updateMvt(checked: boolean) {

    localStorage.setItem('mouvement', checked ? '1' : '0');

    let url = `http://localhost:3000/params/movement`;
    let value = this.checked ? 1 : 0;
    this.http.put(url, { movement: value }).subscribe(
      (response: any) => {
        console.log(response.message);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  ngOnInit() {
    const mvtState = localStorage.getItem('mouvement');
    if (mvtState === '1') {
      // cocher la checkbox
      const checkbox = document.getElementById('toggle-button-checkbox-8') as HTMLInputElement;
      checkbox.checked = true;
    }
    const pump = localStorage.getItem('pump');
    if (pump === '1') {
      // cocher la checkbox
      const checkbox = document.getElementById('toggle-button-checkbox-1') as HTMLInputElement;
      checkbox.checked = true;
    }
    const ancher = localStorage.getItem('ancher');
    if (ancher === '1') {
      // cocher la checkbox
      const checkbox = document.getElementById('toggle-button-checkbox-2') as HTMLInputElement;
      checkbox.checked = true;
    }
    const alarm = localStorage.getItem('alarm');
    if (alarm === '1') {
      // cocher la checkbox
      const checkbox = document.getElementById('toggle-button-checkbox-3') as HTMLInputElement;
      checkbox.checked = true;
    }
    const door = localStorage.getItem('door');
    if (door === '1') {
      // cocher la checkbox
      const checkbox = document.getElementById('toggle-button-checkbox-4') as HTMLInputElement;
      checkbox.checked = true;
    }
    const smoke = localStorage.getItem('smoke');
    if (smoke === '1') {
      // cocher la checkbox
      const checkbox = document.getElementById('toggle-button-checkbox-5') as HTMLInputElement;
      checkbox.checked = true;
    }
    const sos = localStorage.getItem('sos');
    if (sos === '1') {
      // cocher la checkbox
      const checkbox = document.getElementById('toggle-button-checkbox-6') as HTMLInputElement;
      checkbox.checked = true;
    }
    const antitheft = localStorage.getItem('antitheft');
    if (antitheft === '1') {
      // cocher la checkbox
      const checkbox = document.getElementById('toggle-button-checkbox-7') as HTMLInputElement;
      checkbox.checked = true;
    }
  }

}

/*kilometers: number ;

 convertKmToNm(): number {
   const nauticalMilesPerKm = 0.5399568;
   return this.kilometers * nauticalMilesPerKm;
 }*/

