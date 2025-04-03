# from fastapi import FastAPI, UploadFile, File, HTTPException
# import shutil
# import os
# import sqlite3
# from process_video import process_video
# from database import init_db, search_plate

# app = FastAPI()

# UPLOAD_DIR = "data"
# PROCESSED_DIR = "processed"
# MAX_FILE_SIZE_MB = 500  # Set max file size (adjust as needed)

# # Ensure necessary folders exist
# os.makedirs(UPLOAD_DIR, exist_ok=True)
# os.makedirs(PROCESSED_DIR, exist_ok=True)

# # Initialize database on startup
# init_db()

# @app.post("/upload/")
# async def upload_video(video: UploadFile = File(...)):
#     try:
#         file_location = os.path.join(UPLOAD_DIR, video.filename)

#         # Check file size (optional, prevents excessively large uploads)
#         video.file.seek(0, os.SEEK_END)
#         file_size = video.file.tell() / (1024 * 1024)  # Convert to MB
#         video.file.seek(0)  # Reset file pointer

#         if file_size > MAX_FILE_SIZE_MB:
#             raise HTTPException(status_code=413, detail="File too large")

#         # Save the uploaded file efficiently
#         with open(file_location, "wb") as buffer:
#             shutil.copyfileobj(video.file, buffer, length=16 * 1024 * 1024)  # 16MB chunks

#         # Process the video
#         success = process_video(video.filename)
#         if not success:
#             raise HTTPException(status_code=500, detail="Video processing failed.")

#         return {"message": "Processing completed!", "filename": video.filename}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

# @app.get("/search/{plate_number}")
# async def get_plate(plate_number: str):
#     try:
#         results = search_plate(plate_number)

#         if not results:
#             raise HTTPException(status_code=404, detail="No matching plates found.")

#         return {"plates": results}
    
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)



from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import sqlite3
from pathlib import Path
from process_video import process_video
from database import init_db, search_plate
from typing import Optional
import logging
from fastapi.staticfiles import StaticFiles  # <-- Add this import


# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Constants
UPLOAD_DIR = "data"
PROCESSED_DIR = "processed"
MAX_FILE_SIZE_MB = 500
ALLOWED_EXTENSIONS = {'.mp4', '.mov', '.avi', '.mkv'}

# Ensure necessary folders exist
Path(UPLOAD_DIR).mkdir(parents=True, exist_ok=True)
Path(PROCESSED_DIR).mkdir(parents=True, exist_ok=True)

# Initialize database on startup
init_db()

def validate_file_extension(filename: str) -> bool:
    return Path(filename).suffix.lower() in ALLOWED_EXTENSIONS

# @app.post("/upload/")
# async def upload_video(video: UploadFile = File(...)):
#     try:
#         # Validate file extension
#         if not validate_file_extension(video.filename):
#             raise HTTPException(
#                 status_code=400,
#                 detail=f"Unsupported file type. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
#             )

#         # Check file size
#         file_size = 0
#         chunk_size = 16 * 1024 * 1024  # 16MB chunks
#         file_location = os.path.join(UPLOAD_DIR, video.filename)

#         with open(file_location, "wb") as buffer:
#             while True:
#                 chunk = await video.read(chunk_size)
#                 if not chunk:
#                     break
#                 file_size += len(chunk)
#                 buffer.write(chunk)

#                 # Check size during streaming
#                 if (file_size / (1024 * 1024)) > MAX_FILE_SIZE_MB:
#                     buffer.close()
#                     os.remove(file_location)
#                     raise HTTPException(status_code=413, detail="File too large")

#         logger.info(f"Successfully saved: {video.filename} ({file_size/1024/1024:.2f} MB)")

#         # Process the video
#         success = process_video(video.filename)
#         if not success:
#             raise HTTPException(status_code=500, detail="Video processing failed")

#         return {
#             "message": "Processing completed!",
#             "filename": video.filename,
#             "size_mb": file_size / (1024 * 1024)
#         }

#     except HTTPException:
#         raise
#     except Exception as e:
#         logger.error(f"Upload failed: {str(e)}", exc_info=True)
#         raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")


