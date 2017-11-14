import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./components/app.component.css'],
  templateUrl: './components/app.component.html'
})
export class AppComponent implements OnInit {
  public name: string;

  public ngOnInit(): void {
    this.name = 'Electrongular';
  }
}
