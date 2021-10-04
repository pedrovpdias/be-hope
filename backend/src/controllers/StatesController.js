const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const states = await connection('states')
                                .select('*');
        return response.json(states);
    }
}