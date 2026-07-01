import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Transparencia from './pages/Transparencia'
import Admin from './pages/Admin'

export default function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
                <Route path="/transparencia" element={<Transparencia />} />
            </Routes>
            <Routes>
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Layout>
    )
}
