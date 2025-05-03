import { json } from "express";

let servers = [
    {id: 1, name: 'Buy', status: 'Pending'}
];

export const createTask = (req, res) => {
    // Проверка наличия обязательных полей
    if (!req.body.title || !req.body.description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    // Создание нового объекта задачи
    const newTask = {
        id: servers.length + 1,
        name: req.body.title,
        description: req.body.description,
        status: 'Pending', // Добавляем статус по умолчанию
        createdAt: new Date().toISOString() // Добавляем дату создания
    };

    // Добавление в массив
    servers.push(newTask);
    console.log(newTask + '\n')
    console.log(servers)
    // Перенаправление на страницу задач
    res.redirect('/tasks');
};

export const getTasks = (req, res) => {
    res.status(200).json(servers);
};

export const getServersArray = () => servers