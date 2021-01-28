import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  activeBars = false;
  isAuth = false;
  constructor(private authService: AuthService) {
    this.authService.isAuthListener.subscribe(
      status => {
        this.isAuth = status;
      }
    )
   }

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      const headerElement = document.getElementById('header');
      if (window.scrollY > 100) {
        headerElement.classList.add('sticky');
      } else {
        headerElement.classList.remove('sticky');
      }
    });
  }

  addActiveClass(): void {
    this.activeBars = !this.activeBars;
  }

  showManageAccDropdown(): void {
    document.getElementById('acc-management').classList.toggle('active');
  }

  logout() {
    this.authService.SignOut()
  }

}
