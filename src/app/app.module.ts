import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { UserInputComponent } from './user-input/user-input.component';
import { RepoListComponent } from './repo-list/repo-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RepoCardComponent } from './repo-card/repo-card.component';
import { RepoCardSkeletonComponent } from './repo-card-skeleton/repo-card-skeleton.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserCardSkeletonComponent } from './user-card-skeleton/user-card-skeleton.component';
import { ApiService } from './services/api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheInterceptor } from './interceptors/cache.interceptor'; 

@NgModule({
  declarations: [
    AppComponent,
    UserInputComponent,
    RepoListComponent,
    PaginationComponent,
    RepoCardComponent,
    RepoCardSkeletonComponent,
    UserCardComponent,
    UserCardSkeletonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  

  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
