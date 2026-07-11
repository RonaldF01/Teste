export interface Usuario {
  email: string;
  senha: string;
  perfil: 'gerador' | 'cooperativa' | 'recicladora';

  nomeOrganizacao: string;
  cnpj: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
}