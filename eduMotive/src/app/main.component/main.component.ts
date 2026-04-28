import { Component, inject, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { ChatBotComponent } from '../../chat-bot/chat-bot.component';

@Component({
  selector: 'app-main.component',
  imports: [RouterOutlet, ChatBotComponent, NgIf],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  private readonly router = inject(Router);
  public navigating = false;

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart)  this.navigating = true;
      if (event instanceof NavigationEnd
       || event instanceof NavigationCancel
       || event instanceof NavigationError)  this.navigating = false;
    });
  }
}