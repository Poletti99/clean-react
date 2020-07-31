export class UnexpectedError extends Error {
  constructor() {
    super('Algo de errado não está certo.');
    this.name = 'UnexpectedError';
  }
}
