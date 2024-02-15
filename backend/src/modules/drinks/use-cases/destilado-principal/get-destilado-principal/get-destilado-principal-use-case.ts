import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { IDestiladoPrincipalRepository } from '@modules/drinks/repositories/i-destilado-principal-repository'

@injectable()
class GetDestiladoPrincipalUseCase {
  constructor(
    @inject('DestiladoPrincipalRepository')
    private destiladoPrincipalRepository: IDestiladoPrincipalRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const destiladoPrincipal = await this.destiladoPrincipalRepository.get(id)

    return destiladoPrincipal
  }
}

export { GetDestiladoPrincipalUseCase }
