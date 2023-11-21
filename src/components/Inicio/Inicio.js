import React, { useEffect } from 'react'
import { Nav, Form, Table, Button, Navbar, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Inicio = ({ llamadaTraida }) => {
    const navigate = useNavigate();



    return (
        <>
            <Navbar className="mr-auto" style={{ backgroundColor: '#19918F' }}>
                <Container>
                    <Navbar.Brand style={{ fontWeight: 'bold', color: 'white' }}>INICIO</Navbar.Brand>
                </Container>
            </Navbar>

            <br></br>


            <div className='row' style={{ marginLeft: '8px' }}>
                <div className='col s12'>
                    <Form.Group >
                        <Form.Label style={{ fontSize: '24px' }}>Nombre del Cliente: {llamadaTraida?.nombreCliente}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={{ fontSize: '24px' }}>Categoría previamente seleccionada: {llamadaTraida?.categoria}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={{ fontSize: '24px' }}>Opción previamente seleccionada: {llamadaTraida?.opcion}</Form.Label>
                    </Form.Group>

                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>SubOpción</th>
                                <th>Número de Órden</th>
                            </tr>
                        </thead>
                        <tbody>
                            {llamadaTraida?.subOpcionDTOS.map((e, index) => (
                                <tr key={index}>
                                    <td>{e.nombre}</td>
                                    <td>{e.nroOrden}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Button onClick={() => { navigate("/validaciones") }}>
                        VALIDAR
                    </Button>

                </div>
            </div>
        </>
    )
}

export { Inicio }
