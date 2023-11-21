import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';

const Exito = () => {
    const navigate = useNavigate();
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ width: '92%' }}>
                    <div className='row'>
                        <div className='col s12' style={{ textAlign: 'center' }}>
                            <p style={{ color: 'darkgreen', fontWeight: 'bold', fontSize: '24px' }}> SE REGISTRÓ LA FINALIZACIÓN DE LA LLAMADA CON ÉXITO</p>
                            <Button onClick={() => navigate('/')}> VOLVER A INICIO</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export { Exito }