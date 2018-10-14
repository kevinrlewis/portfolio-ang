import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { AppsComponent } from './apps/apps.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';

const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'apps', component: AppsComponent },
  { path: 'education', component: EducationComponent },
  { path: 'experience', component: ExperienceComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
      // ,
      // {
      //   enableTracing: true // debugging purposes
      // }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
