import { IDestiladoPrincipalRepository } from "@modules/drinks/repositories/i-destilado-principal-repository"
import { inject, injectable } from "tsyringe"

interface IRequest {
  nome: string
  descricao: string
}

@injectable()
class CreateDestiladoPrincipalUseCase {
  constructor(
    @inject('DestiladoPrincipalRepository')
    private destiladoPrincipalRepository: IDestiladoPrincipalRepository
  ) { }

  async execute({
    nome,
    descricao
  }: IRequest) {
    const result = await this.destiladoPrincipalRepository.create({
      nome,
      descricao
    })

    return result
  }
}

export { CreateDestiladoPrincipalUseCase }