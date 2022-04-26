import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveChangesComponent } from './save-changes.component';
import { SaveChangesService } from './save-changes.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
 declarations: [SaveChangesComponent],
 exports: [SaveChangesComponent],
 imports: [CommonModule, HttpClientModule],
 providers: [SaveChangesService],
})
export class SaveChangesModule {}
