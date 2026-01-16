from pydantic import BaseModel, validator, Field
from typing import Optional


class ATKBase(BaseModel):
    nama: str = Field(..., min_length=1, description="Nama barang tidak boleh kosong")
    jenis: str = Field(..., min_length=1, description="Jenis barang tidak boleh kosong")
    qty: int = Field(..., gt=0, description="Quantity harus lebih dari 0")

    @validator('nama')
    def nama_not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Nama tidak boleh kosong')
        return v.strip()

    @validator('jenis')
    def jenis_not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Jenis tidak boleh kosong')
        return v.strip()

    @validator('qty')
    def qty_positive(cls, v):
        if v <= 0:
            raise ValueError('Quantity harus lebih dari 0')
        return v


class ATKCreate(ATKBase):
    pass


class ATKUpdate(ATKBase):
    pass


class ATKResponse(ATKBase):
    id: int

    class Config:
        from_attributes = True
