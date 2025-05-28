import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { postProveedor, putProveedor } from '@/utils/api';

const styles = require('../../styles/components/ProveedorForm.module.css')

function ProveedorForm({ formType = 'create', proveedor = null, onClose = () => {}, onUpdate = () => {} }) {
    const [formData, setFormData] = useState({
        id: proveedor ? proveedor.id : null,
        nombre: proveedor ? proveedor.nombre : '',
        contacto: proveedor ? proveedor.contacto : ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        switch (formType) {
            case 'create':
                console.log('Crear proveedor:', formData);
                postProveedor(localStorage.getItem('token'), formData).then((res) => {
                    console.log('Proveedor creado:', res);
                    onUpdate(); onClose();
                }).catch((error) => {
                    console.error('Error al crear proveedor:', error);
                });
                break;
            case 'edit':
                console.log('Editar proveedor:', formData);
                if (!proveedor || !proveedor.id) {
                    console.error('Proveedor no válido para edición');
                    return;
                }

                if (proveedor.nombre === formData.nombre && proveedor.contacto === formData.contacto) {
                    console.log('No hay cambios para guardar');
                    onClose();
                    return;
                }
                
                if (!formData.nombre || !formData.contacto) {
                    console.error('Los campos nombre y contacto son obligatorios');
                    return;
                }

                putProveedor(localStorage.getItem('token'), proveedor.id, formData).then((res) => {
                    console.log('Proveedor actualizado:', res);
                    onUpdate(); onClose();
                }).catch((error) => {
                    console.error('Error al actualizar proveedor:', error);
                });
                break;
            default:
                console.error('Tipo de formulario no reconocido');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div className={styles.form__title}>
                    <span>{ formType == "create" ? "Crear nuevo proveedor" : formType == "edit" ? "Editar proveedor" : null }</span>

                    <div className={styles.form__exit}>
                        <FontAwesomeIcon icon={faX} className={styles.form__exit_icon} onClick={ onClose } />
                    </div>
                </div>

                <div className={styles.form__content}>
                    <label htmlFor="name">Nombre</label> <br />
                    <input type="text" id="name" name="name" placeholder="Nombre del proveedor" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required /> <br />

                    <label htmlFor="contact">Contacto</label> <br />
                    <input type="text" id="contact" name="contact" placeholder="Nombre del contacto" value={formData.contacto} onChange={(e) => setFormData({ ...formData, contacto: e.target.value })} required /> <br />

                    <button type="submit" className={styles.form__submit} onClick={ handleSubmit}>
                        { formType == "create" ? "Crear proveedor" : formType == "edit" ? "Guardar cambios" : null }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProveedorForm;