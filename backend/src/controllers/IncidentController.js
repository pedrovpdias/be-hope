  const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;
        const [ count ] = await connection('incidents').count();
        
        const location = request.params.any;

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id') 
        .join('cities', 'cities.id', '=', 'ongs.city') 
        .join('states', 'states.id', '=', 'cities.state_id')
        .where('cities.city', 'LIKE', '%'+location+'%')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'incidents.*',
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'cities.city', 
            'states.uf'
        ])
        .orderBy('incidents.priority', 'desc')
        .orderBy('incidents.date', 'asc');;

        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },
    
    async create(request, response) {
        const { title, description, value, priority } = request.body;
        const ong_id = request.headers.authorization;
        
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            priority,
            ong_id
        }); 

        return response.json({id});
    },

    async update(request, response) {
        const { id, title, description, value, collected, priority } = request.body;
        
        await connection('incidents').update({
            title,
            description,
            value,
            collected,
            priority
        }).where('id', id);

        return response.statusCode;
        
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

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