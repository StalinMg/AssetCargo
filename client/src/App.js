import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TaskForm from './components/Taskform'
import TaskList from './components/Tasklist'
import Menu from './components/Navbar'
import { Container } from '@mui/material'

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Menu />
        <Container>
          <Routes>
            <Route path='/' element={<TaskList />} />
            <Route path='/task/new' element={<TaskForm />} />
            <Route path='/task/:id/edit' element={<TaskForm />} />

          </Routes>
        </Container>


      </BrowserRouter>
    </div>
  )
}