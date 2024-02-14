import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers';
import { ITipoRepository } from '@modules/drinks/repositories/i-tipo-repository';

@injectable()
class MultiDeleteTipoUseCase {
  constructor(
    @inject('TipoRepository')
    private tipoRepository: ITipoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const tipo = await this.tipoRepository.multiDelete(ids)

    return tipo
  }
}

export { MultiDeleteTipoUseCase }
