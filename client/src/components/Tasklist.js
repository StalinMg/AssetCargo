import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function TaskList() {
    const [task, setTask] = useState([]);
    const navigate=useNavigate();

    const loadTasks = async () => {
        const response = await fetch('http://localhost:4000/task')
        const data = await response.json()
        setTask(data)
    };

    const handleDelete = async(id)=>{
       const res= await fetch(`http://localhost:4000/task/${id}`,{
            method: "DELETE",
        })
       setTask(task.filter(task=> task.id !== id))
    }

    useEffect(() => {
        loadTasks()
    }, []);
    return (
        <>
            <h1>Lista de Cargos</h1>
            {
                task.map((task) => (
                    <Card style={{
                        marginBottom: "7.rem0",
                        backgroundColor:'#1e2712'
                    }}
                    key={task.id}
                    >
                        <CardContent style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}>
                            <div style={{color:"white"}}>
                            <Typography>{task.tipocargo}</Typography>
                            <Typography>{task.descripcioncargo}</Typography>
                            </div>
                            <div>
                            <Button variant="contained" color="inherit" 
                            onClick={()=> navigate(`/task/${task.id}/edit`)}>
                                Editar
                            </Button>
                            <Button variant="contained" color="warning" 
                            onClick={()=> handleDelete(task.id)}>
                                Eliminar
                            </Button>
                            </div>
                        </CardContent>
                    </Card>

                ))
            }
        </>
    )
}