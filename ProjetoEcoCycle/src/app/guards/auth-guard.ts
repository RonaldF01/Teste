import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  alert('GUARD EXECUTOU');

  return false;

};