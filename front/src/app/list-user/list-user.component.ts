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

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
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
    console.log("aaaa");
    let tab = document.getElementById("#utilisateurs");
    for (var i = 0; tab.childNodes.length; i++){
      console.log(tab.childNodes[i]);
      /* if ((tab.childNodes[i].nickname().include() == -1) {
        $(this).css("display", "none");
      }
      else {
        $(this).css("display", "block");
      } */
    }
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
