
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
          <BandList data={bands} vote={vote} />
        </div>
        <div className='col-4'>
          <BandAdd />
        </div>
      </div>
    </div>
  );
}

export default App;
