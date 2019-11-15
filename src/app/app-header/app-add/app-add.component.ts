import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HotdogComponent } from '../../hotdog/hotdog.component';

@Component({
  providers:[HotdogComponent ],
  selector: 'app-app-add',
  templateUrl: './app-add.component.html',
  styleUrls: ['./app-add.component.css']
})

export class AppAddComponent implements OnInit {
  hotdogs: any;
 hotdog:object = {};
  hotdogname:object = [];

  constructor(private http: HttpClient, private comp: HotdogComponent,
    public dialogRef: MatDialogRef<AppAddComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

    protected headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD'
    });


  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }

  uploadedFiles: Array < File > ;

  fileChange(element){
    this.uploadedFiles = element.target.files;
  }

  addhotdog(){
    let httpParams: HttpParams = new HttpParams();
    this.http.post('/add', this.hotdogs,{headers: this.headers,
      params: httpParams}).pipe().subscribe(res => {
      console.log(res);
    });
    location.reload();
  }

  update(hotdog) {
    this.dialogRef.close();
    this.hotdogs ={
      "name" : hotdog.name,
      "title" : hotdog.title,
      "description" : hotdog.description,
      "image" : ''
    };
    let formData = new FormData();
    for(var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("uploads", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.http.post('/upload', formData).pipe()
      .subscribe((response)=>{
        this.hotdogs['image'] = response[0];
        this.addhotdog();
      })

  }
}
