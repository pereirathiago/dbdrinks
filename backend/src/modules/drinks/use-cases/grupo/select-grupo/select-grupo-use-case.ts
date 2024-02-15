import { IGrupoRepository } from '@modules/drinks/repositories/i-grupo-repository'
import { inject, injectable } from 'tsyringe'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectGrupoUseCase {
  constructor(
    @inject('GrupoRepository')
    private grupoRepository: IGrupoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const grupo = await this.grupoRepository.select(filter)

    const newGrupo = {
      items: grupo.data,
      hasNext: false
    }

    return newGrupo
  }
}

export { SelectGrupoUseCase }
