# import sqlite3
import logging
import sqlite3
from typing import List, Tuple  # For type hints

# Get logger instance
logger = logging.getLogger(__name__)
DB_PATH = "C:/Users/SAMIKSHA AMBRALE/Desktop/RoadScan_4/backend/data/database.db"

# Initialize database with floating-point timestamp
def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("DROP TABLE IF EXISTS plates")

    # Create a new table with REAL type for timestamp (supports decimals)
    cursor.execute('''
        CREATE TABLE plates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            video_name TEXT,
            plate_number TEXT,
            timestamp REAL  -- REAL type supports floating-point values
        )
    ''')
    conn.commit()
    conn.close()

# Insert plate detection data with precise timestamps
def insert_plate(video_name, plate_number, timestamp):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO plates (video_name, plate_number, timestamp) VALUES (?, ?, ?)",
                   (video_name, plate_number, timestamp))
    conn.commit()
    conn.close()

# # Search plates by number (supports partial matches)
# def search_plate(plate_number):
#     conn = sqlite3.connect(DB_PATH)
#     cursor = conn.cursor()
#     cursor.execute("SELECT video_name, timestamp FROM plates WHERE plate_number LIKE ?", (f"%{plate_number}%",))
#     results = cursor.fetchall()
#     conn.close()
#     return results


def search_plate(plate_number: str) -> list[tuple[str, float]]:
    """
    Search for license plates with partial matching
    Args:
        plate_number: The plate number or partial number to search for
    Returns:
        List of tuples containing (video_name, timestamp) matches
    """
    if not plate_number.strip():
        return []  # Return empty list for empty search
    
    try:
        with sqlite3.connect(DB_PATH) as conn:
            conn.row_factory = sqlite3.Row  # Access columns by name
            cursor = conn.cursor()
            
            # Use parameterized query to prevent SQL injection
            cursor.execute(
                "SELECT video_name, timestamp FROM plates WHERE plate_number LIKE ? ORDER BY timestamp",
                (f"%{plate_number}%",)
            )
            
            return cursor.fetchall()
            
    except sqlite3.Error as e:
        logger.error(f"Database error during search: {str(e)}")
        raise  # Re-raise to handle in the API endpoint
    except Exception as e:
        logger.error(f"Unexpected search error: {str(e)}")
        raise

if __name__ == "__main__":
    init_db()  # Run this to create/reset the database
    print("✅ Database initialized successfully!")