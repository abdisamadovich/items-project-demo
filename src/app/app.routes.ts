import { Routes } from '@angular/router';
import { LayoutComponent } from './component/layout/layout.component';
import { Component } from '@angular/core';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AddComponent } from './component/add/add.component';

export const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
            {
                path: "home",
                component:HomeComponent
            },
            {
                path: "about",
                component:AboutComponent
            },
            {
                path: "login",
                component:LoginComponent
            },
            {
                path: "register",
                component:RegisterComponent
            },
            {
                path: "add",
                component:AddComponent
            },
            {
                path: "",
                redirectTo: "/home",
                pathMatch: "full"
            }
        ]
    }
];
