Desafio referente ao módulo: Fundamentos do Node.js

## Introdução

Primeiro desafio da NOVA trilha de Node.js do Ignite.

## Sobre o desafio

Nesse desafio desenvolvido uma API para realizar o CRUD de suas *tasks* (tarefas).

A API deve contém as seguintes funcionalidades:

- Criação de uma task
- Listagem de todas as tasks
- Atualização de uma task pelo `id`
- Remover uma task pelo `id`
- Marcar pelo `id` uma task como completa
- E o verdadeiro desafio: Importação de tasks em massa por um arquivo CSV (csv-parse)


Rotas:

- `POST - /tasks`
    
    Possível criar uma task no banco de dados, enviando os campos `title` e `description` por meio do `body` da requisição.
    
    Ao criar uma task, os campos: `id`, `created_at`, `updated_at` e `completed_at` são preenchidos automaticamente, conforme a orientação das propriedades acima.
    
- `GET - /tasks`
    
    Possível listar todas as tasks salvas no banco de dados e possível realizar uma busca, filtrando as tasks pelo `title` e `description`
    
- `PUT - /tasks/:id`
    
    Possível atualizar uma task pelo `id`.
    
    No `body` da requisição, deve receber somente o `title` e/ou `description` para serem atualizados.
    
    Se for enviado somente o `title`, significa que o `description` não pode ser atualizado e vice-versa.
    
    
- `DELETE - /tasks/:id`
    
    Possível remover uma task pelo `id`.
    
    Antes de realizar a remoção, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.
    
- `PATCH - /tasks/:id/complete`
    
    Possível marcar a task como completa ou não. Isso significa que se a task estiver concluída, deve voltar ao seu estado “normal”.
    
    Antes da alteração, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.
    

### E a importação do CSV?

A importação será feita de outra forma, utilizando o csv-parse.

