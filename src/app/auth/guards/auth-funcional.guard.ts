import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authFuncionalGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService= inject(AuthService);
  let authentication=false
  return authService.checkAuthentication()
  .pipe(
    tap((value)=>{
      return !value ? router.navigate(['/auth/login']) : true
    })
  )
  
  
};
