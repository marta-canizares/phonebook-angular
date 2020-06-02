import { Component, OnInit } from '@angular/core';
import { ApiService} from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { Person } from '../person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  public persons: any;
  public user: string;
  public password: string;
  public message = {};
  public isLogged: boolean;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private routes: Router) {

   }

   login(){
    this.apiService.loginUser$(this.user, this.password)
      .subscribe(data =>{
         this.message = data;
         this.apiService.getPersons$().subscribe(e => this.persons = e);
        });


    this.user = '';
    this.password = '';
   }

   logout(){
    this.apiService.logoutUser$()
        .subscribe(data => this.message = data );
    this.persons=[];

    }
  ngOnInit() {
    this.apiService.getPersons$().subscribe(e => this.persons = e);
  }

}
