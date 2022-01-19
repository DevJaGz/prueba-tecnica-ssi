import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'patients', component: PatientsComponent },
  { path: 'patient-detail', component: PatientDetailComponent },
  { path: 'patient-detail/:id', component: PatientDetailComponent },
  { path: '**', pathMatch: "full", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
