const connection = require('../database/connection');
const { first } = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id } = request.params;
        
        const cities = await connection('cities')
                                .where('state_id', id)
                                .select('*')
        return response.json(cities);
    }
}