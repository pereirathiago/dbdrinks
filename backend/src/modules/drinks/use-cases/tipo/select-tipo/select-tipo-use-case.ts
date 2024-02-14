import { ITipoRepository } from '@modules/drinks/repositories/i-tipo-repository'
import { inject, injectable } from 'tsyringe'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectTipoUseCase {
  constructor(
    @inject('TipoRepository')
    private tipoRepository: ITipoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const tipo = await this.tipoRepository.select(filter)

    const newTipo = {
      items: tipo.data,
      hasNext: false
    }

    return newTipo
  }
}

export { SelectTipoUseCase }
