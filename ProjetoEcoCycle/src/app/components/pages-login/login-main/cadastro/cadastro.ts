import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {

  perfilSelecionado = '';
  email = '';

  senha = '';

  confirmarSenha = '';

  constructor(private router: Router) {}

  selecionarPerfil(perfil: string) {
    this.perfilSelecionado = perfil;
  }

  voltarLogin() {
    this.router.navigate(['/']);
  }

criarConta() {

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

  localStorage.setItem('perfilUsuario', this.perfilSelecionado);
  localStorage.setItem('emailUsuario', this.email);
  localStorage.setItem('senhaUsuario', this.senha);

  this.router.navigate(['/cadastro-organizacao']);

}

}