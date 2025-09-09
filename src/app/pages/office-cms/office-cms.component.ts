import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-office-cms',
  standalone: true,
  imports: [],
  templateUrl: './office-cms.component.html',
  styleUrl: './office-cms.component.scss'
})
export class OfficeCMSComponent implements OnInit {
  token = '';
  officeCmsUrl = '';
  urlFullPath:any;
  constructor(private sanitizer: DomSanitizer) {
    this.token = localStorage.getItem('token') || '';
    this.officeCmsUrl = environment.officeCmsUrl;
  }

  ngOnInit(): void {
    this.urlFullPath = this.sanitizer.bypassSecurityTrustResourceUrl(this.officeCmsUrl + '&token=' + this.token);
  }
}
