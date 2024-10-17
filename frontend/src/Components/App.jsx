import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import List from './List/List';
import Country from './Country/Country';
import './global.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<List />} />
                <Route path="/country" element={<Country />} />
            </Routes>
        </Router>
    );
}

export default App;
