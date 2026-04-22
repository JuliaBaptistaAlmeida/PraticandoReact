import { createServer, Model, Response } from 'miragejs';

function todoPlain(m: { attrs: Record<string, unknown> }) {
  return { ...m.attrs };
}

createServer({
  models: {
    to_dos: Model,
  },

  routes() {
    this.namespace = 'api';

    this.get('/to_dos', (schema) => ({
      toDos: schema.all('to_dos').models.map(todoPlain),
    }));

    this.post('/to_dos', (schema, request) => {
      const atributos = JSON.parse(request.requestBody);
      const to_do = schema.create('to_dos', atributos);
      return { toDos: todoPlain(to_do) };
    });

    this.put('/to_dos/:id', (schema, request) => {
      const id = request.params.id;
      const novosAtributos = JSON.parse(request.requestBody);
      const to_do = schema.find('to_dos', id);
      if (!to_do) {
        return new Response(404, {}, { errors: ['not found'] });
      }
      to_do.update(novosAtributos);
      return { toDos: todoPlain(to_do) };
    });

    this.delete('/to_dos/:id', (schema, request) => {
      const id = request.params.id;
      const to_do = schema.find('to_dos', id);
      to_do?.destroy();
      return new Response(204);
    });
  },
});
