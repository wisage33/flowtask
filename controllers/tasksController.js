let servers = [
    {id: 1, name: 'AWS', status: 'Working'},
    {id: 2, name: 'Google Cloud', status: 'Pending'},
    {id: 3, name: 'Yandex Cloud', status: 'Working'},
    {id: 4, name: 'Microsoft', status: 'Pending'},
    {id: 5, name: 'CLO.ru', status: 'Error'}
]

export const getAll = (req, res) => {
    res.status(200).json(servers)
}