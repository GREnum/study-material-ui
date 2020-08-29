import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { Inject, Injectable, Injector } from "@angular/core";
import { ToasterService } from "angular2-toaster";

import {
    HttpErrorResponse,
    Htt