***ToDo-List Mini Web Application***
==================================================================

***Overview***
The ToDo-List Mini Web Application is designed to efficiently manage tasks, allowing users to view, create, edit, and delete their tasks seamlessly. The application also includes users to register and log in to access their task lists.

***Technologies Used***

Frontend: React.js, CSS, Bootstrap

Backend: Java (18+), Spring Boot (3.3+), Swagger

Database: PostgreSQL

***Features***
User Login/Register: Users can register by providing necessary details such as username, email, and password. Users can log in securely.
Task Management: Users can easily create, view, edit, and delete tasks.

**Usage**
1. Start the application: `mvn spring-boot:run`
2. Access the application: http://localhost:8081
3. Access Swagger UI at http://localhost:8081/swagger-ui/index.html to explore the API documentation.

* `API_URL`: Base URL for the application : 
http://localhost:8081/todo-list/api/

**Configuration Files**

* `application.properties`: Use postgre for database. Create a database.


## Frontend (React)

This application uses a separate React project for the frontend.

**Project Setup**

1. Navigate to the project directory: `cd project_folder_path/Frontend`
2. Install dependencies: `npm install`

**Integration Details**

The React frontend interacts with the Spring Boot backend using a REST API exposed by the application. 
Data is fetched from API endpoints and displayed on the user interface.

**Running the Application**

1. Start the Spring Boot backend: `mvn spring-boot:run`
2. Run the React development server: `npm start`
-------------------------------------------------------

**Authors**
Khin Myo Wai
