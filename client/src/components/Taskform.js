import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";


export default function TaskForm() {

    const [task, setTask] = useState({
        tipocargo: "",
        descripcioncargo: "",
    });
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (editing) {
           const response = await fetch(`http://localhost:4000/task/${params.id}`, {
                method:"PUT",
                body: JSON.stringify(task),
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            console.log(data);

        } else {
            await fetch("http://localhost:4000/task", {
                method: 'POST',
                body: JSON.stringify(task),
                headers: { "Content-Type": "application/json" },
            });

        }

        setLoading(false);
        navigate("/");
    };
    const handleChange = e => {
        setTask({ ...task, [e.target.name]: e.target.value })
    };

    const loadTask = async (id) => {
        const res = await fetch(`http://localhost:4000/task/${id}`)
        const data = await res.json()
        setTask({ tipocargo: data.tipocargo, descripcioncargo: data.descripcioncargo })
        setEditing(true)
    };

    useEffect(() => {
        if (params.id) {
            loadTask(params.id);
        }
    }, [])

    return (
        <Grid container direction="column" alignItems="center" justifyContent="center" >
            <Grid item xs={3}>
                <Card sx={{ mt: 5 }} style={{
                    backgroundColor: "#12272e",
                    padding: "1rem"
                }}>
                    <Typography variant="5" textAlign='center' color='white'>
                        {editing ? "Editar Cargo":"Agregar Cargo"}
                        
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant='filled'
                                label='Cargo'
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0',
                                }}
                                name='tipocargo'
                                value={task.tipocargo}
                                onChange={handleChange}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <TextField
                                variant='filled'
                                label='Descripcion cargo'
                                multiline
                                rows={4}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0',
                                }}
                                value={task.descripcioncargo}
                                name='descripcioncargo'
                                onChange={handleChange}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <Button variant="contained" color="primary" type="submit" >
                                Salvar
                            </Button>


                        </form>
                    </CardContent>
                </Card>

            </Grid>

        </Grid>

    )
}