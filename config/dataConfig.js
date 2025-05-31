import { deleteCliente, deleteInsumo, deleteProveedor, fetchClientes, fetchInsumos, fetchProveedores, postCliente, postInsumo, postProveedor, putCliente, putInsumo, putProveedor } from "@/utils/api";
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
    },
    insumos: {
        tabName: 'Insumos',
        fetchData: fetchInsumos,
        deleteItem: deleteInsumo,
        newItemButtonText: 'NUEVO INSUMO',
        tableHeaders: ['#', 'Descripción', 'Tipo', 'Precio Unitario', 'ID Proveedor', 'Acciones'],
        renderRow: (item, index, styles, handleItemEdit, handleItemDelete) => (
            <>
                <td>{index + 1}</td>
                <td>{item.descripcion}</td>
                <td>{item.tipo}</td>
                <td>{item.precio_unitario}</td>
                <td>{item.id_proveedor}</td>
                <td className={styles.item__actions}>
                    <FontAwesomeIcon icon={faPencil} className={styles.item__action} onClick={() => handleItemEdit(item)} />
                    <FontAwesomeIcon icon={faTrash} className={styles.item__action} id={item.id} onClick={() => handleItemDelete(item.id)} />
                </td>
            </>
        ),
        confirmDeleteMessage: '¿Estás seguro de que deseas eliminar este insumo?',
        formConfig: {
            titleCreate: 'Crear nuevo insumo',
            titleEdit: 'Editar insumo',
            submitButtonTextCreate: 'Crear insumo',
            submitButtonTextEdit: 'Guardar cambios',
            initialData: { descripcion: '', tipo: '', precio_unitario: '', id_proveedor: '' },
            apiPost: postInsumo,
            apiPut: putInsumo,
            fields: [
                { name: 'descripcion', label: 'Descripción', type: 'text', placeholder: 'Descripción del insumo', required: true },
                { name: 'tipo', label: 'Tipo', type: 'text', placeholder: 'Tipo de insumo', required: true },
                { name: 'precio_unitario', label: 'Precio Unitario', type: 'number', placeholder: 'Precio unitario del insumo', required: true },
                { name: 'id_proveedor', label: 'Proveedor', type: 'select', optionsApiUrl: '/api/proveedores', required: true },
            ],
            hasChanges: (currentItem, newFormData) => 
                currentItem.descripcion !== newFormData.descripcion ||
                currentItem.tipo !== newFormData.tipo ||
                currentItem.precio_unitario !== newFormData.precio_unitario ||
                currentItem.id_proveedor !== newFormData.id_proveedor
        }
    },
    clientes: {
        tabName: 'Clientes',
        fetchData: fetchClientes,
        deleteItem: deleteCliente,
        newItemButtonText: 'NUEVO CLIENTE',
        tableHeaders: ['#', 'Nombre', 'Dirección', 'Teléfono', 'Correo Electronico', 'Acciones'],
        renderRow: (item, index, styles, handleItemEdit, handleItemDelete) => (
            <>
                <td>{index + 1}</td>
                <td>{item.nombre}</td>
                <td>{item.direccion}</td>
                <td>{item.telefono}</td>
                <td>{item.correo}</td>
                <td className={styles.item__actions}>
                    <FontAwesomeIcon icon={faPencil} className={styles.item__action} onClick={() => handleItemEdit(item)} />
                    <FontAwesomeIcon icon={faTrash} className={styles.item__action} id={item.id} onClick={() => handleItemDelete(item.id)} />
                </td>
            </>
        ),
        confirmDeleteMessage: '¿Estás seguro de que deseas eliminar este cliente?',
        formConfig: {
            titleCreate: 'Crear nuevo cliente',
            titleEdit: 'Editar cliente',
            submitButtonTextCreate: 'Crear cliente',
            submitButtonTextEdit: 'Guardar cambios',
            initialData: { nombre: '', direccion: '', telefono: '', correo: '' },
            apiPost: postCliente,
            apiPut: putCliente,
            fields: [
                { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Nombre del cliente', required: true },
                { name: 'direccion', label: 'Dirección', type: 'text', placeholder: 'Dirección del cliente', required: true },
                { name: 'telefono', label: 'Teléfono', type: 'text', placeholder: 'Teléfono del cliente', required: true },
                { name: 'correo', label: 'Correo Electrónico', type: 'email', placeholder: 'Correo electrónico del cliente', required: true },
            ],
            hasChanges: (currentItem, newFormData) => 
                currentItem.nombre !== newFormData.nombre ||
                currentItem.direccion !== newFormData.direccion ||
                currentItem.telefono !== newFormData.telefono ||
                currentItem.correo !== newFormData.correo
        }
    }
}