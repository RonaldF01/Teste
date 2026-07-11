import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';

export const authGuard: CanActivateFn = (
  route,
  state: RouterStateSnapshot
) => {

  const router = inject(Router);

  const usuarioLogado =
    localStorage.getItem('usuarioLogado') === 'true';

  const usuarioAtual =
    localStorage.getItem('usuarioAtual');

  const perfilUsuario =
    localStorage.getItem('perfilUsuario');

  if (
    !usuarioLogado ||
    !usuarioAtual ||
    !perfilUsuario
  ) {
    limparSessao();
    return router.createUrlTree(['/']);
  }

  const usuarios = JSON.parse(
    localStorage.getItem('usuarios') || '[]'
  );

  const usuarioExiste = usuarios.some(
    (usuario: { email: string; perfil: string }) =>
      usuario.email.toLowerCase() ===
        usuarioAtual.toLowerCase() &&
      usuario.perfil === perfilUsuario
  );

  if (!usuarioExiste) {
    limparSessao();
    return router.createUrlTree(['/']);
  }

  const urlDestino = state.url;

  if (urlDestino.startsWith('/perfil')) {
    return true;
  }

  if (
    perfilUsuario === 'gerador' &&
    urlDestino.startsWith('/gerador')
  ) {
    return true;
  }

  if (
    perfilUsuario === 'cooperativa' &&
    urlDestino.startsWith('/cooperativa')
  ) {
    return true;
  }

  if (
    perfilUsuario === 'recicladora' &&
    urlDestino.startsWith('/recicladora')
  ) {
    return true;
  }

  switch (perfilUsuario) {
    case 'gerador':
      return router.createUrlTree(['/gerador/dashboard']);

    case 'cooperativa':
      return router.createUrlTree([
        '/cooperativa/dashboard'
      ]);

    case 'recicladora':
      return router.createUrlTree([
        '/recicladora/dashboard'
      ]);

    default:
      limparSessao();
      return router.createUrlTree(['/']);
  }
};

function limparSessao(): void {
  localStorage.removeItem('usuarioLogado');
  localStorage.removeItem('usuarioAtual');
  localStorage.removeItem('perfilUsuario');
}