import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then(m => m.LoginPageModule)
  },
  {
    path: "register",
    loadChildren: () =>
      import("./pages/register/register.module").then(m => m.RegisterPageModule)
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./pages/profile/profile.module").then(m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'upload-modal',
    loadChildren: () => import('./pages/upload-modal/upload-modal.module').then(m => m.UploadModalPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  },
  {
    path: 'add-driver',
    loadChildren: () => import('./pages/add-driver/add-driver.module').then(m => m.AddDriverPageModule)
  },
  {
    path: 'make-request',
    loadChildren: () => import('./pages/make-request/make-request.module').then(m => m.MakeRequestPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
