
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
import uvicorn

from app import models, schemas, crud, database
from app.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Booking Service API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "booking-service"}

# Routes avec préfixe /api
@app.post("/api/bookings/", response_model=schemas.Booking)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    existing_bookings = crud.get_bookings_by_room_and_time(
        db, 
        room_id=booking.room_id,
        start_time=booking.start_time,
        end_time=booking.end_time
    )
    if existing_bookings:
        raise HTTPException(status_code=400, detail="Room is already booked for this time slot")
    return crud.create_booking(db=db, booking=booking)

@app.get("/api/bookings/", response_model=List[schemas.Booking])
def read_bookings(
    skip: int = 0, 
    limit: int = 100,
    user_id: Optional[str] = None,
    room_id: Optional[str] = None,
    db: Session = Depends(get_db)
):
    if user_id:
        return crud.get_bookings_by_user(db, user_id=user_id, skip=skip, limit=limit)
    elif room_id:
        return crud.get_bookings_by_room(db, room_id=room_id, skip=skip, limit=limit)
    else:
        return crud.get_bookings(db, skip=skip, limit=limit)

@app.get("/api/bookings/{booking_id}", response_model=schemas.Booking)
def read_booking(booking_id: str, db: Session = Depends(get_db)):
    db_booking = crud.get_booking(db, booking_id=booking_id)
    if db_booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    return db_booking

@app.delete("/api/bookings/{booking_id}")
def delete_booking(booking_id: str, db: Session = Depends(get_db)):
    db_booking = crud.get_booking(db, booking_id=booking_id)
    if db_booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    current_time = datetime.now()
    if db_booking.start_time < current_time + timedelta(hours=1):
        raise HTTPException(status_code=400, detail="Cannot cancel booking less than 1 hour before start")
    crud.delete_booking(db, booking_id=booking_id)
    return {"message": "Booking cancelled successfully"}

@app.get("/api/bookings/room/{room_id}/availability")
def check_room_availability(
    room_id: str,
    start_time: datetime,
    end_time: datetime,
    db: Session = Depends(get_db)
):
    bookings = crud.get_bookings_by_room_and_time(db, room_id, start_time, end_time)
    is_available = len(bookings) == 0
    return {
        "room_id": room_id,
        "start_time": start_time,
        "end_time": end_time,
        "is_available": is_available,
        "conflicting_bookings": len(bookings)
    }

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)