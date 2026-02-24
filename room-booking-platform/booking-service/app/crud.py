from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime
from typing import List

def create_booking(db: Session, booking: schemas.BookingCreate):
    db_booking = models.Booking(**booking.dict())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

def get_booking(db: Session, booking_id: str):
    return db.query(models.Booking).filter(models.Booking.id == booking_id).first()

def get_bookings(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Booking).offset(skip).limit(limit).all()

def get_bookings_by_user(db: Session, user_id: str, skip: int = 0, limit: int = 100):
    return db.query(models.Booking)\
        .filter(models.Booking.user_id == user_id)\
        .offset(skip)\
        .limit(limit)\
        .all()

def get_bookings_by_room(db: Session, room_id: str, skip: int = 0, limit: int = 100):
    return db.query(models.Booking)\
        .filter(models.Booking.room_id == room_id)\
        .offset(skip)\
        .limit(limit)\
        .all()

def get_bookings_by_room_and_time(db: Session, room_id: str, start_time: datetime, end_time: datetime):
    return db.query(models.Booking)\
        .filter(models.Booking.room_id == room_id)\
        .filter(
            (models.Booking.start_time < end_time) &
            (models.Booking.end_time > start_time) &
            (models.Booking.status == "confirmed")
        )\
        .all()

def delete_booking(db: Session, booking_id: str):
    db_booking = get_booking(db, booking_id)
    if db_booking:
        db_booking.status = "cancelled"
        db.commit()
        db.refresh(db_booking)
    return db_booking