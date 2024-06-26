import quiz from "../models/Quizzes.js";
import privateRooms from "../models/PrivateRooms.js";

// refer to ../misc/businessLogic.txt (based on what I understand)
export const PERMISSIONS = {
    "superadmin": {
        "user": ["GET", "POST", "PUT", "DELETE"],
        "quiz": ["GET", "POST", "PUT", "DELETE"],
        "question": ["GET", "POST", "PUT", "DELETE"],
        "answer": ["GET", "POST", "PUT", "DELETE"],
        "attempt": ["GET", "POST", "PUT", "DELETE"],
        "room": ["GET", "POST", "PUT", "DELETE"],
        "roomPermission": ["GET", "POST", "PUT", "DELETE"],
        "roomQuiz": ["GET", "POST", "PUT", "DELETE"],
    },
    "admin": {
        "user": ["GET", "PUT"],
        "quiz": ["GET"],
        "question": ["GET"],
        "answer": ["GET"],
        "attempt": ["GET"],
        "room": ["GET"],
        "roomPermission": ["GET"],
        "roomQuiz": ["GET"],
    },
    "user": { 
        "user": ["GET", "PUT"],
        "quiz": ["GET"],
        "question": ["GET"],
        "answer": ["GET"],
        "attempt": [],
        "room": ["GET", "POST"],
        "roomPermission": [],
        "roomQuiz": ["GET"],
    }
};