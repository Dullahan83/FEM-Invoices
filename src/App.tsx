import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Invoices from './Pages/Invoices'
import ViewInvoice from './Pages/ViewInvoice'

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Invoices />} />
                    <Route path="/view/:id" element={<ViewInvoice />} />
                    <Route path="*" element={<Invoices />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
