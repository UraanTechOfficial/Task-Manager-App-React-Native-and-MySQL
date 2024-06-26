# Task-Manager-App-React-Native-and-MySQL
The Task Manager app is created using React Native and MySQL where the user can add tasks to be created or edit or delete the tasks as required. 

# Features 
Task manager aims to provide user with a powerful tool to manage their daily tasks. It allows users to add, edit, and delete tasks, as well as keep track of their progress. The app also allows users to change their password. 
- User authentication (signup, login, change password)
- CRUD operations for tasks
- API documentation using Swagger
- Mobile interface built with React Native

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [License](#license)

# Folder Structure
* `task-manager`: Contains all the source code for frontend.
* `task-manager-backend`: Contains all the source code for backend, including the initialization of database server.

# Dependencies 
* bcryptjs": ^2.4.3
* dotenv: ^16.4.5
* express: ^4.19.2
* jsonwebtoken: ^9.0.2
* mysql: ^2.18.1
* mysql2: ^3.9.7
* swagger-jsdoc: ^6.2.8
* swagger-ui-express: ^5.0.0
* "@react-native-async-storage/async-storage: ^1.23.1
* @react-native-community/datetimepicker: ^8.0.1
* @react-native-picker/picker: ^2.7.5
* @react-navigation/bottom-tabs: ^6.5.20
* @react-navigation/native: ^6.1.17
* @react-navigation/stack: ^6.3.29
* axios: ^1.6.8
* expo: ~51.0.7
* expo-status-bar: ~1.12.1
* react: 18.2.0
* react-native: 0.74.1
* react-native-date-picker: ^5.0.2
* react-native-gesture-handler: ^2.16.2
* react-native-reanimated: ^3.11.0
* react-native-safe-area-context: ^4.10.1
* react-native-screens: ^3.31.1

# devDependencies
* @babel/core: ^7.20.0
* nodemon: ^3.1.0

## Project Structure

### Backend

    task-manager-backend/
    ├── config/
    │   ├── db.js
    │   └── swagger.js
    ├── controllers/
    │   ├── authController.js
    │   └── taskController.js
    ├── middleware/
    │   ├── authMiddleware.js
    ├── models/
    │   ├── User.js
    │   └── Task.js
    ├── routes/
    │   ├── auth.js
    │   └── tasks.js
    ├── .env
    ├── index.js
    ├── package.json
    ├── README.md
    └── LICENSE

### Frontend (React Native)

    task-manager-frontend/
    ├── assets/
    │ └── images/
    ├── components/
    │ ├── TaskItem.js
    │ └── TaskList.js
    ├── navigation/
    │ ├── AppNavigator.js
    │ └── AuthNavigator.js
    ├── screens/
    │ ├── LoginScreen.js
    │ ├── SignupScreen.js
    │ ├── TaskDetailScreen.js
    │ ├── TaskListScreen.js
    │ └── MainScreen.js
    ├── services/
    │ └── api.js
    ├── App.js
    ├── app.json
    ├── package.json
    ├── babel.config.js
    └── README.md

# How to Run 

## Backend Setup

1. Clone the repository:
    ```sh
   git clone https://github.com/muneera8907/task-manager-app.git
    cd task-manager/task-manager-backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file and configure your environment variables:
    ```
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:
    ```sh
    node index.js
    ```

## Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd task-manager/task-manager-frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the React Native app:
    ```sh
    npx expo start
    ```


## Usage

After setting up both the backend and frontend, you can use the React Native app to interact with the task manager API.

- Create a new user by signing up.
- Log in with your credentials.
- Create, update, delete, and view tasks.

## License

This project is licensed under the MIT License.

