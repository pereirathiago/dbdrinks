import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers';
import { IDestiladoPrincipalRepository } from '@modules/drinks/repositories/i-destilado-principal-repository';

@injectable()
class MultiDeleteDestiladoPrincipalUseCase {
  constructor(
    @inject('DestiladoPrincipalRepository')
    private destiladoPrincipalRepository: IDestiladoPrincipalRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const destiladoPrincipal = await this.destiladoPrincipalRepository.multiDelete(ids)

    return destiladoPrincipal
  }
}

export { MultiDeleteDestiladoPrincipalUseCase }
