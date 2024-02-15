import { inject, injectable } from "tsyringe"
import { HttpResponse } from '@shared/helpers/http'
import { IDestiladoPrincipalRepository } from "@modules/drinks/repositories/i-destilado-principal-repository"

@injectable()
class IdSelectDestiladoPrincipalUseCase {
  constructor(
    @inject('DestiladoPrincipalRepository')
    private destiladoPrincipalRepository: IDestiladoPrincipalRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const destiladoPrincipal = await this.destiladoPrincipalRepository.idSelect(id)

    return destiladoPrincipal
  }
}

export { IdSelectDestiladoPrincipalUseCase }
