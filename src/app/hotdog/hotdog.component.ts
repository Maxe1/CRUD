import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-hotdog',
  templateUrl: './hotdog.component.html',
  styleUrls: ['./hotdog.component.css']
})

export class HotdogComponent implements OnInit {
  protected headers: HttpHeaders = new HttpHeaders({});
  hotdogs: any;

  constructor(private http: HttpClient) { }

   ngOnInit() {
     this.update();
   }

  update(){
    let httpParams: HttpParams = new HttpParams();
      this.http.get('/list', {headers: this.headers,
        params: httpParams}).pipe().subscribe((data) => {
        this.hotdogs = data;
      });
  }

  deleteItem(id){
    let httpParams: HttpParams = new HttpParams();
    if(confirm("Are you sure, that you want to delete it?")){
      const url = `${'/del'}/${id}`;
      return this.http.get(url, {headers: this.headers,
        params: httpParams}).subscribe(() => {
           this.update();
      })
    }
  }

  editHotdog(hotdog){
    hotdog.showEdit = !hotdog.showEdit;
    if(!hotdog.showEdit){
      this.upgrate(hotdog);
    }
  }

  upgrate(hotdog){
    const hotdogs ={
      "id": hotdog.id,
      "name" : hotdog.name,
      "title" : hotdog.title,
      "description" : hotdog.description,
      "image" : hotdog.image
    };
    let httpParams: HttpParams = new HttpParams();
    const url = '/update';
    this.http.post(url, hotdogs,{headers: this.headers,
      params: httpParams}).subscribe(res => {
      console.log(res);
    })
    console.log(hotdogs);
    alert("Changed!");
  }

}
