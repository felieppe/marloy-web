import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const styles = require('../../styles/components/GenericForm.module.css');

function GenericForm({ formType, item, onClose, onUpdate, formConfig }) {
    const { titleCreate, titleEdit, submitButtonTextCreate, submitButtonTextEdit, initialData, apiPost, apiPut, fields, hasChanges } = formConfig;
    const [formData, setFormData] = useState(initialData || {});

    useEffect(() => {
        if (formType === 'edit' && item) {
            setFormData({ ...item });
        } else {
            setFormData(initialData || {});
        }
    }, [ formType, item, initialData ]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || cookies.get('token');

        for (const field of fields) {
            if (field.required && !formData[field.name]) {
                alert(`El campo "${field.label}" es obligatorio.`);
                return;
            }
        }

        try {
            if (formType === 'create') {
                await apiPost(token, formData);
                console.log('Item created:', formData);
            } else if (formType === 'edit') {
                if (!item || (!item.id && !item.ci)) {
                    console.error('Item no válido para edición');
                    return;
                }

                if (!hasChanges(item, formData)) {
                    console.log('No hay cambios para guardar');
                    onClose();
                    return;
                }
                
                await apiPut(token, item.id || item.ci, formData);
                console.log('Item updated:', formData);
            }
            onUpdate();
            onClose();
        } catch (error) {
            console.error(`Error al guardar el item:`, error);
            alert(`Error al guardar el item. Por favor, inténtalo de nuevo más tarde.`);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div className={styles.form__title}>
                    <span>{formType === "create" ? titleCreate : titleEdit}</span>
                    <div className={styles.form__exit}>
                        <FontAwesomeIcon icon={faX} className={styles.form__exit_icon} onClick={onClose} />
                    </div>
                </div>

                <div className={styles.form__content}>
                    <form onSubmit={handleSubmit}>
                        {fields.map((field) => (
                            <div key={field.name} className={styles.formGroup}>
                                <label htmlFor={field.name}>{field.label}</label>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        id={field.name}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        required={field.required}
                                    />
                                ) : (
                                    <input
                                        type={field.type}
                                        id={field.name}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        value={formData[field.name] || (field.type === 'number' ? 0 : '')}
                                        onChange={handleChange}
                                        required={field.required}
                                    />
                                )}
                            </div>
                        ))}

                        <button type="submit" className={styles.form__submit}>
                            {formType === "create" ? submitButtonTextCreate : submitButtonTextEdit}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default GenericForm;