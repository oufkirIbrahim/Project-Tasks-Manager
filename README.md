# Project Task Manager

A web application to manage tasks within projects, built using a Spring Boot backend (`project-task-manager-api`) and an Angular frontend (`project-task-manager-ui`). This application allows users to create, update, and manage tasks within specific projects. It includes features such as task status management and due date tracking.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [License](#license)

## Project Overview

This application consists of two main parts:
1. **Backend** (`project-task-manager-api`): A Spring Boot application that handles the business logic and API endpoints for managing tasks and projects.
2. **Frontend** (`project-task-manager-ui`): An Angular application that provides a user-friendly interface to interact with the backend.

## Tech Stack

### Backend (`project-task-manager-api`)
- Java
- Spring Boot
- Spring Data JPA (for database interaction)
- PostgreSQL (Database)
- Maven (for dependency management)
- Swagger (for API documentation)
- RESTful API

### Frontend (`project-task-manager-ui`)
- TypeScript
- Angular
- Angular Material (for UI components)
- RxJS (for reactive programming)
- Node.js (for running the development server)
- npm (for dependency management)

## Backend Setup (`project-task-manager-api`)

### Prerequisites
- Java 17 or later
- Maven
- PostgreSQL Database

### Steps to Setup the Backend

1. **Clone the repository**:
    ```bash
    git clone https://github.com/oufkirIbrahim/Project-Tasks-Manager.git
    cd Project-Tasks-Manager/project-task-manager-api
    ```

2. **Configure the database**:
    - Create a PostgreSQL database and user.
    - Update the `application.properties` or `application.yml` file with your database credentials:
        ```properties
        spring.datasource.url=jdbc:postgresql://localhost:5432/your-database-name
        spring.datasource.username=your-database-username
        spring.datasource.password=your-database-password
        ```

3. **Build and run the backend**:
    - Using Maven:
        ```bash
        mvn clean install
        mvn spring-boot:run
        ```

4. **API Endpoints**: 
    - The backend exposes a set of RESTful endpoints to manage tasks and projects. You can test these endpoints using a tool like Postman or curl.
    
5. **Swagger Documentation URL**:
    - Once the backend is running, you can access the Swagger documentation for your API at:
      ```
      http://localhost:8080/api/v1/swagger-ui
      ```
      Swagger will allow you to explore all available endpoints and test them directly from the UI.

## Frontend Setup (`project-task-manager-ui`)

### Prerequisites
- Node.js (version 14 or later)
- npm

### Steps to Setup the Frontend

1. **Clone the repository**:
    ```bash
    git clone https://github.com/oufkirIbrahim/Project-Tasks-Manager.git
    cd Project-Tasks-Manager/project-task-manager-ui
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the frontend**:
    ```bash
    ng serve
    ```

    - The frontend will be available at `http://localhost:4200/` in your browser.

4. **Configure API URLs**: Ensure that the frontend is set up to point to the correct backend API URL (e.g., `http://localhost:8080/api/v1`). You can configure this in the environment files (`src/environments/environment.ts`).

## Running the Application

Once both the backend and frontend are running:

1. Start the **backend** service with Maven:
    ```bash
    mvn spring-boot:run
    ```

2. Start the **frontend** service with Angular:
    ```bash
    ng serve
    ```

Your application should now be accessible at:
- Backend: `http://localhost:8080/api/v1/`
- Frontend: `http://localhost:4200/`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


