import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {
  constructor(private router: Router, private apiDataService: ApiDataService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.linkClicked(document.getElementById(event.url))
      }
    });

  }
  lastLink: HTMLAnchorElement
  linkClicked = (element) => {
    if (element) {
      if (this.lastLink) {
        this.lastLink.classList.remove('active')
      }
      element.classList.add("active")
      this.lastLink = element
    }
  }
  ngOnInit(): void {
    let links = document.getElementsByTagName('a')
    for (let index = 0; index < links.length; index++) {
      const element = links[index];
      element.addEventListener('click', () => this.linkClicked(element))
    }
  }
  toggleShowOption = async () => {
    this.apiDataService.getAlbumInfo().then(data => {
      let current = data.showOption
      if (current == "grid") {
        current = "list"
      }
      else {
        current = "grid"
      }
      data.showOption = current
      this.apiDataService.saveAlbumInfo(data).then(() => {
        location.reload();
      })

    })
  }
}
