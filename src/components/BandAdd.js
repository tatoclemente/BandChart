import { useState, useContext } from 'react'
import { useSocket } from '../hooks/useSocket'
import SocketContext from '../context/SocketContext'

export const BandAdd = () => {

  const [ valor, setValor ] = useState('')
  const { socket } = useContext( SocketContext )

  const onSubmit = (e) => {
    e.preventDefault()

    if ( valor.trim().length > 0 ) {
      socket.emit( 'create-band', { name: valor })
      setValor('')
    }
  }

  return (
    <>
      <h3>Agregar Banda</h3>

      <form onSubmit={ onSubmit }>
        <input
          className='form-control'
          placeholder='Nuevo nombre de banda'
          value={ valor }
          onChange={ (e) => setValor(e.target.value) }
        />
      </form>

    </>
  )
}
