import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {

  perfilSelecionado = '';
  email = '';
  senha = '';
  confirmarSenha = '';

  aceitouTermos = false;

  modalTermosAberto = false;

  abaTermos: 'privacidade' | 'termos' = 'privacidade';

  constructor(private router: Router) {}

  selecionarPerfil(perfil: string): void {
    this.perfilSelecionado = perfil;
  }

  voltarLogin(): void {
    this.router.navigate(['/']);
  }

  abrirTermos(
    aba: 'privacidade' | 'termos'
  ): void {

    this.abaTermos = aba;
    this.modalTermosAberto = true;

    document.body.style.overflow = 'hidden';
  }

  fecharTermos(): void {

    this.modalTermosAberto = false;

    document.body.style.overflow = '';
  }

  selecionarAba(
    aba: 'privacidade' | 'termos'
  ): void {

    this.abaTermos = aba;
  }

  fecharAoClicarFora(evento: MouseEvent): void {

    const elemento = evento.target as HTMLElement;

    if (elemento.classList.contains('modal-overlay')) {
      this.fecharTermos();
    }
  }

  criarConta(): void {

    if (!this.aceitouTermos) {
      alert(
        'Você precisa aceitar os Termos de Uso e a Política de Privacidade.'
      );
      return;
    }

    if (!this.perfilSelecionado) {
      alert('Selecione um perfil.');
      return;
    }

    if (!this.email || !this.senha || !this.confirmarSenha) {
      alert('Preencha todos os campos.');
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    localStorage.setItem(
      'perfilCadastroTemporario',
      this.perfilSelecionado
    );

    localStorage.setItem(
      'emailCadastroTemporario',
      this.email.trim().toLowerCase()
    );

    localStorage.setItem(
      'senhaCadastroTemporaria',
      this.senha
    );

    this.router.navigate(['/cadastro-organizacao']);
  }
}