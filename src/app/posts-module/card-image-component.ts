import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-thumbnail-image',
  template: `
  
  <mat-card class="card">
  
  <mat-card-header>
    <div mat-card-avatar></div>
    <mat-card-title>
      title
      <!-- <button class="request" (click)="showComments(post._id)">{{post.description}}</button> -->
    </mat-card-title>
    
    <mat-card-subtitle class="subtitle">
      <!-- {{post.type}} by <button class ="userNameBtn" (click)="toggleDisplayUser(post._id)">{{post.user.username}}</button> on {{post.date | date: "M/d/yy h:mm a"}} ({{post.comments.length}}comments) -->
    subtitle
    </mat-card-subtitle>
  </mat-card-header>
  <img mat-card-image src="https://msdfp.s3.amazonaws.com/streamS3fromclient.png" alt="test Description"/>

  <div class ="byUserInfo" >
    <div>Name </div>
    <div>Address *ngIf="byUserToggle[post._id]"</div>

  </div>
  
  <div mat-card-image></div>

  <!-- <div *ngIf="showComment[post._id]"> -->
  <div>
    <mat-card-content class="comments">
      <!-- <app-comments *ngFor="let comment of post.comments" [comment]="comment"></app-comments> -->
      <!-- <app-comments *ngFor="let comment of post.comments" [comment]="comment"></app-comments> -->
    </mat-card-content>

    
   <!-- <mat-card-actions class="addComment" *ngIf="!guest"> -->
   <mat-card-actions class="addComment" >
      <input
      class="input"
      type="text"
      placeholder="Your comment here"
      (keyup)="onKey($event)">

      <button color="primary" mat-raised-button mat-button (click)="addComment()">Add Comment</button>

    </mat-card-actions>
  </div>
</mat-card>
  
  
  
  
  `,
  styles: [],
})
export class ThumbnailImageComponent{


  onKey (e: Event) {

  }
  addComment(){}
}