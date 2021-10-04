const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const {id} = request.params;
        const data = await connection('ongs')
                                .join('cities', 'cities.id', '=', 'ongs.city')
                                .where('ongs.id', id)
                                .select('ongs.*', 'cities.state_id');
        return response.json(data);
    },

    async update(request, response) {
        const {id} = request.body;
        const {name} = request.body;
        const {email} = request.body;
        const {whatsapp} = request.body;
        const {city} = request.body;
        const {password} = request.body;
        
        await connection('ongs').update({
            name,
            email,
            whatsapp,
            city,
            password
        }).where('id', id);

        return response.statusCode;
        
    }
}