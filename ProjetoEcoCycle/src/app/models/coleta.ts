export interface Coleta {
  id: number;

  geradorEmail: string;
  geradorNome: string;

  tipoResiduo: string;
  pesoEstimado: number;
  enderecoColeta: string;
  dataDesejada: string;
  horarioPreferido: string;
  observacoes: string;

  status: 'pendente' | 'aceita' | 'concluida';

  cooperativaEmail?: string;
  cooperativaNome?: string;

  criadaEm: string;
}