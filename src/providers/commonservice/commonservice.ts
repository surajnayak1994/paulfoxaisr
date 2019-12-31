import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };


@Injectable({providedIn: 'root'})

export class CommonserviceProvider {

  loading:any;
  baseurl:any="https://api.github.com/";
  servicedataformated:any;

  loadingstatus:boolean = false;

  constructor(public http: HttpClient) {
      console.log('Hello CommonserviceProvider Provider');
  }


  getServer(serviceurl, servicedata) {
    if(servicedata.length > 0) {
      let i=0;
      for (let obj of servicedata){
        for (let key in obj) {
          if(i==0){
              this.servicedataformated=serviceurl+"?"+key+"="+obj[key];
          }
          else{
              this.servicedataformated+="&"+key+"="+obj[key];
          }
        }
        i++;
      }
    }
    else {
        this.servicedataformated = serviceurl;
    }
    return this.http.get(this.baseurl + this.servicedataformated, httpOptions);
  }

  postServer(service,servicedata){
      return this.http.post(this.baseurl+service, servicedata, httpOptions);
  }

}
