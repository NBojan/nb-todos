import { FaEdit, FaTrash } from 'react-icons/fa'

const List = ({list, handleDelete, handleEdit, editId}) => {
    return (  
        <ul className="no-style grocery-list mb-12">
            {list.map(item => {
                const {id, title} = item;
                return (
                    <li className={`d-flex space-between align-center grocery-item ${editId === id ? `editFoc` : null}`} key={id}>
                        <h4 className="capitalize">{title}</h4>
                        <div className="btn-container d-flex">
                            <button type="button" className="edit-btn mr-12" onClick={() => handleEdit(id)}><FaEdit /></button>
                            <button type="button" className="del-btn" onClick={() => handleDelete(id)}><FaTrash /></button>
                        </div>
                    </li>
                )
            })}
        </ul>
    );
}
 
export default List;