import { ApiService } from './../services/api.service';
import { Component, Input, OnChanges } from '@angular/core';
import { User } from '../Model/user';
import { Repo } from '../Model/repo';
@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnChanges {
  @Input() userName: string = '';
  user!: User;
  repos: Repo[] = [];
  currPage: number = 1;
  pageSize: number = 10;
  totalRepos: number = 0;
  error: any;
  totalPages: number = 1;
  totalPagesArray: number[] = [];
  @Input() isLoading: boolean = true;
  @Input() isUserLoading: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      this.isUserLoading = false;
    }, 6000);
  }

  constructor(private ApiService: ApiService) {}

  ngOnChanges(): void {
    this.loadRepos();
  }
  loadRepos(){
    if (!this.error && this.userName) { // Check if there is no error and userName is not empty
      this.getUserProfile(this.userName);
      this.repos = []; // Reset repos array
      this.ApiService
        .getRepos(this.userName, this.currPage, this.pageSize)
        .subscribe({
          next: (repos: Repo[]) => { // Specify the type of 'repos' as 'Repo[]'
            this.repos = repos;
          },
          error: (error: any) => { // Specify the type of 'error' as 'any'
            this.error = 'Error fetching user repos';
            console.log(error); 
          }
        });
    }
  }
  

  getUserProfile(userName: string){
    if(userName){
      this.ApiService.getUser(userName).subscribe({
        next: (user: User) => {
          this.error = '';
          this.user = user;
          this.totalRepos = user.public_repos;
          const totalRepos1 = user.public_repos; 
          this.totalPages = Math.ceil(totalRepos1 / this.pageSize);
          this.totalPagesArray = Array.from(
            { length: this.totalPages },
            (_, i) => i + 1
          );
        },
        error: (error: any) => {
          this.error = 'Error fetching user profile', error;
          console.log(this.error); 
        }
      })
    }
  }


  onPageChange(page:number){
    this.currPage = page;
    this.loadRepos();
  }

  onPageSizeChange(number1: number){
    const selectedPageSize = number1;
    if(!isNaN(Number(selectedPageSize))){
      this.pageSize = Number(selectedPageSize);
      this.currPage = 1;
      this.loadRepos();
    }
  }
}
