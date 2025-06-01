import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import GenericForm from './forms/genericForm';

const styles = require('../styles/components/DataList.module.css')

function DataList( { config }) {
    const [data, setData] = useState([]);
    const [formVisble, setFormVisble] = useState(false);
    const [formType, setFormType] = useState('create');
    const [formData, setFormData] = useState({});
    const [currentPage, setCurrentPage] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const [pageSize] = useState(10);

    const { tabName, fetchData, deleteItem, FormComponent, newItemButtonText, tableHeaders, renderRow, confirmDeleteMessage } = config;

    const handleItemEdit = (p) => { 
        setFormVisble(true);
        setFormType('edit');
        setFormData(p);
    }

    const handleItemNew = () => {
        setFormVisble(true);
        setFormType('create');
    }

    const handleItemDelete = (itemId) => {
        if (!window.confirm(confirmDeleteMessage)) return;
        
        deleteItem(localStorage.getItem('token') || cookies.get('token'), itemId).then(() => {
            setData(data.filter(item => (item.id || item.ci) !== itemId));
            if (currentPage > totalPages) { setCurrentPage(totalPages); }
        }).catch((error) => {
            console.error('Error al eliminar el item:', error);
            alert('Error al eliminar el item. Por favor, inténtalo de nuevo más tarde.');
        })
    }

    const handleItemClose = () => { 
        setFormVisble(false);
        setFormData({});
    }
    
    const handleItemUpdate = () => {
        fetchItems(localStorage.getItem('token') || cookies.get('token'), currentPage, pageSize);
    }

    const handlePageChange = (page) => {
        if (page == currentPage || page < 1 || page > totalPages) return;

        fetchItems(localStorage.getItem('token') || cookies.get('token'), page, pageSize);
    }

    const fetchItems = (token, page, size) => {
        return fetchData(token, page, size).then((res) => {
            setData(res.data.data);
            setCurrentPage(res.data.page);
            setTotalPages(res.data.total_pages);
        }).catch((error) => {
            console.error('Error fetching data:', error);
            alert('Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.');
        });
    }

    useEffect(() => {
        const token = localStorage.getItem('token') || cookies.get('token');
        if (!token) { window.location.href = '/login'; return; }

        if (token) { fetchItems(token, currentPage || 1, pageSize); }
    }, [fetchData])

    return (
        <>
            { newItemButtonText ? <button className={styles.items__add} onClick={ handleItemNew }>{ newItemButtonText }</button> : null }
            { formVisble ? <GenericForm formType={formType} onClose={ handleItemClose } onUpdate={ handleItemUpdate } item={ formData } formConfig={ config.formConfig }/> : null }

            <table className={styles.items}>
                <thead>
                    <tr>
                        { tableHeaders.map((header, index) => (
                            <th key={index}>{header}</th>
                        )) }
                    </tr>
                    { data.map((item, index) => (
                        <tr key={item.id || item.ci || index}>
                            { renderRow(item, index, styles, handleItemEdit, handleItemDelete) }
                        </tr>
                    )) }
                </thead>
            </table>

            { totalPages > 1 ? <div className={styles.pagination}>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={styles.pagination__button} >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={`${styles.pagination__button} ${currentPage === i + 1 ? styles.pagination__button_active : ''}`} >
                        {i + 1}
                    </button>
                ))}

                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={styles.pagination__button} >
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div> : null }
        </>
    )
}

export default DataList;