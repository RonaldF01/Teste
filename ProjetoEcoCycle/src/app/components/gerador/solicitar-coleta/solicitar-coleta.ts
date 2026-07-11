import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../sidebar/sidebar';
import { Usuario } from '../../../models/usuario';
import { Coleta } from '../../../models/coleta';

@Component({
  selector: 'app-solicitar-coleta',
  standalone: true,
  imports: [
    Sidebar,
    FormsModule
  ],
  templateUrl: './solicitar-coleta.html',
  styleUrl: './solicitar-coleta.css',
})
export class SolicitarColeta {

  menuAberto = true;

  tipoResiduo = '';
  pesoEstimado: number | null = null;
  enderecoColeta = '';
  dataDesejada = '';
  horarioPreferido = '';
  observacoes = '';

  alterarMenu(aberto: boolean): void {

    this.menuAberto = aberto;

  }

  solicitarColeta(): void {

    if (
      !this.tipoResiduo ||
      !this.pesoEstimado ||
      !this.enderecoColeta ||
      !this.dataDesejada ||
      !this.horarioPreferido
    ) {

      alert('Preencha todos os campos obrigatórios.');
      return;

    }

    const emailUsuario = localStorage.getItem('usuarioAtual');

    if (!emailUsuario) {

      alert('Usuário não encontrado.');
      return;

    }

    const usuarios: Usuario[] = JSON.parse(
      localStorage.getItem('usuarios') || '[]'
    );

    const usuario = usuarios.find(
      u => u.email === emailUsuario
    );

    if (!usuario) {

      alert('Usuário não encontrado.');
      return;

    }

    const coletas: Coleta[] = JSON.parse(
      localStorage.getItem('coletas') || '[]'
    );

    const novaColeta: Coleta = {

      id: Date.now(),

      geradorEmail: usuario.email,
      geradorNome: usuario.nomeOrganizacao,

      tipoResiduo: this.tipoResiduo,
      pesoEstimado: this.pesoEstimado,

      enderecoColeta: this.enderecoColeta,

      dataDesejada: this.dataDesejada,

      horarioPreferido: this.horarioPreferido,

      observacoes: this.observacoes,

      status: 'pendente',

      criadaEm: new Date().toISOString()

    };

    coletas.push(novaColeta);

    localStorage.setItem(
      'coletas',
      JSON.stringify(coletas)
    );

    alert('Solicitação enviada com sucesso!');

    this.limparFormulario();

  }

  limparFormulario(): void {

    this.tipoResiduo = '';
    this.pesoEstimado = null;
    this.enderecoColeta = '';
    this.dataDesejada = '';
    this.horarioPreferido = '';
    this.observacoes = '';

  }

}