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
                    <h3>Add Note</h3>
                    <label style={{color:'white', margin:'5px'}}>
                        <h1>Title:</h1>
                        <input style={{height:'30px'}} type="text" name="title" required />
                    </label>
                    <label style={{color:'white', margin:'10px'}}>
                        <h1>Content:</h1>
                        <textarea name="content" required />
                    </label>
                    <button style={{height:'20px', width:'10%'}} type="submit">Add</button>
                </form>
            </div>
        </div>
    )
}
