import { ITipoRepository } from "@modules/drinks/repositories/i-tipo-repository";
import { HttpResponse, ok, serverError } from "@shared/helpers";
import { Repository, getRepository } from "typeorm";
import { Tipo } from "../entities/tipo";
import { ITipoDTO } from "@modules/drinks/dtos/i-tipo-dto";

class TipoRepository implements ITipoRepository {
  private repository: Repository<Tipo>

  constructor() {
    this.repository = getRepository(Tipo)
  }


  // create
  async create({
    nome,
    descricao,
  }: ITipoDTO): Promise<HttpResponse> {
    const tipo = this.repository.create({
      nome,
      descricao,
    })

    const result = await this.repository.save(tipo)
      .then(tipoResult => {
        return ok(tipoResult)
      })
      .catch(error => {
        return serverError(error)
      })

    return result
  }


  // list
  list(search: string, page: number, rowsPerPage: number, order: string, filter: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }


  // select
  select(filter: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }


  // id select
  idSelect(id: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }


  // count
  count(search: string, filter: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }


  // get
  get(id: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }


  // update
  update(data: ITipoDTO): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }


  // delete
  delete(id: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }

}

export { TipoRepository }