import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

declare var jQuery: any;
declare var window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(public snackBar: MatSnackBar) { }

  title = 'kanban';
  newProjectStatus: string;
  statuses: ['pending', 'done', 'To-do', 'In Progress'];
  modal: any = {
    hidden: true,
    type: 'add',
    data: {
      index: 0
    }
  }
  boards: any = [
    {
      name: 'Planning',
      color: '#fac49f',
      projects: [{
        name: 'Game of Thrones',
        description: 'jkhfjkhsadf',
        status: 'pending'
      }]
    },
    {
      name: 'Pitching',
      color: '#ffcccb',
      projects: [{
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
      update: function () {
        console.log('aa')
        // do stuff
      },
      receive: function (event, ui) {
        console.log('vv', event, ui)

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

  addNewProject(event: any, name: string, description: string) {

    event.preventDefault()
    if (!name) {
      this.snackBar.open('Please enter name for the project');
      return
    }
    if (!description) {
      this.snackBar.open('Please enter description for the project');
      return
    }
    this.boards[0].projects.push({
      name,
      description,
      status: 'pending'
    })
    this.modal.hidden = true;
    this.snackBar.open(`New Project Successfully Added to ${this.boards[0].name}`);
  }

  addNewBoard(name: string, color: any) {
    event.preventDefault()
    if (!name) {
      this.snackBar.open('Please enter a name for the board');
      return
    }
    this.boards.push({
      name,
      color: color || '#ffc4ff',
      projects: []
    })
    this.modal.hidden = true
    setTimeout(() => jQuery('.kanban').scrollLeft(Number.MAX_SAFE_INTEGER))
    this.snackBar.open(`New Board ${name} Added`);
  }

  editProject(name) {
    event.preventDefault()
    if (!name) {
      this.snackBar.open('Please enter a name for the board');
      return
    }
    this.boards[this.modal.data.index].name = name;
    this.modal.hidden = true
  }
}
