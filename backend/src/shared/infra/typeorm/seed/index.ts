import { admin } from "./admin"
import { seedCategoria } from "./categoria"
import { seedCopoTaca } from "./copo-taca"
import { seedGrupos } from "./grupos"
import { seedTipo } from "./tipo"

async function seeder() {
  await admin()
  await seedCopoTaca()
  await seedTipo()
  await seedCategoria()
  await seedGrupos()
}

seeder()
