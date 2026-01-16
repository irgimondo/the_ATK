import React, { useState, useEffect } from "react";
import AtkTable from "./components/AtkTable";
import AtkForm from "./components/AtkForm";
import { getAllAtk, deleteAtk } from "./services/api";
import "./App.css";

function App() {
    const [atkList, setAtkList] = useState([]);
    const [editingAtk, setEditingAtk] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load data saat komponen pertama kali dimuat
    useEffect(() => {
        fetchAtkData();
    }, []);

    const fetchAtkData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllAtk();
            setAtkList(data);
        } catch (err) {
            setError(
                "Gagal memuat data ATK. Pastikan backend sedang berjalan."
            );
            console.error("Error fetching ATK data:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (atk) => {
        setEditingAtk(atk);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
            try {
                await deleteAtk(id);
                fetchAtkData();
            } catch (err) {
                setError("Gagal menghapus data ATK");
                console.error("Error deleting ATK:", err);
            }
        }
    };

    const handleFormSuccess = () => {
        setEditingAtk(null);
        fetchAtkData();
    };

    const handleCancelEdit = () => {
        setEditingAtk(null);
    };

    return (
        <div className="app">
            <div className="container">
                <header className="header">
                    <h1>Manajemen Stok ATK</h1>
                    <p>Aplikasi untuk mengelola stok Alat Tulis Kantor</p>
                </header>

                {error && (
                    <div className="error-banner">
                        <span>{error}</span>
                        <button onClick={() => setError(null)}>×</button>
                    </div>
                )}

                <div className="content">
                    <div className="form-section">
                        <AtkForm
                            editingAtk={editingAtk}
                            onSuccess={handleFormSuccess}
                            onCancel={handleCancelEdit}
                            onError={setError}
                        />
                    </div>

                    <div className="table-section">
                        {loading ? (
                            <div className="loading">Memuat data...</div>
                        ) : (
                            <AtkTable
                                atkList={atkList}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
