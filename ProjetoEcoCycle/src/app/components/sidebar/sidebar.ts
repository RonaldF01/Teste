import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  @Input() perfil: 'gerador' | 'cooperativa' | 'recicladora' = 'gerador';

  @Output() menuAlterado = new EventEmitter<boolean>();

  menuAberto = true;

  constructor(private router: Router) {}

  toggleMenu(): void {

    this.menuAberto = !this.menuAberto;
    this.menuAlterado.emit(this.menuAberto);

  }

  sair(): void {

    // Limpa a sessão do usuário
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('usuarioAtual');
    localStorage.removeItem('perfilUsuario');

    // Limpa dados temporários de cadastro, caso existam
    localStorage.removeItem('emailCadastroTemporario');
    localStorage.removeItem('senhaCadastroTemporaria');
    localStorage.removeItem('perfilCadastroTemporario');

    // Volta para o login
    this.router.navigate(['/']);

  }

}