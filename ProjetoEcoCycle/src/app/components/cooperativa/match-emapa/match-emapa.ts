import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Sidebar } from '../../sidebar/sidebar';
import { Coleta } from '../../../models/coleta';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-match-mapa',
  standalone: true,
  imports: [
    CommonModule,
    Sidebar
  ],
  templateUrl: './match-emapa.html',
  styleUrl: './match-emapa.css'
})
export class MatchEmapa implements OnInit {

  menuAberto = true;

  coletasDisponiveis: Coleta[] = [];

  ngOnInit(): void {
    this.carregarColetas();
  }

  alterarMenu(aberto: boolean): void {
    this.menuAberto = aberto;
  }

  carregarColetas(): void {

    const coletas: Coleta[] = JSON.parse(
      localStorage.getItem('coletas') || '[]'
    );

    this.coletasDisponiveis = coletas
      .filter(coleta => coleta.status === 'pendente')
      .sort(
        (a, b) =>
          new Date(b.criadaEm).getTime() -
          new Date(a.criadaEm).getTime()
      );
  }

  aceitarColeta(coletaSelecionada: Coleta): void {

    const emailUsuarioAtual =
      localStorage.getItem('usuarioAtual');

    if (!emailUsuarioAtual) {
      alert('Não foi possível identificar o usuário logado.');
      return;
    }

    const usuarios: Usuario[] = JSON.parse(
      localStorage.getItem('usuarios') || '[]'
    );

    const cooperativa = usuarios.find(
      usuario =>
        usuario.email.toLowerCase() ===
        emailUsuarioAtual.toLowerCase()
    );

    if (!cooperativa) {
      alert('Cooperativa não encontrada.');
      return;
    }

    if (cooperativa.perfil !== 'cooperativa') {
      alert('Somente cooperativas podem aceitar coletas.');
      return;
    }

    const coletas: Coleta[] = JSON.parse(
      localStorage.getItem('coletas') || '[]'
    );

    const indiceColeta = coletas.findIndex(
      coleta => coleta.id === coletaSelecionada.id
    );

    if (indiceColeta === -1) {
      alert('Coleta não encontrada.');
      this.carregarColetas();
      return;
    }

    if (coletas[indiceColeta].status !== 'pendente') {
      alert('Esta coleta já foi aceita por outra cooperativa.');
      this.carregarColetas();
      return;
    }

    coletas[indiceColeta] = {
      ...coletas[indiceColeta],
      status: 'aceita',
      cooperativaEmail: cooperativa.email,
      cooperativaNome: cooperativa.nomeOrganizacao
    };

    localStorage.setItem(
      'coletas',
      JSON.stringify(coletas)
    );

    alert('Coleta aceita com sucesso!');

    this.carregarColetas();
  }
}