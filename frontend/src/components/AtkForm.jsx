import React, { useState, useEffect } from "react";
import { createAtk, updateAtk } from "../services/api";
import "./AtkForm.css";

function AtkForm({ editingAtk, onSuccess, onCancel, onError }) {
    const [formData, setFormData] = useState({
        nama: "",
        jenis: "",
        qty: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update form ketika editingAtk berubah
    useEffect(() => {
        if (editingAtk) {
            setFormData({
                nama: editingAtk.nama,
                jenis: editingAtk.jenis,
                qty: editingAtk.qty.toString(),
            });
        } else {
            resetForm();
        }
    }, [editingAtk]);

    const resetForm = () => {
        setFormData({
            nama: "",
            jenis: "",
            qty: "",
        });
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nama.trim()) {
            newErrors.nama = "Nama tidak boleh kosong";
        }

        if (!formData.jenis.trim()) {
            newErrors.jenis = "Jenis tidak boleh kosong";
        }

        if (!formData.qty) {
            newErrors.qty = "Quantity tidak boleh kosong";
        } else if (isNaN(formData.qty) || parseInt(formData.qty) <= 0) {
            newErrors.qty = "Quantity harus angka lebih dari 0";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error saat user mulai mengetik
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const atkData = {
                nama: formData.nama.trim(),
                jenis: formData.jenis.trim(),
                qty: parseInt(formData.qty),
            };

            if (editingAtk) {
                await updateAtk(editingAtk.id, atkData);
            } else {
                await createAtk(atkData);
            }

            resetForm();
            onSuccess();
        } catch (err) {
            onError(err.message || "Terjadi kesalahan saat menyimpan data");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancelEdit = () => {
        resetForm();
        onCancel();
    };

    return (
        <div className="atk-form">
            <h2>{editingAtk ? "Edit Data ATK" : "Tambah Data ATK"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nama">Nama Barang *</label>
                    <input
                        type="text"
                        id="nama"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        placeholder="Contoh: Pulpen Gel Hitam"
                        className={errors.nama ? "error" : ""}
                    />
                    {errors.nama && (
                        <span className="error-message">{errors.nama}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="jenis">Jenis Barang *</label>
                    <input
                        type="text"
                        id="jenis"
                        name="jenis"
                        value={formData.jenis}
                        onChange={handleChange}
                        placeholder="Contoh: Alat Tulis"
                        className={errors.jenis ? "error" : ""}
                    />
                    {errors.jenis && (
                        <span className="error-message">{errors.jenis}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="qty">Quantity *</label>
                    <input
                        type="number"
                        id="qty"
                        name="qty"
                        value={formData.qty}
                        onChange={handleChange}
                        placeholder="Contoh: 12"
                        min="1"
                        className={errors.qty ? "error" : ""}
                    />
                    {errors.qty && (
                        <span className="error-message">{errors.qty}</span>
                    )}
                </div>

                <div className="form-actions">
                    {editingAtk ? (
                        <>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? "Menyimpan..."
                                    : "Simpan Perubahan"}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleCancelEdit}
                                disabled={isSubmitting}
                            >
                                Batal
                            </button>
                        </>
                    ) : (
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Menambah..." : "Tambah Data"}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default AtkForm;
