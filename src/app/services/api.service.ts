import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError, map } from 'rxjs';
import { Repo } from '../Model/repo';
import { User } from '../Model/user';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private githubUrl = "https://api.github.com";
  private repoCache: { [key: string]: Repo[] } = {};
  constructor(
    private httpClient: HttpClient
  ) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred.';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getUser(githubUsername: string): Observable<any> {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`).pipe(catchError(this.handleError));
  }
  getRepos(githubUsername: string, page: number = 1, perPage: number = 10): Observable<Repo[]> {
    const cacheKey = `${githubUsername}-${page}-${perPage}`;

    if (this.repoCache[cacheKey]) {
      return of(this.repoCache[cacheKey]);
    } else {
      const apiURL = `${this.githubUrl}/users/${githubUsername}/repos`;
      const params = {
        page: page.toString(),
        per_page: perPage.toString()
      };
      const headers = new HttpHeaders().set('Accept', 'application/vnd.github.v3+json');
      
      return this.httpClient.get<Repo[]>(apiURL, { params, headers }).pipe(
        map((repos) => {
          this.repoCache[cacheKey] = repos;
          return repos;
        }),
        catchError(this.handleError)
      );
    }
  }
  
}
