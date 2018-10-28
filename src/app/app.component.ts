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
  tempProjectName: string;
  boards: any;

  statuses: ['pending', 'done', 'To-do', 'In Progress'];
  modal: any = {
    hidden: true,
    type: 'add',
    data: {
      index: 0
    }
  }

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
    let boards = localStorage.getItem('boards');
    if (boards) this.boards = JSON.parse(boards);
    else this.boards = [
      {
        name: 'Planning',
        color: '#fac49f',
        projects: [{
          name: 'Game of Thrones',
          description: `Game of Thrones is an American fantasy drama television series created by David Benioff and D. B. Weiss.`,
          status: 'pending'
        }]
      },
      {
        name: 'Pitching',
        color: '#ffcccb',
        projects: []
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
  }

  save() {
    localStorage.setItem('boards', JSON.stringify(this.boards));
  }
  ngAfterViewInit() {
    this.initDrag()
  }
  initDrag() {
    let that = this;
    let start
    jQuery(".droppable").sortable({
      connectWith: ".droppable",
      start: function (event, ui) {
        let id = jQuery(this).attr('id');
        if (!start) start = id.split('-')[2]
      },
      receive: function (event, ui) {
        let id = jQuery(this).attr('id');
        that.snackBar.open(`Project ${that.tempProjectName} moved from ${that.boards[start].name} to ${that.boards[id.split('-')[2]].name}`, 'a', { duration: 1000 })
        start = undefined
      },
    }).disableSelection();;

    jQuery(".project-card").draggable({
      cancel: "div.testtt",
      connectToSortable: '.droppable',
      scroll: false,
      revert: true,
      zIndex: 99999999,
      start: function (e, ui) {
        let id = jQuery(this).attr('id');
        let [boardIndex, projectIndex] = [id.split('-')[1], id.split('-')[2]]
        that.tempProjectName = that.boards[boardIndex].projects[projectIndex].name;
      }
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
    this.save();
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
    this.save();
  }

  editProject(name) {
    event.preventDefault()
    if (!name) {
      this.snackBar.open('Please enter a name for the board');
      return
    }
    this.boards[this.modal.data.index].name = name;
    this.modal.hidden = true
    this.save();
  }
}
