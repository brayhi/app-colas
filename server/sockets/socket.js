const { io } = require('../server');

const {TicketControl} = require('../classes/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimoscuatro: ticketControl.getUltimosCuatro()
    })

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();

        callback(siguiente);


    });

    client.on('atenderTicket', (data, callback) => {
        if( !data.escritorio ) {
            return callback({
                err:true,
                mensaje: 'El escritoro es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        client.broadcast.emit('ultimosCuatro', {
            ultimoscuatro: ticketControl.getUltimosCuatro()
        });

        //actualizar o notificar cambios en los ultimos cuatro
    })

    

});