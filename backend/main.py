from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import database
from schemas import ATKCreate, ATKUpdate, ATKResponse

app = FastAPI(title="ATK Management API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
database.init_db()


@app.get("/")
def read_root():
    return {"message": "ATK Management API"}


@app.get("/api/atk", response_model=List[ATKResponse])
def get_all_atk():
    """Get all ATK items"""
    return database.get_all_atk()


@app.get("/api/atk/{atk_id}", response_model=ATKResponse)
def get_atk_by_id(atk_id: int):
    """Get ATK item by ID"""
    atk = database.get_atk_by_id(atk_id)
    if not atk:
        raise HTTPException(status_code=404, detail={"error": "Item ATK tidak ditemukan"})
    return atk


@app.post("/api/atk", response_model=ATKResponse, status_code=201)
def create_atk(atk: ATKCreate):
    """Create new ATK item"""
    try:
        return database.create_atk(atk)
    except ValueError as e:
        raise HTTPException(status_code=400, detail={"error": str(e)})


@app.put("/api/atk/{atk_id}", response_model=ATKResponse)
def update_atk(atk_id: int, atk: ATKUpdate):
    """Update ATK item"""
    try:
        updated_atk = database.update_atk(atk_id, atk)
        if not updated_atk:
            raise HTTPException(status_code=404, detail={"error": "Item ATK tidak ditemukan"})
        return updated_atk
    except ValueError as e:
        raise HTTPException(status_code=400, detail={"error": str(e)})


@app.delete("/api/atk/{atk_id}")
def delete_atk(atk_id: int):
    """Delete ATK item"""
    success = database.delete_atk(atk_id)
    if not success:
        raise HTTPException(status_code=404, detail={"error": "Item ATK tidak ditemukan"})
    return {"message": "Item ATK berhasil dihapus"}
