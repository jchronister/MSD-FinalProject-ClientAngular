import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from './posts-list.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CommentsComponent } from './comments.component';
import { CreatePostComponent } from './create-post.component';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePost } from './post-create-component';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
// import { CustomMatPaginatorIntl } from './customPg';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import {MatGridListModule} from '@angular/material/grid-list';
import { ThumbnailImageComponent } from './card-image-component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ClipboardModule} from '@angular/cdk/clipboard';

@NgModule({
  declarations: [
    PostsListComponent, 
    CommentsComponent,
    CreatePost,
    CreatePostComponent,
    ThumbnailImageComponent,
    
  ],


  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    RouterModule.forChild([
      // { path: 'all-requests', component: PostsListComponent },
      // { path: 'help-requests', component: PostsListComponent },
      // { path: 'service-providers', component: PostsListComponent },
      // { path: 'createrequest2', component: CreatePostComponent },
      // { path: 'new-requests', component: PostsListComponent },
      { path: 'viewflagged', component: PostsListComponent },
      { path: 'view', component: PostsListComponent },
      { path: 'create', component: CreatePost },
      { path: '**', redirectTo :'view' },
    ]),
    NgxMatFileInputModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    ClipboardModule
  ],
  bootstrap: [PostsListComponent],
  providers: [
    // {provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}

  ]
})
export class PostsModuleModule {}
