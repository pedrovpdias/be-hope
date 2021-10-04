const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;
        const { password } = request.body;

        const ong = await connection('ongs')
                    .where('id', id)
                    .where('password', password)
                    .select('name')
                    .first();

        if(!ong) {
            return response.status(400).json({error: "No ONG found with this id"});
        }

        return response.json(ong);
    }
}