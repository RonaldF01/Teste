import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Usuario } from '../../../../models/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit, OnDestroy {

  email = '';
  senha = '';

  aceitouTermos = false;

  slideAtual = 0;

  modalTermosAberto = false;

  abaTermos: 'privacidade' | 'termos' = 'privacidade';

  private intervaloCarrossel?: ReturnType<typeof setInterval>;

  slides = [
    {
      titulo: 'GERADOR',
      icone: 'fa-building',
      headline: 'Gerencie seus resíduos com eficiência',
      descricao:
        'Solicite coletas, acompanhe a destinação e gere certificados de conformidade com a PNRS.',
      itens: [
        'Solicitação de coleta em poucos cliques',
        'Certificados de rastreabilidade',
        'Acesso a incentivos fiscais'
      ]
    },
    {
      titulo: 'COOPERATIVA',
      icone: 'fa-recycle',
      headline: 'Conecte-se com geradores e recicladoras',
      descricao:
        'Receba solicitações de coleta, gerencie sua frota e otimize rotas de transporte.',
      itens: [
        'Match automático de coletas',
        'Gestão de frota e motoristas',
        'Acompanhamento em tempo real'
      ]
    },
    {
      titulo: 'RECICLADORA',
      icone: 'fa-industry',
      headline: 'Receba e processe resíduos com rastreabilidade',
      descricao:
        'Controle de volumes recebidos, aferição de peso e validação de manifestos.',
      itens: [
        'Controle de volume por tipo',
        'Aferição e validação de peso',
        'Rastreabilidade completa'
      ]
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.iniciarCarrossel();
  }

  ngOnDestroy(): void {
    this.pararCarrossel();

    document.body.style.overflow = '';
  }

  iniciarCarrossel(): void {
    this.pararCarrossel();

    this.intervaloCarrossel = setInterval(() => {
      this.proximoSlide();
    }, 4000);
  }

  pararCarrossel(): void {
    if (this.intervaloCarrossel) {
      clearInterval(this.intervaloCarrossel);
      this.intervaloCarrossel = undefined;
    }
  }

  proximoSlide(): void {
    this.slideAtual =
      (this.slideAtual + 1) % this.slides.length;
  }

  slideAnterior(): void {
    this.slideAtual =
      (this.slideAtual - 1 + this.slides.length) %
      this.slides.length;

    this.iniciarCarrossel();
  }

  irParaSlide(indice: number): void {
    this.slideAtual = indice;

    this.iniciarCarrossel();
  }

  abrirTermos(
    aba: 'privacidade' | 'termos' = 'privacidade'
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

  entrar(): void {

    if (!this.aceitouTermos) {
      alert(
        'Você precisa aceitar os Termos de Uso e a Política de Privacidade.'
      );
      return;
    }

    const emailTratado =
      this.email.trim().toLowerCase();

    if (!emailTratado || !this.senha) {
      alert('Preencha o e-mail e a senha.');
      return;
    }

    const usuarios: Usuario[] = JSON.parse(
      localStorage.getItem('usuarios') || '[]'
    );

    if (usuarios.length === 0) {
      alert('Nenhum usuário cadastrado.');
      return;
    }

    const usuarioEncontrado = usuarios.find(
      usuario =>
        usuario.email.toLowerCase() === emailTratado &&
        usuario.senha === this.senha
    );

    if (!usuarioEncontrado) {
      alert('E-mail ou senha inválidos.');
      return;
    }

    localStorage.setItem(
      'usuarioLogado',
      'true'
    );

    localStorage.setItem(
      'usuarioAtual',
      usuarioEncontrado.email
    );

    localStorage.setItem(
      'perfilUsuario',
      usuarioEncontrado.perfil
    );

    this.redirecionarPorPerfil(
      usuarioEncontrado.perfil
    );
  }

  private redirecionarPorPerfil(
    perfil: Usuario['perfil']
  ): void {

    switch (perfil) {

      case 'gerador':
        this.router.navigate([
          '/gerador/dashboard'
        ]);
        break;

      case 'cooperativa':
        this.router.navigate([
          '/cooperativa/dashboard'
        ]);
        break;

      case 'recicladora':
        this.router.navigate([
          '/recicladora/dashboard'
        ]);
        break;
    }
  }

  irCadastro(): void {
    this.router.navigate(['/cadastro']);
  }
}