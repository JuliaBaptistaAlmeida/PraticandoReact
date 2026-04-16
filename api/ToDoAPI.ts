import axios from 'axios';

const axiosinstance = axios.create({});

interface IToDo {
    id: number;
    title: string;
    completed: boolean;
}

interface IToDoWithoutID {
    title: string;
    completed: boolean;
}

export const ToDoAPI = {
    // Pegar todas
    async getAll() {
        const response = await axiosinstance.get('/api/to_dos');
        return response.data.toDos as IToDo[];
    },

    // Criar
    async create(data: IToDoWithoutID) {
        const response = await axiosinstance.post('/api/to_dos', data);
        console.log("CREATE RESPONSE:", response.data);
        return response.data.toDos as IToDo;
    },

    // Atualizar
    async update(id: string, data: Partial<IToDoWithoutID>) {
        const response = await axiosinstance.put(`/api/to_dos/${id}`, data);
        return response.data.toDos as IToDo; 
    },

    // Remover
    async remove(id: string) {
        await axiosinstance.delete(`/api/to_dos/${id}`);
    }
};
