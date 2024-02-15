import { ICategoriaRepository } from '@modules/drinks/repositories/i-categoria-repository'
import { inject, injectable } from 'tsyringe'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectCategoriaUseCase {
  constructor(
    @inject('CategoriaRepository')
    private categoriaRepository: ICategoriaRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const categoria = await this.categoriaRepository.select(filter)

    const newCategoria = {
      items: categoria.data,
      hasNext: false
    }

    return newCategoria
  }
}

export { SelectCategoriaUseCase }