# @app.post("/upload/")
# async def upload_video(video: UploadFile = File(...)):
#     try:
#         # Validate file extension
#         if not validate_file_extension(video.filename):
#             error_msg = f"Unsupported file type. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
#             logger.error(error_msg)
#             raise HTTPException(
#                 status_code=400,
#                 detail=error_msg  # Simple string message
#             )

#         # Check file size
#         file_size = 0
#         chunk_size = 16 * 1024 * 1024  # 16MB chunks
#         file_location = os.path.join(UPLOAD_DIR, video.filename)

#         with open(file_location, "wb") as buffer:
#             while True:
#                 chunk = await video.read(chunk_size)
#                 if not chunk:
#                     break
#                 file_size += len(chunk)
#                 buffer.write(chunk)

#                 # Check size during streaming
#                 if (file_size / (1024 * 1024)) > MAX_FILE_SIZE_MB:
#                     buffer.close()
#                     os.remove(file_location)
#                     error_msg = f"File exceeds maximum size of {MAX_FILE_SIZE_MB}MB"
#                     logger.error(error_msg)
#                     raise HTTPException(
#                         status_code=413,
#                         detail=error_msg  # Simple string message
#                     )

#         logger.info(f"Successfully saved: {video.filename} ({file_size/1024/1024:.2f} MB)")

#         # Process the video
#         success = process_video(video.filename)
#         if not success:
#             error_msg = "Video processing failed"
#             logger.error(error_msg)
#             raise HTTPException(
#                 status_code=500,
#                 detail=error_msg  # Simple string message
#             )

#         return {
#             "message": "Processing completed!",
#             "filename": video.filename,
#             "size_mb": file_size / (1024 * 1024)
#         }

#     except HTTPException as he:
#         # Re-raise HTTPException as is (it already contains string detail)
#         logger.error(f"HTTP Error: {he.detail}")
#         raise he
#     except Exception as e:
#         # Convert all other exceptions to simple string messages
#         error_msg = "An unexpected error occurred during upload"
#         logger.error(f"{error_msg}: {str(e)}", exc_info=True)
#         raise HTTPException(
#             status_code=500,
#             detail=error_msg  # Generic string message for client
#         )


# Mount static files for processed videos
app.mount("/processed", StaticFiles(directory="processed"), name="processed") 


@app.post("/upload/")
async def upload_video(video: UploadFile = File(...)):
    # Debugging: Initial request logging
    print(f"🔔 Received upload request for: {video.filename}")
    print(f"📄 Content-Type: {video.content_type}")
    print(f"📋 Headers: {video.headers}")
    logger.info(f"Starting upload process for: {video.filename}")

    try:
        # ===== 1. File Validation =====
        print("🔍 Validating file extension...")
        if not validate_file_extension(video.filename):
            error_msg = f"Unsupported file type. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
            print(f"❌ Validation failed: {error_msg}")
            logger.error(error_msg)
            raise HTTPException(
                status_code=400,
                detail=error_msg
            )

        # ===== 2. File Upload =====
        file_size = 0
        chunk_size = 16 * 1024 * 1024  # 16MB chunks
        file_location = os.path.join(UPLOAD_DIR, video.filename)
        
        print(f"📥 Starting upload to: {file_location}")
        logger.info(f"Beginning file upload to {file_location}")

        with open(file_location, "wb") as buffer:
            while True:
                chunk = await video.read(chunk_size)
                if not chunk:
                    print("✅ Reached end of file")
                    break
                
                file_size += len(chunk)
                buffer.write(chunk)
                current_size_mb = file_size / (1024 * 1024)
                
                # Debugging: Progress tracking
                if file_size % (50 * 1024 * 1024) == 0:  # Log every 50MB
                    print(f"📊 Upload progress: {current_size_mb:.2f} MB")
                    logger.debug(f"Upload progress: {current_size_mb:.2f} MB")

                # Size validation
                if current_size_mb > MAX_FILE_SIZE_MB:
                    error_msg = f"File exceeds {MAX_FILE_SIZE_MB}MB limit (current: {current_size_mb:.2f}MB)"
                    print(f"⚠️ {error_msg}")
                    logger.warning(error_msg)
                    buffer.close()
                    os.remove(file_location)
                    print("🧹 Cleaned up partial upload")
                    raise HTTPException(
                        status_code=413,
                        detail=error_msg
                    )

        print(f"✅ Successfully saved: {video.filename} ({current_size_mb:.2f} MB)")
        logger.info(f"File saved: {video.filename} ({current_size_mb:.2f} MB)")

        # ===== 3. Video Processing =====
        print("⚙️ Starting video processing...")
        logger.info("Initiating video processing")
        try:
            success = process_video(video.filename)
            if not success:
                error_msg = "Video processing returned False"
                print(f"❌ {error_msg}")
                logger.error(error_msg)
                raise HTTPException(
                    status_code=500,
                    detail=error_msg
                )
            print("🎥 Video processed successfully")
            logger.info("Video processing completed")

        except Exception as processing_error:
            print(f"🔥 Processing failed: {str(processing_error)}")
            logger.error(f"Processing failed: {str(processing_error)}", exc_info=True)
            raise HTTPException(
                status_code=500,
                detail="Video processing error"
            )

        # ===== 4. Success Response =====
        response_data = {
            "message": "Processing completed!",
            "filename": video.filename,
            "size_mb": round(current_size_mb, 2)
        }
        print(f"🏁 Upload completed: {response_data}")
        logger.info(f"Upload successful: {response_data}")
        return response_data

    except HTTPException as he:
        print(f"🚨 HTTP Error {he.status_code}: {he.detail}")
        logger.error(f"HTTP Error {he.status_code}: {he.detail}")
        raise he
        
    except Exception as e:
        error_msg = f"Unexpected error: {str(e)}"
        print(f"💥 CRITICAL: {error_msg}")
        logger.critical(error_msg, exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred"
        )

