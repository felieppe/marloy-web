import { deleteCliente, deleteInsumo, deleteMantenimiento, deleteMaquina, deleteProveedor, deleteTecnico, deleteUsuario, fetchClientes, fetchClientesMasMaquinas, fetchFacturacionMensual, fetchInsumos, fetchInsumosMasConsumidos, fetchMantenimientos, fetchMaquinas, fetchProveedores, fetchRegistroConsumos, fetchTecnicos, fetchTecnicosMasMantenimientos, fetchUsuarios, postCliente, postInsumo, postMantenimiento, postMaquina, postProveedor, postTecnico, postUsuario, putCliente, putInsumo, putMantenimiento, putMaquina, putProveedor, putTecnico, putUsuario } from "@/utils/api";
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
    },
    maquinas: {
        tabName: 'Maquinas',
        fetchData: fetchMaquinas,
        deleteItem: deleteMaquina,
        newItemButtonText: 'NUEVA MAQUINA',
        tableHeaders: ['#', 'Modelo', 'ID Cliente', 'Ubicación del Cliente', 'Costo Alquiler Mensual', 'Acciones'],
        renderRow: (item, index, styles, handleItemEdit, handleItemDelete) => (
            <>
                <td>{index + 1}</td>
                <td>{item.modelo}</td>
                <td>{item.id_cliente}</td>
                <td>{item.ubicacion_cliente}</td>
                <td>{item.costo_alquiler_mensual}</td>
                <td className={styles.item__actions}>
                    <FontAwesomeIcon icon={faPencil} className={styles.item__action} onClick={() => handleItemEdit(item)} />
                    <FontAwesomeIcon icon={faTrash} className={styles.item__action} id={item.id} onClick={() => handleItemDelete(item.id)} />
                </td>
            </>
        ),
        confirmDeleteMessage: '¿Estás seguro de que deseas eliminar esta máquina?',
        formConfig: {
            titleCreate: 'Crear nueva máquina',
            titleEdit: 'Editar máquina',
            submitButtonTextCreate: 'Crear máquina',
            submitButtonTextEdit: 'Guardar cambios',
            initialData: { modelo: '', id_cliente: '', ubicacion_cliente: '', costo_alquiler_mensual: '' },
            apiPost: postMaquina,
            apiPut: putMaquina,
            fields: [
                { name: 'modelo', label: 'Modelo', type: 'text', placeholder: 'Modelo de la máquina', required: true },
                { name: 'id_cliente', label: 'ID Cliente', type: 'select', optionsApiUrl: '/api/clientes', required: true },
                { name: 'ubicacion_cliente', label: 'Ubicación del Cliente', type: 'text', placeholder: 'Ubicación del cliente', required: true },
                { name: 'costo_alquiler_mensual', label: 'Costo Alquiler Mensual', type: 'number', placeholder: 'Costo de alquiler mensual de la máquina', required: true },
            ],
            hasChanges: (currentItem, newFormData) => 
                currentItem.modelo !== newFormData.modelo ||
                currentItem.id_cliente !== newFormData.id_cliente ||
                currentItem.ubicacion_cliente !== newFormData.ubicacion_cliente ||
                currentItem.costo_alquiler_mensual !== newFormData.costo_alquiler_mensual
        }
    },
    tecnicos: {
        tabName: 'Técnicos',
        fetchData: fetchTecnicos,
        deleteItem: deleteTecnico,
        newItemButtonText: 'NUEVO TÉCNICO',
        tableHeaders: ['#', 'CI', 'Nombre', 'Apellido', 'Teléfono', 'Acciones'],
        renderRow: (item, index, styles, handleItemEdit, handleItemDelete) => (
            <>
                <td>{index + 1}</td>
                <td>{item.ci}</td>
                <td>{item.nombre}</td>
                <td>{item.apellido}</td>
                <td>{item.telefono}</td>
                <td className={styles.item__actions}>
                    <FontAwesomeIcon icon={faPencil} className={styles.item__action} onClick={() => handleItemEdit(item)} />
                    <FontAwesomeIcon icon={faTrash} className={styles.item__action} id={item.id} onClick={() => handleItemDelete(item.ci)} />
                </td>
            </>
        ),
        confirmDeleteMessage: '¿Estás seguro de que deseas eliminar este técnico?',
        formConfig: {
            titleCreate: 'Crear nuevo técnico',
            titleEdit: 'Editar técnico',
            submitButtonTextCreate: 'Crear técnico',
            submitButtonTextEdit: 'Guardar cambios',
            initialData: { ci: '', nombre: '', apellido: '', telefono: '' },
            apiPost: postTecnico,
            apiPut: putTecnico,
            fields: [
                { name: 'ci', label: 'CI', type: 'text', placeholder: 'Cédula de Identidad del técnico', required: true },
                { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Nombre del técnico', required: true },
                { name: 'apellido', label: 'Apellido', type: 'text', placeholder: 'Apellido del técnico', required: true },
                { name: 'telefono', label: 'Teléfono', type: 'text', placeholder: 'Teléfono del técnico', required: true },
            ],
            hasChanges: (currentItem, newFormData) => 
                currentItem.ci !== newFormData.ci ||
                currentItem.nombre !== newFormData.nombre ||
                currentItem.apellido !== newFormData.apellido ||
                currentItem.telefono !== newFormData.telefono
        }
    },
    mantenimientos: {
        tabName: 'Mantenimientos',
        fetchData: fetchMantenimientos,
        deleteItem: deleteMantenimiento,
        newItemButtonText: 'NUEVO MANTENIMIENTO',
        tableHeaders: ['#', 'ID Maquina', 'CI Tecnico', 'Tipo', 'Fecha', 'Observaciones', 'Acciones'],
        renderRow: (item, index, styles, handleItemEdit, handleItemDelete) => (
            <>
                <td>{index + 1}</td>
                <td>{item.id_maquina}</td>
                <td>{item.ci_tecnico}</td>
                <td>{item.tipo}</td>
                <td>{item.fecha}</td>
                <td>{item.observaciones}</td>
                <td className={styles.item__actions}>
                    <FontAwesomeIcon icon={faPencil} className={styles.item__action} onClick={() => handleItemEdit(item)} />
                    <FontAwesomeIcon icon={faTrash} className={styles.item__action} id={item.id} onClick={() => handleItemDelete(item.id)} />
                </td>
            </>
        ),
        confirmDeleteMessage: '¿Estás seguro de que deseas eliminar este mantenimiento?',
        formConfig: {
            titleCreate: 'Crear nuevo mantenimiento',
            titleEdit: 'Editar mantenimiento',
            submitButtonTextCreate: 'Crear mantenimiento',
            submitButtonTextEdit: 'Guardar cambios',
            initialData: { id_maquina: '', ci_tecnico: '', tipo: '', fecha: '', observaciones: '' },
            apiPost: postMantenimiento,
            apiPut: putMantenimiento,
            fields: [
                { name: 'id_maquina', label: 'ID Maquina', type: 'select', optionsApiUrl: '/api/maquinas', required: true },
                { name: 'ci_tecnico', label: 'CI Tecnico', type: 'select', optionsApiUrl: '/api/tecnicos', required: true },
                { name: 'tipo', label: 'Tipo de Mantenimiento', type: 'text', placeholder: 'Tipo de mantenimiento realizado', required: true },
                { name: 'fecha', label: 'Fecha', type: 'date', placeholder: 'Fecha del mantenimiento', required: true },
                { name: 'observaciones', label: 'Observaciones', type: 'textarea', placeholder: 'Observaciones del mantenimiento' },
            ],
            hasChanges: (currentItem, newFormData) =>
                currentItem.id_maquina !== newFormData.id_maquina ||
                currentItem.ci_tecnico !== newFormData.ci_tecnico ||
                currentItem.tipo !== newFormData.tipo ||
                currentItem.fecha !== newFormData.fecha ||
                currentItem.observaciones !== newFormData.observaciones
        }
    },
    consumos: {
        tabName: 'Registro de consumos',
        fetchData: fetchRegistroConsumos,
        deleteItem: null,
        newItemButtonText: null,
        tableHeaders: ['#', 'ID Maquina', 'ID Insumo', 'Fecha', 'Cantidad Usada'],
        renderRow: (item, index, styles, handleItemEdit, handleItemDelete) => (
            <>
                <td>{index + 1}</td>
                <td>{item.id_maquina}</td>
                <td>{item.id_insumo}</td>
                <td>{item.fecha}</td>
                <td>{item.cantidad_usada}</td>
            </>
        ),
        confirmDeleteMessage: null,
        formConfig: null
    },
    usuarios: {
        tabName: 'Usuarios',
        fetchData: fetchUsuarios,
        deleteItem: deleteUsuario,
        newItemButtonText: 'NUEVO USUARIO',
        tableHeaders: ['#', 'Correo electronico', 'Es Administrador?', 'Acciones'],
        renderRow: (item, index, styles, handleItemEdit, handleItemDelete) => (
            <>
                <td>{index + 1}</td>
                <td>{item.correo}</td>
                <td>{item.es_administrador ? "Si" : "No"}</td>
                <td className={styles.item__actions}>
                    <FontAwesomeIcon icon={faPencil} className={styles.item__action} onClick={() => handleItemEdit(item)} />
                    <FontAwesomeIcon icon={faTrash} className={styles.item__action} id={item.id} onClick={() => handleItemDelete(item.correo)} />
                </td>
            </>
        ),
        confirmDeleteMessage: '¿Estás seguro de que deseas eliminar este usuario?',
        formConfig: {
            titleCreate: 'Crear nuevo usuario',
            titleEdit: 'Editar usuario',
            submitButtonTextCreate: 'Crear usuario',
            submitButtonTextEdit: 'Guardar cambios',
            initialData: { correo: '', contraseña: '', es_administrador: false },
            apiPost: postUsuario,
            apiPut: putUsuario,
            fields: [
                { name: 'correo', label: 'Correo Electrónico', type: 'email', placeholder: 'Correo electrónico del usuario', required: true },
                { name: 'contraseña', label: 'Contraseña', type: 'password', placeholder: 'Contraseña del usuario', required: true },
                { name: 'es_administrador', label: 'Es Administrador?', type: 'checkbox', placeholder: '¿El usuario es administrador?' }
            ],
            editFields: [
                { name: 'correo', label: 'Correo Electrónico', type: 'email', placeholder: 'Correo electrónico del usuario', required: true, disabled: true, editable: false },
                { name: 'es_administrador', label: 'Es Administrador?', type: 'checkbox', placeholder: '¿El usuario es administrador?' }
            ],
            hasChanges: (currentItem, newFormData) =>
                currentItem.correo !== newFormData.correo ||
                currentItem.contraseña !== newFormData.contraseña ||
                currentItem.es_administrador !== newFormData.es_administrador
        }
    },
    reportes: [
        {
            tabName: 'Facturacion por cliente',
            fetchData: fetchFacturacionMensual,
            deleteItem: null,
            newItemButtonText: null,
            tableHeaders: ['#', 'ID Cliente', 'Nombre Cliente', 'Alquiler Total', 'Total Insumos', 'Total a Cobrar'],
            renderRow: (item, index, styles) => (
                <>
                    <td>{index + 1}</td>
                    <td>{item.cliente_id}</td>
                    <td>{item.nombre_cliente}</td>
                    <td>{item.total_alquiler}</td>
                    <td>{item.total_insumos}</td>
                    <td>{item.total_a_cobrar}</td>
                </>
            ),
            confirmDeleteMessage: null,
            formConfig: null
        },
        {
            tabName: 'Insumos más consumidos',
            fetchData: fetchInsumosMasConsumidos,
            deleteItem: null,
            newItemButtonText: null,
            tableHeaders: ['#', 'Descripción', 'Cantidad Total', 'Costo Total'],
            renderRow: (item, index, styles) => (
                <>
                    <td>{index + 1}</td>
                    <td>{item.insumo_descripcion}</td>
                    <td>{item.total_cantidad}</td>
                    <td>{item.total_costo}</td>
                </>
            ),
            confirmDeleteMessage: null,
            formConfig: null
        },
        {
            tabName: 'Tecnicos con más mantenimientos',
            fetchData: fetchTecnicosMasMantenimientos,
            deleteItem: null,
            newItemButtonText: null,
            tableHeaders: ['#', 'Nombre Técnico', 'Mantenimientos Realizados'],
            renderRow: (item, index, styles) => (
                <>
                    <td>{index + 1}</td>
                    <td>{item.tecnico_nombre}</td>
                    <td>{item.mantenimientos_realizados}</td>
                </>
            ),
            confirmDeleteMessage: null,
            formConfig: null
        },
        {
            tabName: 'Clientes con más maquinas',
            fetchData: fetchClientesMasMaquinas,
            deleteItem: null,
            newItemButtonText: null,
            tableHeaders: ['#', 'Nombre Cliente', 'Total de maquinas'],
            renderRow: (item, index, styles) => (
                <>
                    <td>{index + 1}</td>
                    <td>{item.cliente_nombre}</td>
                    <td>{item.total_maquinas}</td>
                </>
            ),
            confirmDeleteMessage: null,
            formConfig: null
        }
    ]
}