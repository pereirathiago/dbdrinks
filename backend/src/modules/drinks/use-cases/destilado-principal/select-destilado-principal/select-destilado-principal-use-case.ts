import { IDestiladoPrincipalRepository } from '@modules/drinks/repositories/i-destilado-principal-repository'
import { inject, injectable } from 'tsyringe'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectDestiladoPrincipalUseCase {
  constructor(
    @inject('DestiladoPrincipalRepository')
    private destiladoPrincipalRepository: IDestiladoPrincipalRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const destiladoPrincipal = await this.destiladoPrincipalRepository.select(filter)

    const newDestiladoPrincipal = {
      items: destiladoPrincipal.data,
      hasNext: false
    }

    return newDestiladoPrincipal
  }
}

export { SelectDestiladoPrincipalUseCase }
