import { deleteProveedor, fetchProveedores, postProveedor, putProveedor } from "@/utils/api";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const dataConfig = {
    proveedores: {
        tabName: 'Proveedores',
        fetchData: fetchProveedores,
        deleteItem: deleteProveedor,
        newItemButtonText: 'NUEVO PROVEEDOR',
        tableHeaders: ['#', 'Nombre', 'Contacto', 'Acciones'],
        renderRow: (item, index, styles, handleItemEdit, handleItemDelete) => (
            <>
                <td>{index + 1}</td>
                <td>{item.nombre}</td>
                <td>{item.contacto}</td>
                <td className={styles.item__actions}>
                    <FontAwesomeIcon icon={faPencil} className={styles.item__action} onClick={() => handleItemEdit(item)} />
                    <FontAwesomeIcon icon={faTrash} className={styles.item__action} id={item.id} onClick={() => handleItemDelete(item.id)} />
                </td>
            </>
        ),
        confirmDeleteMessage: '¿Estás seguro de que deseas eliminar este proveedor?',
        formConfig: {
            titleCreate: 'Crear nuevo proveedor',
            titleEdit: 'Editar proveedor',
            submitButtonTextCreate: 'Crear proveedor',
            submitButtonTextEdit: 'Guardar cambios',
            initialData: { nombre: '', contacto: '' },
            apiPost: postProveedor,
            apiPut: putProveedor,
            fields: [
                { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Nombre del proveedor', required: true },
                { name: 'contacto', label: 'Contacto', type: 'text', placeholder: 'Nombre del contacto', required: true },
            ],
            hasChanges: (currentItem, newFormData) => 
                currentItem.nombre !== newFormData.nombre || currentItem.contacto !== newFormData.contacto
        }
    }
}