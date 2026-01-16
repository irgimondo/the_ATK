import sqlite3
from typing import List, Optional
from schemas import ATKCreate, ATKUpdate, ATKResponse

DATABASE_NAME = "atk_database.db"


def get_connection():
    """Get database connection"""
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Initialize database and create table if not exists"""
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS atk (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nama TEXT NOT NULL,
            jenis TEXT NOT NULL,
            qty INTEGER NOT NULL CHECK(qty > 0)
        )
    ''')
    
    conn.commit()
    conn.close()


def get_all_atk() -> List[ATKResponse]:
    """Get all ATK items"""
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT id, nama, jenis, qty FROM atk ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    
    return [ATKResponse(id=row['id'], nama=row['nama'], jenis=row['jenis'], qty=row['qty']) 
            for row in rows]


def get_atk_by_id(atk_id: int) -> Optional[ATKResponse]:
    """Get ATK item by ID"""
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT id, nama, jenis, qty FROM atk WHERE id = ?", (atk_id,))
    row = cursor.fetchone()
    conn.close()
    
    if row:
        return ATKResponse(id=row['id'], nama=row['nama'], jenis=row['jenis'], qty=row['qty'])
    return None


def create_atk(atk: ATKCreate) -> ATKResponse:
    """Create new ATK item"""
    conn = get_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute(
            "INSERT INTO atk (nama, jenis, qty) VALUES (?, ?, ?)",
            (atk.nama, atk.jenis, atk.qty)
        )
        conn.commit()
        atk_id = cursor.lastrowid
        conn.close()
        
        return ATKResponse(id=atk_id, nama=atk.nama, jenis=atk.jenis, qty=atk.qty)
    except sqlite3.IntegrityError as e:
        conn.close()
        raise ValueError(f"Error creating ATK item: {str(e)}")


def update_atk(atk_id: int, atk: ATKUpdate) -> Optional[ATKResponse]:
    """Update ATK item"""
    conn = get_connection()
    cursor = conn.cursor()
    
    # Check if item exists
    cursor.execute("SELECT id FROM atk WHERE id = ?", (atk_id,))
    if not cursor.fetchone():
        conn.close()
        return None
    
    try:
        cursor.execute(
            "UPDATE atk SET nama = ?, jenis = ?, qty = ? WHERE id = ?",
            (atk.nama, atk.jenis, atk.qty, atk_id)
        )
        conn.commit()
        conn.close()
        
        return ATKResponse(id=atk_id, nama=atk.nama, jenis=atk.jenis, qty=atk.qty)
    except sqlite3.IntegrityError as e:
        conn.close()
        raise ValueError(f"Error updating ATK item: {str(e)}")


def delete_atk(atk_id: int) -> bool:
    """Delete ATK item"""
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("DELETE FROM atk WHERE id = ?", (atk_id,))
    deleted = cursor.rowcount > 0
    conn.commit()
    conn.close()
    
    return deleted
