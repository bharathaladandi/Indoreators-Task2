import React,{useState, useEffect} from 'react'

export const HomePage = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/notes')
            .then(res => res.json())
            .then(data => setNotes(data));
    }, []);

    const addNote = (title, content) => {
        fetch('http://localhost:8080/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        })
            .then(() => fetch('/notes'))
            .then(res => res.json())
            .then(data => setNotes(data));
    };

    const deleteNote = (id) => {
        fetch(`http://localhost:8080/notes/${id}`, {
            method: 'DELETE'
        })
            .then(() => fetch('/notes'))
            .then(res => res.json())
            .then(data => setNotes(data));
    };
    return (
        <div>
            <div className="App" style={{backgroundColor:'teal', height:'100vh'}}>
                <h1 style={{color:'white'}}>Notes</h1>
                <ul>
                    {notes.map(note => (
                        <li key={note.id}>
                            <h2>{note.title}</h2>
                            <p>{note.content}</p>
                            <button onClick={() => deleteNote(note.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    addNote(e.target.title.value, e.target.content.value);
                }}>
                    <label style={{color:'white', margin:'5px', padding:'10px', fontSize:'35px'}}>
                        Title:
                        <input style={{height:'30px', margin:'15px', height:'45px'}} type="text" name="title" required />
                    </label>
                    <label style={{color:'white', margin:'10px', fontSize:'35px'}}>
                        Content:
                        <input style={{padding:'20px', marginTop:'30px', height:'5px'}} name="content" required />
                    </label>
                    <button style={{height:'40px', borderRadius:'5px', cursor:'pointer', width:'10%', backgroundColor:'#feb2b2'}} type="submit">Add</button>
                </form>
            </div>
        </div>
    )
}
