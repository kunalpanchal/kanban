import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var jQuery: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'kanban';
  statuses: ['pending', 'done', 'To-do', 'In Progress'];
  modal: any = {
    hidden: true
  }
  boards: any = [{
    name: 'Pitching',
    color: '#ffcccb',
    projects: [{
      name: 'Game of Thrones',
      description: 'jkhfjkhsadf',
      status: 'pending'
    }, {
      name: 'Game of Thrones',
      description: 'jkhfjkhsadf',
      status: 'pending'
    }, {
      name: 'Game of Thrones',
      description: 'jkhfjkhsadf',
      status: 'pending'
    }, {
      name: 'Game of Thrones',
      description: 'jkhfjkhsadf',
      status: 'pending'
    }, {
      name: 'Game of Thrones',
      description: 'jkhfjkhsadf',
      status: 'pending'
    }, {
      name: 'Game of Thrones',
      description: 'jkhfjkhsadf',
      status: 'pending'
    }]
  },
  {
    name: 'OnGoing',
    color: '#ffc4ff',
    projects: []
  },
  {
    name: 'Post Production',
    color: '#c3fdff',
    projects: []
  },
  {
    name: 'Complete',
    color: '#d7ffd9',
    projects: []
  }, {
    name: 'Testing',
    color: '#b4ffff',
    projects: []
  }]
  ngOnInit() {

    // jQuery("mat-card-board, div").disableSelection();
    // jQuery(".mat-card-board").draggable({
    //   // appendTo: 'body',
    //   zIndex: 99999999,
    //   connectToSortable: ".mat-card-board",
    //   containment: 'document',
    //   scroll: false,
    //   // revert: true,
    //   helper: "clone"
    // });
  }

  ngAfterViewInit() {
    this.initDrag()
  }
  initDrag() {
    jQuery(".droppable").sortable({
      connectWith: ".droppable",
      /*stop: function(event, ui) {
          var item_sortable_list_id = $(this).attr('id');
          console.log(ui);
          //alert($(ui.sender).attr('id'))
      },*/
      receive: function (event, ui) {

      }
    }).disableSelection();;

    jQuery(".project-card").draggable({
      // handle: "i",
      cancel: "div.testtt",
      connectToSortable: '.droppable',
      // helper: 'clone'
      scroll: false,
      revert: true,
      zIndex: 99999999,

    });
  }
}
