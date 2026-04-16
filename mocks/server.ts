import { createServer, Model } from 'miragejs';

createServer({
  models: {
    to_dos: Model
  },

  routes() {
    this.namespace = 'api';
    this.get('/to_dos', (schema) => {
        return schema.all('to_dos');
    });

    this.post('/to_dos', (schema, request) => {
      const atributos = JSON.parse(request.requestBody);
      const to_do = schema.create('to_dos', atributos);
      return to_do;
    });

    this.put('/to_dos/:id', (schema, request) => {
      const id = request.params.id;
      const novosAtributos = JSON.parse(request.requestBody);
      const to_do = schema.find('to_dos', id);
      to_do?.update(novosAtributos);
      return {};
    });

    this.delete('/to_dos/:id', (schema, request) => {
      const id = request.params.id;
      const to_do = schema.find('to_dos', id);
      to_do?.destroy();
      return {};
    });
  },
});
