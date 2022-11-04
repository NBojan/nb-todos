import { useEffect, useState } from 'react';
import Alert from './Alert';
import List from './List';

const localTodos = localStorage.todoList ? JSON.parse(localStorage.todoList) : [];

function App() {
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({state: false, type:"", msg: ""});
  const [list, setList] = useState(localTodos);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name){
      buildAlert(true, "danger", "Insert a value");
    } else if(editing){
      setList(list.map(item => {
        if(item.id === editId){
          return {...item, title: name};
        }
        return item;
      }));
      setEditId(null);
      setEditing(false);
      setName("");
      buildAlert(true, "success", "Todo edited successfully");
    }
    else {
      let newItem = {id: new Date().getTime().toString(), title: name};
      setList([...list, newItem]);
      buildAlert(true, "success", "Todo added successfully");
      setName("");
    }
  }

  const buildAlert = (state = false, type = "", msg = "") => {
    setAlert({state, type, msg});
  }
  const handleDelete = (id) => {
    let tmpArray = list.filter(item => item.id !== id);
    setList(tmpArray);
    buildAlert(true, "danger", "Todo removed");
    if(editing){
      setEditing(false);
      setEditId(null);
      setName("");
    }
  }
  const handleEdit = (id) => {
    let specItem = list.find(item => item.id === id);
    setEditing(true);
    setEditId(id);
    setName(specItem.title);
  }
  const clearList = () => {
    setList([]);
    buildAlert(true, "success", "List cleared");
  }

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list])

  return (
    <section className="containerBoot m-auto">
      <div className="bud-container">
        {alert.state && <Alert alert={alert} buildAlert={buildAlert} />}

        <h3 className="ta-center mb-20 main-title">Todo's</h3>
        <form className="bud-form d-flex mb-20" onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="task.."/>
          <button type="submit">{editing ? "Edit" : "Submit"}</button>
        </form>

        {list.length > 0 && <div className="grocery-list-container">
          <List list={list} handleDelete={handleDelete} handleEdit={handleEdit} editId={editId}/>
          <div className="d-flex justify-center">
            <button className="clear-btn" onClick={clearList}>Clear Todo's</button>
          </div>
        </div>}

      </div>
    </section>
  );
}

export default App;
