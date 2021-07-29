import { Component, OnInit } from '@angular/core';
import { MainServiceService } from './main-service.service';

import { IPosts, IServerObject, IComments, IImages, } from '../app.types';
import { AccountState } from '../account-state';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-posts-list',
  templateUrl: './post-list.component.html',
  styles: [

    ".request {font-size:200%; background-color:white; border:none; text-align:left;}",

    ".subtitle {margin-left:15px}",

    ".background {background-color: #edddf8 }",

    ".card {margin: 5px}",

    ".request:hover {color:purple; cursor: pointer;}",

    ".comments {margin-left:55px}",
    
    ".userNameBtn {background-color:white; color:  mediumpurple; border:none; padding:0;text-align:left; font-size:120%}",
    
    ".userNameBtn:hover{color: Black; cursor: pointer;}",

    ".addComment {margin-left:100px}",

    ".input {padding: 10px; border-radius: 5px; border-width:1px; width:200px}",
    
    ".byUserInfo {color : grey ; margin-left : 75px}",

    ".image {border-collapse: separate; border-spacing: 100px;}",

    ".error {color : red; margin: 20px}",

    ".info {margin-top: 5px; margin-bottom: 5px;}",

    ".flagged {color : red}",

    "a {text-decoration: none}",

    ".btn {margin-right: 5px;}",

    ".bold {font-weight: bold;}",

    ".copylink {margin-left: 20px; color: blue;}",

    ".copylink:hover {cursor: pointer; color: red;}",

    ".hoverred:hover{color: red;}",

  ],
})
export class PostsListComponent implements OnInit {

  imagesAry: Array<Array<IImages>> = [];
  inputValue: string = '';
  type: string = '';
  pathOptions = {first:"", prev:"", next:"", last:""}
  showComment: any = {}
  error = "";
  byUserToggle :any ={};
  admin = true;
  subscriptions: Subscription | undefined
  pageSize = 9
  links: any = {}
  totalPages = 100
  currentPage = 1
  tableRows = [0, 1, 2]
  tableCols = [1, 2, 3]

  constructor(
    private myService: MainServiceService,
    private state: AccountState,
    public router: Router
  ) {
    this.type = this.router.getCurrentNavigation()!.extras.state!.request;
    this.admin = this.state.getCurrentUserInfo().username === "admin@admin"

    // this.subscriptions = this.state.subscribeLocation(() => {this.getImages()})
  }

  onKey(e: Event) {
    this.inputValue = (<HTMLInputElement>e.target).value;
  }
  
  // toggleDisplayUser(id: string){
    
  //   const tgl = this.byUserToggle[id]
  //   this.byUserToggle[id] = tgl === undefined? true:!tgl
  // }

  // addComment(post: IPosts) {
  //   if (!this.inputValue) {
  //     return;
  //   }
  //   let comment: IComments = {
  //     comment: this.inputValue,
  //     user: this.state.getCurrentUserInfo(),
  //     date: new Date(),
  //   };
    

  //   this.myService.sendComment(<string>post._id ,comment).subscribe((data: IServerObject) => {
  //     if (data.status === 'Success') {
  //       post.comments.push(comment);
  //     }
  //   });
  // }

  ngOnInit(): void {

    this.getImages ()

  }


  getImages (direction?: string) {

    // Clear Errors
    this.error = ""

    // Next / Previous
    let directionQuery = ""
    if (direction) {

      if (this.links[direction]) {
        directionQuery = this.links[direction]
      }

    }
    
    // View Only Flagged Items
    if (this.type === "viewflagged") {
      directionQuery = "flagged=true"
    }

      // Http Request
      this.myService.getImages(directionQuery).subscribe((data: any) => {
        
        if (data && data.body.status === 'Success') {
         
          // Group Images
          this.imagesAry = [
            data.body.data.slice(0, 3),
            data.body.data.slice(3, 6),
            data.body.data.slice(6, 9),
          ]

          // Read First/Next/Prev Links from Header
          const links = data.headers.get('Link')
          this.links = links ? this.myService.parseLinkHeader(<string>links) : {}

          if (data.body.data.length === 0) {
            this.error = "No Valid Data"
          }
          
        }

      });
    

  }

  flag(image: IImages) {
    this.setFlag(image, true);
  }

  clearFlag(image: IImages) {
    this.setFlag(image, false);
  }

  setFlag(image: IImages, flagged: boolean) {
    this.myService.flagImage({_id: image._id, flagged}).subscribe((data: any) => {

      if (data && data.status === 'Success') {
        image.flagged = flagged
      } else {
        this.error = (data && data.error) || "Error Flagging Image"
      }    
    })
  }


  deleteImage(image: IImages) {
    this.myService.deleteImage(image._id).subscribe((data: any) => {

      if (data && data.status === 'Success') {
        
        // Delete Image from Array
        image.thumbnailURL = "assets/deletedImage.png"
        
        // this.getImages ()

      } else {
        this.error = (data && data.error) || "Error Deleting Image"
      }    
    })
  }

  // Prev / Next / Same Page
  page ($event:any) {
   
    // Set Page Item Size
    this.pageSize = $event.pageSize


    if ($event.pageIndex > $event.previousPageIndex) {

      // Move Next
      this.getImages("next")
      this.currentPage++

    } else if ($event.pageIndex < $event.previousPageIndex){

      // Move Previous
      this.getImages("prev")
      this.currentPage--

    } else {
      // Size Change
      this.getImages()
    }

  } 


  // showComments(id: string) {

  //   // Get Current Show Status
  //   const tgl = this.showComment[id]

  //   // true if undefined else Toggle Show
  //   this.showComment[id] = tgl === undefined ? true : !tgl

  //   // Add to Change Log
  //   this.state.addViewedToChangeLog(id)

  // }

  ngAfterViewChecked() {
    const list = document.getElementsByClassName('mat-paginator-range-label');
    list[0].innerHTML = 'Page: ' + this.currentPage.toString();
  }

  ngOnDestroy() {
    if (this.subscriptions) this.subscriptions.unsubscribe()
  }

}
