import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ToasterService } from "angular2-toaster";


export interface IOrder {
    id: string;
    name: string;
    sum: number;
    