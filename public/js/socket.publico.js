var socket = io ();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4]; 

socket.on('estadoActual', function(data) {
    actualizarHTML(data.ultimoscuatro);
});
socket.on('ultimosCuatro', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizarHTML(data.ultimoscuatro);
})


function actualizarHTML(ultimoscuatro)  {
    for (var i = 0; i <= ultimoscuatro.length - 1; i++){
        lblTickets[i].text('Ticket '+ ultimoscuatro[i].numero);
        lblEscritorios[i].text('Escritorio '+ ultimoscuatro[i].escritorio);
    }
}