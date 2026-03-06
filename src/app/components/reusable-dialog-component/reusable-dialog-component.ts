import {ChangeDetectionStrategy, Component, Inject, inject, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

export interface DialogData {
  title: string;
  body: string;
}

/**
 * @title Dialog elements
 */
@Component({
  selector: 'app-reusable-dialog-component',
  templateUrl: 'reusable-dialog-component.html',
  imports: [MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
  { 
    provide: MAT_DIALOG_DATA, useValue: {title: '', body: ''} 
  }],
})
export class ReusableDialogComponent {
  @Input() title = '';
  @Input() message = '';

  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(DialogElementsContentDialog, {data: {title: this.title, body: this.message}});
  }
}

@Component({
  selector: 'dialog-elements-content-dialog',
  templateUrl: 'dialog-elements-content-dialog.html',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogElementsContentDialog {
  title: string = '';
  message: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, body: string}) {
    this.title = this.data.title;
    this.message = this.data.body;
  }
}

// use case example
// @Component({
//   selector: 'holder-test',
//   templateUrl: 'holder-test.html',
//   imports: [ReusableDialogComponent],
// })
// export class HolderTest {
//   @ViewChild(ReusableDialogComponent) dial!: ReusableDialogComponent;
  
//   alertScreen(){
//     //this.dial.title = 'progra'
//     //this.dial.message = 'maticaly';
//     this.dial.openDialog();
//   }
// }
