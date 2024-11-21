from flask import Flask, request, jsonify, session
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from deepface import DeepFace
import os
import uuid
from sqlalchemy import create_engine, Column, VARCHAR, Integer, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, mapped_column, scoped_session
from dotenv import load_dotenv
from flask_session import Session

load_dotenv()

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = False
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['ALLOWED_EXTENSIONS'] = {'jpg', 'jpeg', 'png', 'gif'}
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
Session(app)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173", "supports_credentials": True}})

Base = declarative_base()

class Result(Base):
    __tablename__ = 'results'
    id = Column(Integer, primary_key=True, autoincrement=True)
    userId = mapped_column(Integer, ForeignKey('users.id'))
    emotion = Column(VARCHAR(255), nullable=False)

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(VARCHAR(255), nullable=False)
    email = Column(VARCHAR(255), nullable=False, unique=True)
    passwordHash = Column(Text, nullable=False)

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_PORT = os.getenv("DB_PORT")
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
engine = create_engine(DATABASE_URL)
Base.metadata.create_all(engine)
DBSession = scoped_session(sessionmaker(bind=engine))

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route("/auth/signup", methods=["POST"])
def register_user():
    conn = DBSession()
    try:
        data = request.form
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")
        confirm_password = data.get("confirmPassword")

        if not all([name, email, password, confirm_password]):
            return jsonify({"error": "Missing required fields"}), 400

        if password != confirm_password:
            return jsonify({"error": "Passwords do not match"}), 400

        existing_user = conn.query(User).filter_by(email=email).first()
        if existing_user:
            return jsonify({"error": "User already exists"}), 400

        password_hash = generate_password_hash(password or "")

        new_user = User(name=name, email=email, passwordHash=password_hash)
        conn.add(new_user)
        conn.commit()

        return jsonify({"message": "User registered successfully"}), 201
    finally:
        conn.close()

@app.route("/auth/login", methods=["POST"])
def login_user():
    conn = DBSession()
    try:
        data = request.form
        email = data.get("email")
        password = data.get("password")

        if not all([email, password]):
            return jsonify({"error": "Missing required fields"}), 400

        user = conn.query(User).filter_by(email=email).first()
        password_hash = getattr(user, 'passwordHash')
        if not user or not check_password_hash(password_hash, password or ""):
            return jsonify({"error": "Invalid email or password"}), 401

        session["user_id"] = user.id
        session["email"] = user.email

        return jsonify({"message": "Login successful"}), 200
    finally:
        conn.close()

@app.get('/api/emotions')
def get_results():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'User is not logged in'}), 401

    conn = DBSession()
    try:
        results = conn.query(Result).filter_by(userId=user_id).all()

        return jsonify({'emotions': [{'emotion': result.emotion} for result in results]}), 200
    finally:
        conn.close()

@app.post('/api/upload')
def upload_file():

    files = request.files.getlist('files')

    if not files:
        return jsonify({'error': 'No files uploaded'}), 400

    for file in files:
        if not file.filename:
            return jsonify({'error': 'No file selected'}), 400
        if file and allowed_file(file.filename):
            conn = DBSession()
            try:
                os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

                unique_filename = f"{uuid.uuid4().hex}_{file.filename}"
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
                file.save(filepath)

                results = DeepFace.analyze(filepath, actions=['emotion'], enforce_detection=False)
                for result in results:
                    analysis = Result(emotion=result["dominant_emotion"], userId=session.get('user_id'))
                    conn.add(analysis)
                    conn.commit()

                os.remove(filepath)

                conn.close()
            except Exception as e:
                conn.rollback()
                return jsonify({'error': str(e)}), 500
        else:
            return jsonify({'error': 'Invalid file format'}), 400

    return jsonify({'message': 'Files uploaded successfully'}), 200

if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True, host='0.0.0.0', port=3345)

