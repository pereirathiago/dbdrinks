import { v4 as uuidV4 } from 'uuid'

import createConnection from '../index'

async function create() {
  const connection =  await createConnection()

  await connection.query(
    `INSERT INTO copos_tacas (
      id,
      nome,
      descricao,
      created_at,
      updated_at
    ) values
      ('${uuidV4()}', 'Hurricane', 'Também chamada de taça escandinava, é usada para servir cocktails com sabores mais tropicais e frutados. Tamanho varia entre 400 e 600ml', 'now()', 'now()'),
      ('${uuidV4()}', 'Taça Borgogne', 'Taça usada para consumir vinho, favorece a liberação dos aromos da bebida', 'now()', 'now()'),
      ('${uuidV4()}', 'Pilsner', 'Indicado para cervejas tipo pilsen. O design proporciona a formação de colarinho cremoso e direciona o aroma do lúpulo diretamente ao nariz do consumidor', 'now()', 'now()'),
      ('${uuidV4()}', 'Highball', 'Mais largo e mais baixo que o Collins, o Highball é usado para drinks com gelo e proporção de insumos não-alcoolicos maior do que a quantidade de spirit. Comporta entre 240 e 350ml', 'now()', 'now()'),
      ('${uuidV4()}', 'Taça Martini', 'São taças elegantes, bem proporcionadas, próprias para misturas delicadas. Devem ser utilizadas para servir coquetéis sem gelo. Possuem um bojo bem aberto para permitir guarnições e complementos.', 'now()', 'now()'),
      ('${uuidV4()}', 'Weizen', 'É recomendado para a apreciação das cervejas de trigo (weissbier) e comporta até 500ml de bebida. Sua forma permite a correta expansão da espuma e a visualização das cores da cerveja.', 'now()', 'now()'),
      ('${uuidV4()}', 'Collins', 'Alto e estreito, de linhas retas, semelhante ao long drink, porém maior, costumaser usado para servir cocktails com gelo completados com sucos, refrigerantes ou outras bebidas, carbonatadas. Comporta aproximadamente 300 a 410ml.', 'now()', 'now()'),
      ('${uuidV4()}', 'Snifter', 'Usada para conhaque. Seu formato permite maior contrato com o oxigênio e com o calor das mãos, proporcionando uma maior evaporação, liberano os aromas frutadas e amadeirados provenientes do envelhecimento da bebida aflorem.', 'now()', 'now()'),
      ('${uuidV4()}', 'Juice', 'Copo para sucos mais comum. Semlhante ao long drink, um pouco mais largo e mais baixo. Comporta aproximadamente 300ml de bebida, com acréscimo ou não de gelo.', 'now()', 'now()'),
      ('${uuidV4()}', 'Taça Flute', 'Taça ideal para drinks com espumantes, tem haste longa para fazer com que o calor da mão não entre em contato com a bebida, possibilitando assim, ser tomado na temperatura ideial. Seu corpo é côncavo permitindo que as bolhas não saiam com facilidade.', 'now()', 'now()'),
      ('${uuidV4()}', 'Coupette/Margarita', 'É usada para tomar margarita. Seu desenho possibilita servir outras bebidas bem geladas, em quantidades acima de 200ml.', 'now()', 'now()'),
      ('${uuidV4()}', 'Long Drink', 'Copo alto e estrito, de linhas retas, costuma ser usado para servir cocktails com gelo completados com sucos, refrigerantes ou outras bebidas de degustação lenta. Comporta 250ml de líquido.', 'now()', 'now()'),
      ('${uuidV4()}', 'Taça Coupe', 'Para servir champagne, serve bem drinks delicados sem gelo, sua alça longa evira que o calor das mão esquente a bebida.', 'now()', 'now()'),
      ('${uuidV4()}', 'Irish Coffee Mug', 'Corpo refratário, com pé e alça ideal para se tornar um coquetel quente. Seu formato favorece a degustação aromática de drinks como o Irish Coffee ou compostos de chás, café e chocolates quentes.', 'now()', 'now()'),
      ('${uuidV4()}', 'Shot', 'São pequenos copos utilizados para servir doses de bebidas puras ou pequenos drinks misturados que podem ser tomadas em um só gole. Normalmente tem dois tamanhos: 100 ml ou 50ml.', 'now()', 'now()'),
      ('${uuidV4()}', 'Mason Jar Glass', 'Cada vez mais utilizado, é um pote de vidro com rosca e tampa. Combina bem com drinks informais e conemporâneos.', 'now()', 'now()'),
      ('${uuidV4()}', 'All-purpose Wine Goblet', 'Usada genericamente para vinhos, com formato que segue o padrão ISO que varia um pouco dependendo do fabricante, possibilita a adequeda degustação de todos os tipos de vinho. Tem capacidade reduzida, boca estreita e haste mais curta, seu desenho favorece a oxigenação e a retenção dos aromas da bebidas.', 'now()', 'now()'),
      ('${uuidV4()}', 'On The Rocks/Old Fashioned', 'Ideal para drinks montados ou destilados servidos com gelo, tem boca larga, maior que a extremidade inferior, facilita o acréscimo gradual de pedras de gelo ao cocktail.', 'now()', 'now()'),
      ('${uuidV4()}', 'Copo de cachaça', 'Também conhecido como minicamericano, mais usado para doses de cachaça, se diferencia do shot glass apenas pelo design. Comporta de  45 a 60 ml de bebida e facilita a ingestão em apenas um gole.', 'now()', 'now()'),
      ('${uuidV4()}', 'Taça de licor', 'A taça de licor se assemelha muito as taças utilizadas para servir vinho do porto, por serem bebidas mais grossas e doces. Essa taça tem tamanho pequeno e haste curta, ideal para consumo de um volume menor das bebidas.', 'now()', 'now()'),
      ('${uuidV4()}', 'Glencairn', 'Na verdade, é mais uma taça, do que um copo. Ela é padrão para degustação de whisky. pois potencializa o aroma da bebida. Além da taça Glencair, a taça ISO també pode ser usada para degustação de whisky e diversas outras bebidas.', 'now()', 'now()'),
      ('${uuidV4()}', 'Taça Cálice', 'Foi desenvolvida especialmente para se tomar vinho do porto.', 'now()', 'now()'),
      ('${uuidV4()}', 'Taça de vinho branco', 'Haste longa para evitar o calor da mão, bojo comprido e estreito para conservar a temperatura fria. Esse é um tipo de taça que deve ser fina e delicada.', 'now()', 'now()'),
      ('${uuidV4()}', 'Taça de vinho tinto', 'Essa taça é muito delicada e charmosa, tem bojo arredondado e é ideal para ser acolhida pela mão. Sua borda tem abertura ideal para o vinho respirar após sair do decantador.', 'now()', 'now()'),
      ('${uuidV4()}', 'Caneca de cobro', 'Muito é falado de copos para drinks que mantenham os coquetéis refrescantes, a famosa Caneca de Cobre do Moscow Mule é feita desse material justamente para manter o coquetel sempre frio e dar um tom diferenciado neste clássico.', 'now()', 'now()'),
      ('${uuidV4()}', 'Taça copa Balloon', 'É uma taça de corpo grande e arredondado, com a boca larga e ligeramente menor que o corpo, com uma haste longa. Drinks com bastante gelo e/ou bebidas.', 'now()', 'now()'),
      ('${uuidV4()}', 'Caneco de Chopp', 'Ideal para tomar aquele chopp ou cerveja geladinha, mantém o líquido gelado por mais tempo pois diminui o contrato das mãos diretamente no caneco. Isso diminui a troca de calor entre as partes.', 'now()', 'now()'),
      ('${uuidV4()}', 'Copo Ilhabela', 'Copo utilizado principalmente para caipirinha, com fundo reforçado.', 'now()', 'now()')
      
    `
  )

  await connection.close()
}

export async function seedCopoTaca() {
  await create().then(() => console.log('Copo/Taça created'))
}