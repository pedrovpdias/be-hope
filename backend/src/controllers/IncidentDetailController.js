const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id } = request.params;

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .join('cities', 'cities.id', '=', 'ongs.city')
        .join('states', 'states.id', '=', 'cities.state_id')
        .where('incidents.flag', 1)
        .where('incidents.id', id)
        .select([
            'incidents.*',
            'ongs.name',
            'cities.city',
            'states.uf',
            'ongs.whatsapp',
            'ongs.email',
        ])
        .first();
        return response.json(incidents);
    },

    async delete(request, response){
        const { id } = request.params;

        const incident = await connection('incidents')
                        .where('id', id)
                        .select('ong_id')
                        .first();
        if(incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permited.'});
        }

        await connection('incidents')
                .where('id', id)
                .delete();
        
        return response.status(204).send();
          

    }
};