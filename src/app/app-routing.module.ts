import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from './components/components/button/button.component';
import { AppComponent } from './app.component';
import { BadgeComponent } from './components/components/badge/badge.component';
import { CheckboxComponent } from './components/components/checkbox/checkbox.component';
import { ChipsComponent } from './components/components/chips/chips.component';

const routes: Routes = [
    {
      path: 'components',
      children: [
        {
          path: 'badge',
          component: BadgeComponent
        },
        {
          path: 'button',
          component: ButtonComponent
        },
        {
          path: 'checkbox',
          component: CheckboxComponent
        },
        {
          path: 'chips',
          component: ChipsComponent
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
