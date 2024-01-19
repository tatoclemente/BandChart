
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';

const connectSocketServer = () => {
  const socket = io.connect('http://localhost:8080', {
    transport: ['websocket'],
  })

  // socket.on('connect', () => {
  //   setOnline(true)
  // })

  // socket.on('disconnect', () => {
  //   setOnline(false)
  // })

  return socket;
}


function App() {

  const [ socket ] = useState( connectSocketServer() )
  const [ online, setOnline ] = useState(false)
  const [ bands, setBands ] = useState([])

  useEffect(() => {
    console.log(socket);
    setOnline( socket.connected )
  }, [])

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true)
    })
  }, [socket])

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false)
    })
  }, [socket])

  useEffect(() => {
    socket.on('current-bands', (bands) => {
 
      setBands(bands)
    })
  }, [socket])

  const vote = ( id ) => {
    socket.emit( 'vote-band', id )
  } 

  // Borrar banda
  const deleteBand = ( id ) => {
    socket.emit( 'delete-band', id )
  }
  
  const changeName = ( id, name ) => {
    socket.emit( 'change-name-band', { id, name })
  }

  const createBand = ( name ) => {
    socket.emit( 'create-band', { name })
  }

  return (
    <div className='container'>
      <div className='alert'>
        <p>
          Service Status: 
          {
            online 
            ? <span className='text-success mx-2'>Online</span>
            : <span className='text-danger mx-2'>Offline</span>
          }
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />

      <div className='row'>
        <div className='col-8'>
          <BandList 
            data={bands} 
            vote={vote} 
            deleteBand={deleteBand} 
            changeName={changeName} />
        </div>
        <div className='col-4'>
          <BandAdd createBand={ createBand } />
        </div>
      </div>
    </div>
  );
}

export default App;
