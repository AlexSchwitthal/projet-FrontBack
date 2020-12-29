import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  
  users: User[];
  interval: any;

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
    this.interval = setInterval(() => {
        this.getUsers();
    }, 2000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  getUsers(){
    this.usersService.getUsers().subscribe(
      (allUsers:any) => {
        this.users = new Array();
        for(var user of allUsers) {
          this.users.push(new User(user._id, user.login, user.password, user.nickname, user.following));
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  keyupSearch(value): void{
    let tab = document.getElementById("tabUtilisateurs");
    var children = Array.from(document.getElementsByClassName("userList") as HTMLCollectionOf<HTMLElement>);
    console.log(children.length);
    children.forEach(element => {      
      console.log(element);
      if (value==""){
        element.style.display = "block";
      }
      else{
        if (element.textContent.search(value) == -1){
          element.style.display = "none";
        }
        else{
          element.style.display = "block";
        }
      }
      
    });
    /* tab.childNodes.each(function() {
      if ($(this).text().search(userInput) == -1) {
        $(this).css("display", "none");
      }
      else {
        $(this).css("display", "block");
      }
    }) */
  }

 /*  $("#searchBar").on({
		keyup : function() {
			var userInput = $(this).val();

			$("#notesBoard").children().each(function() {
				if ($(this).text().search(userInput) == -1) {
					$(this).css("display", "none");
				}
				else {
					$(this).css("display", "block");
				}
			})
		},
		click : function() {
			$(this).val("");
			$("#notesBoard").children().each(function() {
				$(this).css("display", "block");
			})
		}
	});
 */
}
