# Appsistencia

Appsistencia es una aplicación web para la gestión y control de asistencia de empleados en empresas. Permite a los empleados registrar su entrada y salida, y a los administradores visualizar reportes y gestionar usuarios. Este README está pensado para que cualquier desarrollador junior pueda entender la estructura, el funcionamiento y cómo contribuir al proyecto.

---

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contenido de la Carpeta front](#contenido-de-la-carpeta-front)
- [Contenido de la Carpeta back](#contenido-de-la-carpeta-back)
- [Contenido de la Carpeta documents](#contenido-de-la-carpeta-documents)
- [Tecnologías, Librerías y Recursos Utilizados](#tecnologías-librerías-y-recursos-utilizados)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Instalación y Puesta en Marcha](#instalación-y-puesta-en-marcha)
- [Modelo de Datos](#modelo-de-datos)
- [Buenas Prácticas](#buenas-prácticas)
- [Contribuir](#contribuir)
- [Contacto](#contacto)

---

## Descripción General

Appsistencia es una solución para el control de asistencia de empleados. Los usuarios pueden iniciar sesión, registrar su asistencia (check-in/check-out) y los administradores pueden gestionar usuarios y visualizar reportes.

---

## Estructura del Proyecto

```
Appsistencia/
├── front/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── thunks/
│   └── package.json
├── back/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   └── controllers/
│   └── package.json
├── documents/
│   └── guidelines.txt
├── docker-compose.yml
└── README.md
```

---

## Contenido de la Carpeta front

La carpeta `front/` contiene todo el código fuente del frontend de la aplicación, desarrollado en React. Sus subcarpetas principales son:

- **src/pages/**: Páginas principales de la aplicación, como Login, Dashboard de empleados, Dashboard de administradores, CheckInOut, etc. Cada página representa una vista completa.
- **src/components/**: Componentes reutilizables de React, como formularios, modales, tablas, tarjetas de usuario, selectores de fecha, loaders, etc. Estos componentes se usan en las distintas páginas.
- **src/thunks/**: Lógica asíncrona y acciones de Redux para interactuar con la API (por ejemplo, login, registro, obtención de datos de usuario, etc).
- **public/**: Archivos estáticos como imágenes y el archivo `index.html` base.
- **package.json**: Define las dependencias, scripts y configuración del frontend.
- **Otros archivos**: Configuración de Tailwind, Vite, ESLint, etc.

---

## Contenido de la Carpeta back

La carpeta `back/` contiene el backend de la aplicación, desarrollado en Node.js y Express. Sus subcarpetas principales son:

- **src/models/**: Modelos de datos definidos con Sequelize para interactuar con la base de datos PostgreSQL. Incluye modelos como Usuario y Asistencia.
- **src/routes/**: Define los endpoints de la API REST, agrupados por funcionalidad (usuarios, asistencia, autenticación, etc).
- **src/controllers/**: Lógica de negocio para cada endpoint, como validaciones, procesamiento de datos y respuestas a las peticiones.
- **database.js**: Configuración de la conexión a la base de datos PostgreSQL.
- **server.js**: Punto de entrada del backend, donde se inicializa el servidor Express.
- **package.json**: Define las dependencias, scripts y configuración del backend.
- **Dockerfile**: Configuración para contenerizar el backend.

---

## Contenido de la Carpeta documents

La carpeta `documents/` contiene documentación relevante para el proyecto, como:

- **guidelines.txt**: Guía de buenas prácticas para trabajar y mantener el código limpio, así como recomendaciones para el equipo de desarrollo.
- Otros documentos que puedan agregarse en el futuro para ayudar a los desarrolladores.

---

## Tecnologías, Librerías y Recursos Utilizados

### Frontend
- React
- Redux Toolkit
- Tailwind CSS
- Vite
- Axios
- ESLint
- FullCalendar
- Luxon
- QRCode.react
- React Icons
- React Router DOM

### Backend
- Node.js
- Express
- Sequelize (ORM para PostgreSQL)
- PostgreSQL
- JWT (para autenticación)
- Bcrypt (para hash de contraseñas)
- Dotenv
- Docker
- UUID

### Otros
- Docker Compose (orquestación de contenedores)
- Git (control de versiones)

---

## Arquitectura del Proyecto

La arquitectura de Appsistencia es de tipo cliente-servidor y está dividida en tres grandes bloques:

1. **Frontend (front/):**
   - Aplicación SPA (Single Page Application) en React.
   - Usa Redux para el manejo de estado global.
   - Se comunica con el backend a través de peticiones HTTP (API REST).
   - Utiliza Tailwind CSS para estilos y Vite como bundler.

2. **Backend (back/):**
   - API REST construida con Node.js y Express.
   - Utiliza Sequelize como ORM para interactuar con la base de datos PostgreSQL.
   - Implementa autenticación con JWT y gestión de usuarios, roles y asistencias.
   - Expone endpoints para login, registro, gestión de usuarios y control de asistencia.

3. **Base de datos (PostgreSQL):**
   - Almacena la información de usuarios, roles y registros de asistencia.
   - Gestionada y orquestada mediante Docker Compose.

4. **Contenedores Docker:**
   - Cada parte (frontend, backend, base de datos) corre en su propio contenedor.
   - Orquestados con `docker-compose.yml` para facilitar el despliegue y la integración.

---

## Instalación y Puesta en Marcha

### Requisitos previos
- Docker y Docker Compose instalados

### Pasos

1. Clona el repositorio:
   ```bash
   git clone <url-del-repo>
   cd Appsistencia
   ```

2. Configura variables de entorno:
   - Crea un archivo `.env` en la carpeta `back/` con la configuración de tu base de datos y llaves secretas. Ejemplo:
     ```
     DB_HOST=db
     DB_USER=postgres
     DB_PASSWORD=postgres
     DB_NAME=appsistencia
     DB_PORT=5432
     JWT_SECRET=tu_secreto
     ```

3. Levanta los contenedores con Docker Compose:
   ```bash
   docker-compose up --build
   ```

   Esto iniciará el backend, frontend y la base de datos PostgreSQL en contenedores separados.

4. Accede a la aplicación:
   - El frontend estará disponible en `http://localhost:3000`
   - El backend en `http://localhost:4000` (o el puerto que definas)

---

## Modelo de Datos

### Usuario (`models/User.js`)
```js
{
  nombre: STRING,
  email: STRING,
  password: STRING,
  role: STRING, // 'admin' o 'user'
  user_otp_configured: BOOLEAN
}
```

### Registro de Asistencia (`models/Attendance.js`)
```js
{
  userId: INTEGER,
  fecha: DATE,
  horaEntrada: DATE,
  horaSalida: DATE
}
```

---

## Buenas Prácticas

- Sigue la [guía de buenas prácticas](./documents/guidelines.txt) para trabajar y mantener el código limpio.
- Usa nombres descriptivos para variables y funciones.
- Escribe comentarios cuando el código no sea obvio.
- Realiza pruebas antes de subir cambios.

---

## Contacto

Para dudas o sugerencias, contacta a los administradores del repositorio o abre un issue.

---

# Appsistencia

Appsistencia is a web application for managing and tracking employee attendance in companies. It allows employees to register their check-in and check-out, and administrators to view reports and manage users. This README is designed to help junior developers understand the structure, functionality, and how to contribute to the project.

---

## Table of Contents

- [General Description](#general-description)
- [Project Structure](#project-structure)
- [Contents of the front Folder](#contents-of-the-front-folder)
- [Contents of the back Folder](#contents-of-the-back-folder)
- [Contents of the documents Folder](#contents-of-the-documents-folder)
- [Technologies, Libraries, and Resources Used](#technologies-libraries-and-resources-used)
- [Project Architecture](#project-architecture)
- [Installation and Setup](#installation-and-setup)
- [Data Model](#data-model)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [Contact](#contact)

---

## General Description

Appsistencia is a solution for tracking employee attendance. Users can log in, register their attendance (check-in/check-out), and administrators can manage users and view reports.

---

## Project Structure

```
Appsistencia/
├── front/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── thunks/
│   └── package.json
├── back/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   └── controllers/
│   └── package.json
├── documents/
│   └── guidelines.txt
├── docker-compose.yml
└── README.md
```

---

## Contents of the front Folder

The `front/` folder contains all the source code for the application's frontend, developed in React. Its main subfolders are:

- **src/pages/**: Main pages of the application, such as Login, Employee Dashboard, Admin Dashboard, CheckInOut, etc. Each page represents a complete view.
- **src/components/**: Reusable React components, such as forms, modals, tables, user cards, date pickers, loaders, etc. These components are used across different pages.
- **src/thunks/**: Asynchronous logic and Redux actions to interact with the API (e.g., login, registration, fetching user data, etc).
- **public/**: Static files like images and the base `index.html` file.
- **package.json**: Defines dependencies, scripts, and frontend configuration.
- **Other files**: Configuration for Tailwind, Vite, ESLint, etc.

---

## Contents of the back Folder

The `back/` folder contains the application's backend, developed in Node.js and Express. Its main subfolders are:

- **src/models/**: Data models defined with Sequelize to interact with the PostgreSQL database. Includes models like User and Attendance.
- **src/routes/**: Defines the API REST endpoints, grouped by functionality (users, attendance, authentication, etc).
- **src/controllers/**: Business logic for each endpoint, such as validations, data processing, and request responses.
- **database.js**: Configuration for connecting to the PostgreSQL database.
- **server.js**: Entry point for the backend, where the Express server is initialized.
- **package.json**: Defines dependencies, scripts, and backend configuration.
- **Dockerfile**: Configuration for containerizing the backend.

---

## Contents of the documents Folder

The `documents/` folder contains relevant documentation for the project, such as:

- **guidelines.txt**: Best practices for working and maintaining clean code, as well as recommendations for the development team.
- Other documents that may be added in the future to assist developers.

---

## Technologies, Libraries, and Resources Used

### Frontend
- React
- Redux Toolkit
- Tailwind CSS
- Vite
- Axios
- ESLint
- FullCalendar
- Luxon
- QRCode.react
- React Icons
- React Router DOM

### Backend
- Node.js
- Express
- Sequelize (ORM for PostgreSQL)
- PostgreSQL
- JWT (for authentication)
- Bcrypt (for password hashing)
- Dotenv
- Docker
- UUID

### Other
- Docker Compose (container orchestration)
- Git (version control)

---

## Project Architecture

Appsistencia's architecture is client-server based and divided into three major blocks:

1. **Frontend (front/):**
   - SPA (Single Page Application) built with React.
   - Uses Redux for global state management.
   - Communicates with the backend via HTTP requests (API REST).
   - Utilizes Tailwind CSS for styling and Vite as a bundler.

2. **Backend (back/):**
   - API REST built with Node.js and Express.
   - Uses Sequelize as an ORM to interact with the PostgreSQL database.
   - Implements authentication with JWT and manages users, roles, and attendance.
   - Exposes endpoints for login, registration, user management, and attendance tracking.

3. **Database (PostgreSQL):**
   - Stores information about users, roles, and attendance records.
   - Managed and orchestrated using Docker Compose.

4. **Docker Containers:**
   - Each part (frontend, backend, database) runs in its own container.
   - Orchestrated with `docker-compose.yml` for easy deployment and integration.

---

## Installation and Setup

### Prerequisites
- Docker and Docker Compose installed

### Steps

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd Appsistencia
   ```

2. Configure environment variables:
   - Create a `.env` file in the `back/` folder with your database configuration and secret keys. Example:
     ```
     DB_HOST=db
     DB_USER=postgres
     DB_PASSWORD=postgres
     DB_NAME=appsistencia
     DB_PORT=5432
     JWT_SECRET=your_secret
     ```

3. Start the containers with Docker Compose:
   ```bash
   docker-compose up --build
   ```

   This will start the backend, frontend, and PostgreSQL database in separate containers.

4. Access the application:
   - The frontend will be available at `http://localhost:3000`
   - The backend at `http://localhost:4000` (or the port you define)

---

## Data Model

### User (`models/User.js`)
```js
{
  name: STRING,
  email: STRING,
  password: STRING,
  role: STRING, // 'admin' or 'user'
  user_otp_configured: BOOLEAN
}
```

### Attendance Record (`models/Attendance.js`)
```js
{
  userId: INTEGER,
  date: DATE,
  checkInTime: DATE,
  checkOutTime: DATE
}
```

---

## Best Practices

- Follow the [best practices guide](./documents/guidelines.txt) for working and maintaining clean code.
- Use descriptive names for variables and functions.
- Write comments when the code is not obvious.
- Test changes before pushing them.


---

## Contact

For questions or suggestions, contact the repository administrators or open an issue.

---
