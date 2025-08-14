import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CommonService} from "../../../core/services/common.service";

@Component({
    selector: 'app-admin-sidebar',
    templateUrl: './admin-sidebar.component.html',
    styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent implements OnInit {
    @Input() menuOpened: any;
    router
    menus: any = []

    constructor(
        private readonly _router: Router,
        private readonly commonService: CommonService,
    ) {
        this.router = _router
    }

    ngOnInit() {
        this.commonService.menus.subscribe((_menus) => {
            this.menus = _menus
        })
    }
}
