import { Component, OnInit } from '@angular/core';

import { CommonserviceProvider } from '../../providers/commonservice/commonservice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  error:any = "";
  servicedata:any;
  data:any;

  mycommit:any = [];

  constructor(private commonservice: CommonserviceProvider) {
    this.getcommit("master");
  }

  ngOnInit() {}

  getcommit(sha)
  {
      this.servicedata = [];

      this.commonservice.getServer("repos/surajnayak1994/paulfoxaisr/commits/"+sha,this.servicedata).subscribe(
        res => {
            this.data=res;
            console.log(this.data);
          
            if(this.data.sha)
            {
              this.mycommit.push(this.data);
              if(this.data.parents.length>0) this.getcommit(this.data.parents[0].sha);
            }
            else
            {
              alert(this.data.message);
            }
            
        },
        error => {
          console.log(error);
          alert("Something went wrong");
        }
      )
  }

}
