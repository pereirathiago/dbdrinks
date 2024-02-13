import { v4 as uuidV4 } from 'uuid'

import createConnection from '../index'

async function create() {
  const connection =  await createConnection()

  await connection.query(
    `INSERT INTO categorias (
      id,
      nome,
      descricao,
      created_at,
      updated_at
    ) values
      ('${uuidV4()}', 'Short Drinks', 'São as bebidas servidas em copos pequenos como cálice, taça de coquetel, copo “old fashioned”. Dentro dos shorts drinks classificamos os secos e/ou ácidos como aperitivos e os doces e/ou cremosos são digestivos. Eles são considerados os “verdadeiros coquetéis”.', 'now()', 'now()'),
      ('${uuidV4()}', 'Hot Drinks', 'Como o próprio nome já sugere, os hot drinks são coquetéis feitos com bebidas quentes. Tais como: café, chás, chocolates, servidas com ou sem álcool. São utilizadas para revigorar, estimular e combater o frio.', 'now()', 'now()'),
      ('${uuidV4()}', 'Long Drinks', 'Os long drinks são cocktails refrescantes, normalmente compostos de água, sucos, refrigerantes, sodas, águas gaseificadas ou espumantes e servidos em copos longos, sempre com muito gelo. São ótimos para serem tomados em dias quentes, na praia ou piscina, após a prática de esporte e em festas.', 'now()', 'now()')
      
    `
  )

  await connection.close()
}

export async function seedCategoria() {
  await create().then(() => console.log('Categoria created'))
}