import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ErrorConfirmacion = () => {
    const navigate = useNavigate()
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ width: '92%' }}>
                    <div className='row'>
                        <div className='col s12' style={{ textAlign: 'center' }}>
                            <p style={{ color: 'darkred', fontWeight: 'bold', fontSize: '24px' }}> ERROR EN LA CONFIRMACIÓN!! SE CANCELA EL REGISTRO DE LA LLAMADA!!</p>
                            <Button onClick={() => navigate('/')}> VOLVER A INICIO</Button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export { ErrorConfirmacion }