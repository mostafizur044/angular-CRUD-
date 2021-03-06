import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import "rxjs/add/operator/map";


@Injectable()
export class StudentService {
	private url:string;
	private headers;

  constructor(
  		private _http: Http
  	) { 
  		this.url = 'https://dashboard-4b65f.firebaseio.com/student';
  		this.headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
  }
  	add(data) {
        let json = JSON.stringify(data);
        let params = json;
        let url = this.url + '.json';
        return this._http.post(url, params,{headers: this.headers}).map(res=>res.json());
    }

    get(){	
         let url = this.url + '.json';
    	return this._http.get(url,{headers: this.headers}).map(res=>res.json());
    }

    update(id, data){
        let url = this.url + '/' + id + '.json';
        let params = data;
        return this._http.put(url,params,{headers: this.headers}).map(res=>res.json());
    }

    delete(id){
        let url = this.url + '/' + id + '.json';
        return this._http.delete(url,{headers: this.headers}).map(res=>res.json());
    }

    addKeyObjet(data){
        let newArray:any=[];
        for(let key in data) {
            data[key]['id']= key;
            newArray.push(data[key]);
        };
        return newArray;
    }

    sortStudent(data,asc){
	    data.sort((a,b)=>{ 
	      if(a['score'] != null && b['score'] != null){
	      	if(asc) return parseInt(a['score']) - parseInt(b['score'])
		    else return parseInt(b['score']) - parseInt(a['score'])
	      } else return 1;
		      
	    });
	  }
  	
}
