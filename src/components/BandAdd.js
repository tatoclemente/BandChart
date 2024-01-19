import React, { useState } from 'react'

export const BandAdd = ({ createBand }) => {

  const [ valor, setValor ] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if ( valor.trim().length > 0 ) {
      createBand( valor )
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
