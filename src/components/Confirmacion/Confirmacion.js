import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { Form, Button, Nav } from 'react-bootstrap';
import { ModalFinal } from '../ModalFinal/ModalFinal';
import axios from 'axios';
import { accionesService } from '../../services/acciones.service';

const Confirmacion = () => {
    const { handleSubmit, register, setValue, control, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [acciones, setAcciones] = useState([])

    useEffect(() => {
        const traerAcciones = async () => {
            const accionesTraidas = await accionesService.traerAcciones();
            setAcciones(accionesTraidas)
        }
        traerAcciones()
    }, [])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = async (data) => {
        console.log("confirmacion: ", data)
        const object1 = {
            descripcion: ''
        }

        const object2 = {
            descripcion: ''
        }

        object1.descripcion = data.observaciones
        object2.descripcion = data.accion

        console.log("para endpoint desc op: ", object1)
        console.log("para endpoint acc elegida: ", object2)
        handleShow();

        const response1 = await axios.post("http://localhost:4000/api/descripcion-operador", object1);
        const response2 = await axios.post("http://localhost:4000/api/accion-requerida", object2);

        console.log("rta 1: ", response1)
        console.log("rta 2: ", response2)
    }
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ width: '92%' }}>
                    <div className='row'>
                        <div className="col s12">
                            <p style={{ fontWeight: 'bold', fontSize: '32px', textAlign: 'center' }}>CONFIRMAR</p>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>Descripcion</Form.Label>
                                    <Controller
                                        name="observaciones"
                                        control={control}
                                        rules={{ required: 'Este campo es requerido' }}
                                        render={({ field }) => (
                                            <Form.Control
                                                as='textarea'
                                                placeholder="Ingresá descripcion"
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.observaciones && <p>{errors.observaciones.message}</p>}
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                    <Form.Label>Acción a realizar</Form.Label>
                                    <Controller
                                        name="accion"
                                        control={control}
                                        rules={{ required: 'Este campo es requerido' }}
                                        render={({ field }) => (
                                            <Form.Select aria-label="select-objetivo-crear-plan" {...field}>
                                                <option value=''>Sin Elegir</option>
                                                {acciones.map((e, index) => (
                                                    <option key={index + 1} value={e}>{e}</option>
                                                ))}
                                            </Form.Select>
                                        )}
                                    />
                                    {errors.accion && <p>{errors.accion.message}</p>}
                                </Form.Group>

                                <Nav style={{ backgroundColor: '#F2F2F2', borderRadius: '12px', marginTop: '8px' }} className="justify-content-end">
                                    {/* <Button style={{ margin: '8px', backgroundColor: 'grey', border: 'none' }}>
                                        Cancelar
                                    </Button> */}
                                    <Button style={{ margin: '8px', backgroundColor: 'blue', border: 'none' }} onClick={handleSubmit(onSubmit)}>
                                        Confirmar
                                    </Button>
                                </Nav>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>


            <ModalFinal
                show={show}
                handleClose={handleClose}
            />
        </>


    )
}

export { Confirmacion }
