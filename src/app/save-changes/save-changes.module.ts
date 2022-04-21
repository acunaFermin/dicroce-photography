import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveChangesComponent } from './save-changes.component';
import { SaveChangesService } from './save-changes.service';

@NgModule({
 declarations: [SaveChangesComponent],
 exports: [SaveChangesComponent],
 imports: [CommonModule],
 providers: [SaveChangesService],
})
export class SaveChangesModule {}
