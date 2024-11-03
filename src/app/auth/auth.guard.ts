import { CanActivateFn, Router } from '@angular/router';
import { GameServiceService } from '../core/services/game-service.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(GameServiceService);
  const router = inject(Router);
  
  if (!service.isAuthenticade()) {
    router.navigate(["/"])
    alert("Tines que iniciar sesión")
    return false;
  } else {
    return true;
  }
};
