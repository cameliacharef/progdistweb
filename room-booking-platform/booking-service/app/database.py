import os
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://bookinguser:bookingpass@localhost/bookingdb")
engine = create_engine(DATABASE_URL)