# Company Structure Web Application

This repository contains the source code for a web application that displays, navigates, and edits a tree-like organizational structure, where each tree node represents an employee. The application is divided into a frontend built with React and TypeScript, and a backend built with Django.

## Frontend (Front-Company-Structure)

To run the frontend of the application, follow these steps:

1. Navigate to the `Front-Company-Structure` directory:

cd Front-Company-Structure


2. Install the dependencies using npm:

npm install


3. Start the development server:

npm start


4. Open your web browser and visit `http://localhost:3000` to view the application.



## Backend (Back-Company-Structure)

To set up the backend of the application using Django, follow these steps:

1. Navigate to the `Back-Company-Structure` directory:

cd Back-Company-Structure


2. Create a virtual environment (optional but recommended):

python -m venv venv


3. Activate the virtual environment:
- On Windows:
  ```
  venv\Scripts\activate
  ```
- On macOS and Linux:
  ```
  source venv/bin/activate
  ```

4. Install the required Python packages:

pip install -r requirements.txt


5. Start the Django development server:

python manage.py runserver


6. Open your web browser and visit `http://127.0.0.1:8000` to access the Django backend API.
