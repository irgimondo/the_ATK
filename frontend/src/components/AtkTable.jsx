import React from "react";
import "./AtkTable.css";

function AtkTable({ atkList, onEdit, onDelete }) {
    return (
        <div className="atk-table-container">
            <h2>Daftar Stok ATK</h2>

            {atkList.length === 0 ? (
                <div className="empty-state">
                    <p>Belum ada data ATK</p>
                    <p className="empty-subtitle">
                        Tambahkan data ATK pertama Anda menggunakan form di
                        samping
                    </p>
                </div>
            ) : (
                <div className="table-wrapper">
                    <table className="atk-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nama Barang</th>
                                <th>Jenis</th>
                                <th>Quantity</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {atkList.map((atk) => (
                                <tr key={atk.id}>
                                    <td data-label="ID">{atk.id}</td>
                                    <td data-label="Nama Barang">{atk.nama}</td>
                                    <td data-label="Jenis">{atk.jenis}</td>
                                    <td data-label="Quantity">
                                        <span className="qty-badge">
                                            {atk.qty}
                                        </span>
                                    </td>
                                    <td data-label="Aksi">
                                        <div className="action-buttons">
                                            <button
                                                className="btn-edit"
                                                onClick={() => onEdit(atk)}
                                                title="Edit"
                                            >
                                                Ubah
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => onDelete(atk.id)}
                                                title="Hapus"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {atkList.length > 0 && (
                <div className="table-footer">
                    Total: <strong>{atkList.length}</strong> item
                </div>
            )}
        </div>
    );
}

export default AtkTable;
