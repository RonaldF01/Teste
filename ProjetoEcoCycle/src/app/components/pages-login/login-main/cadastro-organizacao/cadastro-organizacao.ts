import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Usuario } from '../../../../models/usuario';

@Component({
  selector: 'app-cadastro-organizacao',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro-organizacao.html',
  styleUrl: './cadastro-organizacao.css'
})
export class CadastroOrganizacao {

  nomeOrganizacao = '';
  cnpj = '';
  telefone = '';
  endereco = '';
  cidade = '';
  estado = '';

  constructor(private router: Router) {}

  voltarLogin(): void {
    this.limparCadastroTemporario();
    this.router.navigate(['/']);
  }

  concluirCadastro(): void {

    console.log({
      nomeOrganizacao: this.nomeOrganizacao,
      cnpj: this.cnpj,
      telefone: this.telefone,
      endereco: this.endereco,
      cidade: this.cidade,
      estado: this.estado
    });

    const email = localStorage.getItem(
      'emailCadastroTemporario'
    );

    const senha = localStorage.getItem(
      'senhaCadastroTemporaria'
    );

    const perfil = localStorage.getItem(
      'perfilCadastroTemporario'
    ) as Usuario['perfil'] | null;

    if (!email || !senha || !perfil) {
      alert('Os dados iniciais do cadastro não foram encontrados.');
      this.router.navigate(['/cadastro']);
      return;
    }

    if (!this.nomeOrganizacao?.trim()) {
      alert('Preencha o nome da organização.');
      return;
    }

    if (!this.cnpj?.trim()) {
      alert('Preencha o CNPJ.');
      return;
    }

    if (!this.telefone?.trim()) {
      alert('Preencha o telefone.');
      return;
    }

    if (!this.endereco?.trim()) {
      alert('Preencha o endereço.');
      return;
    }

    if (!this.cidade?.trim()) {
      alert('Preencha a cidade.');
      return;
    }

    if (!this.estado?.trim()) {
      alert('Preencha o estado.');
      return;
    }

    const usuarios: Usuario[] = JSON.parse(
      localStorage.getItem('usuarios') || '[]'
    );

    const emailJaExiste = usuarios.some(
      usuario =>
        usuario.email.toLowerCase() === email.toLowerCase()
    );

    if (emailJaExiste) {
      alert('Este e-mail já está cadastrado.');
      this.limparCadastroTemporario();
      this.router.navigate(['/']);
      return;
    }

    const novoUsuario: Usuario = {
      email: email.toLowerCase(),
      senha: senha,
      perfil: perfil,

      nomeOrganizacao: this.nomeOrganizacao.trim(),
      cnpj: this.cnpj.trim(),
      telefone: this.telefone.trim(),
      endereco: this.endereco.trim(),
      cidade: this.cidade.trim(),
      estado: this.estado.trim().toUpperCase()
    };

    usuarios.push(novoUsuario);

    localStorage.setItem(
      'usuarios',
      JSON.stringify(usuarios)
    );

    localStorage.setItem('usuarioLogado', 'true');
    localStorage.setItem('usuarioAtual', novoUsuario.email);
    localStorage.setItem('perfilUsuario', novoUsuario.perfil);

    this.limparCadastroTemporario();

    switch (novoUsuario.perfil) {

      case 'gerador':
        this.router.navigate(['/gerador/dashboard']);
        break;

      case 'cooperativa':
        this.router.navigate(['/cooperativa/dashboard']);
        break;

      case 'recicladora':
        this.router.navigate(['/recicladora/dashboard']);
        break;
    }
  }

  private limparCadastroTemporario(): void {
    localStorage.removeItem('emailCadastroTemporario');
    localStorage.removeItem('senhaCadastroTemporaria');
    localStorage.removeItem('perfilCadastroTemporario');
  }
}