# @app.get("/search/{plate_number}")
# async def get_plate(plate_number: str, limit: Optional[int] = 10):
#     try:
#         if not plate_number.strip():
#             raise HTTPException(status_code=400, detail="Plate number cannot be empty")

#         results = search_plate(plate_number)
        
#         if not results:
#             raise HTTPException(
#                 status_code=404,
#                 detail="No matching plates found",
#                 headers={"X-Error": "No results"}
#             )

#         return {
#             "count": len(results),
#             "results": results[:limit]
#         }
    
#     except sqlite3.Error as e:
#         logger.error(f"Database error: {str(e)}")
#         raise HTTPException(status_code=500, detail="Database operation failed")
#     except Exception as e:
#         logger.error(f"Search error: {str(e)}")
#         raise HTTPException(status_code=500, detail="Internal server error")



@app.get("/search/{plate_number}")
async def get_plate(plate_number: str, limit: Optional[int] = 10):
    """Search for license plates and return timestamps and video names"""
    try:
        logger.info(f"🔍 Searching for plate: {plate_number}")
        
        if not plate_number.strip():
            raise HTTPException(
                status_code=400,
                detail="Plate number cannot be empty"
            )

        # Search the database
        results = search_plate(plate_number)
        
        if not results:
            logger.info(f"No results found for plate: {plate_number}")
            raise HTTPException(
                status_code=404,
                detail="No matching plates found"
            )

        logger.info(f"Found {len(results)} matches for plate: {plate_number}")
        
        # Format the results with proper timestamps
        formatted_results = []
        for video_name, timestamp in results[:limit]:
            # Convert timestamp to minutes:seconds format
            minutes = int(timestamp // 60)
            seconds = int(timestamp % 60)
            timestamp_str = f"{minutes:02d}:{seconds:02d}"
            
            formatted_results.append({
                "video_name": video_name,
                "timestamp": timestamp,
                "timestamp_display": timestamp_str,
                "video_url": f"/processed/{video_name}"  # URL to access the processed video
            })

        return {
            "plate_number": plate_number,
            "count": len(results),
            "results": formatted_results
        }
    
    except sqlite3.Error as e:
        logger.error(f"Database error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Database operation failed"
        )
    except Exception as e:
        logger.error(f"Search error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=True,
        workers=2,
        limit_max_requests=1000
    )