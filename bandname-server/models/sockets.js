const BandList = require("./band-list");


class Sockets {

  constructor( io ) {

    this.io = io;

    this.bandList = new BandList();

    this.socketsEventes();
    
  }

  socketsEventes() {

    // On connection
    this.io.on('connection', ( socket ) => { 

      console.log('Cliente conectado');

      // Emitir al cliente conectado todas las bandas actuales
      socket.emit('current-bands', this.bandList.getBands() );

      // Votar por la banda

      socket.on('vote-band', ( id ) => {
        this.bandList.increaseVotes( id );
        this.io.emit('current-bands', this.bandList.getBands() );
      })

      socket.on('delete-band', ( id ) => {
        this.bandList.removeBand( id );
        this.io.emit('current-bands', this.bandList.getBands() );
      })

      socket.on('change-name-band', ( data ) => {
        this.bandList.changeBandName( data.id, data.name );
        this.io.emit('current-bands', this.bandList.getBands() );
      })
      
      socket.on('create-band', ( data ) => {
        this.bandList.addBand( data.name );
        this.io.emit('current-bands', this.bandList.getBands() );
      })

    }); 
  }

}


module.exports = Sockets;