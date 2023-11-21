import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Modal, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
const ModalFinal = ({ show, handleClose }) => {
    const navigate = useNavigate();
    const { handleSubmit, setValue } = useForm();

    const onSubmit = async (data) => {
        console.log("conf: ", data);
        const response = await axios.post("http://localhost:4000/api/confirmacion", data, { timeout: 20000 })
        if (response.data === false) {
            handleClose();
            navigate("/errorConfirmacion")
        } else {
            navigate("/exito")
        }
    };

    const handleCancel = () => {
        setValue('confirmacion', false);
        handleSubmit(onSubmit)();
    };

    const handleAccept = () => {
        setValue('confirmacion', true);
        handleSubmit(onSubmit)();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className='closeSesion-modal-header'>
                <Modal.Title className='closeSesion-modal-title'>Confirmar Datos</Modal.Title>
            </Modal.Header>

            {/* Body del modal, que simplemenmte sera un texto */}
            <div className='text-center'>
                <Card>
                    <Card.Body>¿Estás seguro de que querés confirmar los datos ingresados?</Card.Body>
                </Card>
            </div>

            {/* misma explicacion que el Footer del modal de Login */}
            <Modal.Footer>
                <Button style={{ backgroundColor: 'grey', border: 'none' }} onClick={handleCancel}>
                    Cancelar
                </Button>
                <Button style={{ backgroundColor: 'blue', border: 'none' }} onClick={handleAccept}>
                    Aceptar
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export { ModalFinal }
