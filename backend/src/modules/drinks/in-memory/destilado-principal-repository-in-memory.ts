import { HttpResponse } from "@shared/helpers";
import { IDestiladoPrincipalDTO } from "../dtos/i-destilado-principal-dto";
import { IDestiladoPrincipalRepository } from "../repositories/i-destilado-principal-repository";

class DestiladoPrincipalRepositoryInMemory implements IDestiladoPrincipalRepository {
  create(data: IDestiladoPrincipalDTO): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  list(search: string, page: number, rowsPerPage: number, order: string, filter: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  select(filter: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  idSelect(id: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  count(search: string, filter: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  get(id: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  update(data: IDestiladoPrincipalDTO): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
  multiDelete(ids: string[]): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }

}

export { DestiladoPrincipalRepositoryInMemory }