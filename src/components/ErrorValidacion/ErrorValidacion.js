import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ErrorValidacion = () => {
    const navigate = useNavigate()
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ width: '92%' }}>
                    <div className='row'>
                        <div className='col s12'>
                            <p>ERROR EN LA VALIDACION</p>
                            <Button onClick={() => navigate('/')}> VOLVER A INICIO</Button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export { ErrorValidacion }
