import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Validaciones = ({ llamadaTraida }) => {
    const { register, handleSubmit, setValue, reset } = useForm();
    const [opcionElegida, setOpcionElegida] = useState('');
    const [indiceValidacion, setIndiceValidacion] = useState(0);
    const [paraConfirmar, setParaConfirmar] = useState(false);
    const [validacionDTOS, setValidacionDTOS] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        setValidacionDTOS(llamadaTraida.subOpcionDTOS[0].validacionDTOS)
    }, [])

    useEffect(() => { console.log("dtos de validacion: ", validacionDTOS) }, [validacionDTOS])

    useEffect(() => {
        setValue('descripcion', opcionElegida)
    }, [opcionElegida])

    const onSubmit = async (data) => {

        // Manejar la lógica del envío del formulario aquí
        delete data.opcion1;
        delete data.opcion2;
        delete data.opcion3;

        const response = await axios.post("http://localhost:4000/api/validacion", data)
        if (response.data === false) {
            navigate("/errorValidacion")
        }

        console.log('Datos del formulario:', data);
        // Incrementar el índice para pasar a la siguiente validación
        setIndiceValidacion((prevIndice) => prevIndice + 1);
        setOpcionElegida('');
        reset()
        setValue('descripcion', '')
    };

    useEffect(() => {
        // Establecer las opciones de la validación actual
        const opciones = validacionDTOS[indiceValidacion]?.opcionValidacionDTOS || [];
        opciones.forEach((opcion, index) => {
            setValue(`opcion${index + 1}`, opcion.descripcion);
        });

        console.log("Longitud de validacionDTOS:", validacionDTOS.length);
        console.log("Índice de validación:", indiceValidacion);


    }, [indiceValidacion]);

    useEffect(() => {
        if (indiceValidacion != 0) {
            if (indiceValidacion == validacionDTOS?.length) {
                setOpcionElegida(false)
                setParaConfirmar(true)
            }
        }
    }, [indiceValidacion])

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ width: '92%' }}>
                    <div className='row'>
                        <div className='col s12'>
                            {!paraConfirmar ? (
                                <>
                                    <p style={{ fontWeight: 'bold', fontSize: '32px' }}>
                                        Validacion
                                    </p>
                                </>
                            ) : (
                                <p style={{ fontWeight: 'bold', fontSize: '32px' }}>
                                    Ir a Confirmar
                                </p>
                            )}
                            {/* <p>{!paraConfirmar ? VALIDACION1 : IR A CONFIRMAR}</p> */}
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group controlId="radioGroup">
                                    {validacionDTOS[indiceValidacion]?.opcionValidacionDTOS?.map((opcion, index) => (
                                        <Form.Check
                                            key={index}
                                            type="radio"
                                            label={opcion.descripcion}
                                            name={`radioGroup${indiceValidacion}`}
                                            id={`opcion${index + 1}`}
                                            onChange={() => setOpcionElegida(opcion.descripcion)}
                                            defaultValue={false}
                                            checked={opcionElegida === opcion.descripcion}
                                        />
                                    ))}
                                </Form.Group>

                            </Form>

                            <br></br>
                            {!paraConfirmar && (
                                <Button onClick={handleSubmit(onSubmit)} disabled={!opcionElegida}>
                                    Enviar
                                </Button>
                            )}
                            {paraConfirmar && (
                                <Button onClick={() => navigate('/confirmacion')}>
                                    Confirmar
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export { Validaciones }