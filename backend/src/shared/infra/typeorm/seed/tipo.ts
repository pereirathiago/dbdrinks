import { v4 as uuidV4 } from 'uuid'

import createConnection from '../index'

async function create() {
  const connection =  await createConnection()

  await connection.query(
    `INSERT INTO tipos (
      id,
      nome,
      descricao,
      created_at,
      updated_at
    ) values
      ('${uuidV4()}', 'Batido', 'Devido a diferença de densidade dos ingredientes necessitam ser batidos na coqueteleira ou no liquidificador para que possam se misturar de maneira uniforme.', 'now()', 'now()'),
      ('${uuidV4()}', 'Mexido', 'Para preparar um drink mexido, usa-se o mixing glass e a colher bailarina. Esta modalidade de cocktail é sempre feita com bebidas de densidades semelhantes, geralmente servidos frios em cocktail glass, algumas vezes sem pedras de gelo. Neste último caso, a taça é gelada previamente em um congelador ou com pedras de gelo durante o preparo do drink', 'now()', 'now()'),
      ('${uuidV4()}', 'Montado', 'Feitos diretamente no copo. Não precisam ser agitados em coqueteleira ou mexidos no mixing glass', 'now()', 'now()'),
      ('${uuidV4()}', 'Throwing', 'Embora seja menos regrada que as anteriores, ela consiste de transferir os líquidos de um copo para outro a fim de misturar os ingredientes ao mesmo tempo em que se aera, cria bolhas e libera aromas no cocktail. Na passagem do líquidos, o gelo é retido no copo com o strainer e é feita uma grande esticada, distanciando bastante os dois copos. Também é uma técnica utilizada como entretenimento. Exemplos: Blue Blaze', 'now()', 'now()'),
      ('${uuidV4()}', 'Rolling', 'O rolling descreve a ação de mover todo o conteúdo de uma parte da coqueteleira para a outra (incluindo o gelo), em um movimento lento, mantendo as duas partes próximas. É uma técnica diferente do throwing, no sentido de que não é necessário utilizar o strainer, pois o gelo e outros pedaços de insumo devem passar de um copo para o outro.', 'now()', 'now()')
      
    `
  )

  await connection.close()
}

export async function seedTipo() {
  await create().then(() => console.log('Tipo created'))
}