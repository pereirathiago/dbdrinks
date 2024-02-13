import { v4 as uuidV4 } from 'uuid'

import createConnection from '../index'

async function create() {
  const connection =  await createConnection()

  await connection.query(
    `INSERT INTO grupos (
      id,
      nome,
      descricao,
      created_at,
      updated_at
    ) values
      ('${uuidV4()}', 'Collins', 'Long. Drink montado, preparado com suco de limão, açúcar, club soda e o destilado.', 'now()', 'now()'),
      ('${uuidV4()}', 'Egg Nogs', 'Coquetéis nutritivos feito à base de leite, açúcar, ovos, canela ou noz moscada e às vezes vinhos fortificados. Podem ser frios ou quentes.', 'now()', 'now()'),
      ('${uuidV4()}', 'Fizzes', '“Fizz” = Efervescência. São preparados com açúcar, limão, soda e muito gelo. Todos os ingredientes devem ser batidos e completados com soda. São tônicos, calmantes e altamente refrescantes.', 'now()', 'now()'),
      ('${uuidV4()}', 'Flips', 'São muitos nutritivos, feitas a base de gema de ovo, vinhos generosos e as vezes açúcar e pulverizados com noz moscada ou canela.', 'now()', 'now()'),
      ('${uuidV4()}', 'Grogs', 'São servidos sempre quentes. São feitos com água fervendo, açúcar e rodela de limão espetados com cravo e sobre o limão coloca-se o destilado e ateando fogo em seguida. Geralmente os destilados são da família do brandy.', 'now()', 'now()'),
      ('${uuidV4()}', 'High balls', 'Long Drink, bebida destilada com gelo completado com soda ou ginger ale e um zest de limão.', 'now()', 'now()'),
      ('${uuidV4()}', 'Ulepss', 'Long Drink, feito com hortelã macerada com açúcar servido com qualquer destilado, geralmente whisky e gelo picado.', 'now()', 'now()'),
      ('${uuidV4()}', 'Pousse café', 'Origem francesa. Preparado com licores, destilados e xaropes. Deve-se saber a densidade das bebidas pois são feitas em camadas e não devem se misturar.', 'now()', 'now()'),
      ('${uuidV4()}', 'Slingcafé', 'Long Drink preparados com limão, açúcar, um destilado, um licor e completados com soda.', 'now()', 'now()'),
      ('${uuidV4()}', 'Smashes', 'Smash = esmagar. Se preparam em copo old fashioned com hortelã esmagada com açúcar acrescido de gelo, um destilado e decorado com rodela de laranja, cereja e casca de limão.', 'now()', 'now()'),
      ('${uuidV4()}', 'Sours', 'Sour = ácido. São sempre batidos com um destilado, suco de limão e açúcar e às vezes com um pouco de clara de ovo. FRAPPEE: Feitos com gelo moído e servido, geralmente em taça de cognac com um licor.', 'now()', 'now()')
      
    `
  )

  await connection.close()
}

export async function seedGrupos() {
  await create().then(() => console.log('Grupo created'))
}