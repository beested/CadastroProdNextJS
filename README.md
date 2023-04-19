Projeto para [Windel](https://demo.windel.com.br/dashboard) projeto feito apartir do[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## CRUD de Produtos

Primeiro, execute o servidor de desenvolvimento:

```
CADASTRO DE PRODUTOS
-Nome do Produto
-Referencia
-Unidade
-Imagem
-Valor de Venda
-Fabricante
-Estoque

LISTAGEM DE PRODUTOS
#Todos os produtos criados são listados na sua respectiva tabela.

EDIÇÃO DE PRODUTOS
#Ao clicar em editar o produto, o sistema trás as informações já cadastradas para a atualização.

DELETAR PRODUTOS
#Ao clicar deletar o produto, o mesmo é apagado da base de dados.
```

O Sistema conta com algumas informações extras.
Sistema de rotas, utilizando o NEXT.JS.
Zebramento (entre branco e cinza).
Exibição de valores em $ REAL.
Exibição da unidade sempre em uppercase.
Filtros por NOME, FABRICANTE e REFERENCIA.
Botão com loading.
Ao selecionar uma imagem no cadastro do produto, existe a pre-visualização do mesmo.
Ordenação de crescente/decrescente nos campos VALOR DE VENDA e ESTOQUE.
Botão para limpar os filtros selecinados.
Sistema de páginação, exibindo 4 produtos por página.
Caso o estoque estiver como 0, é exibido como ESGOTADO(em vermelho).
Caso não tenha fabricante, é exibido como SEM FABRICANTE.

Abra o [http://localhost:3000](http://localhost:3000) para ver os resultados.
