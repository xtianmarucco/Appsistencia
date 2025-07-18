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

- **guidelines.txt**: Guía de buenas prácticas para trabajar con Copilot y mantener el código limpio, así como recomendaciones para el equipo de desarrollo.
- Otros documentos que puedan agregarse en el futuro para ayudar a los desarrolladores.

---

## Tecnologías, Librerías y Recursos Utilizados

### Frontend
- React
- Redux
- Tailwind CSS
- Vite
- Axios
- ESLint

### Backend
- Node.js
- Express
- Sequelize (ORM para PostgreSQL)
- PostgreSQL
- JWT (para autenticación)
- Bcrypt (para hash de contraseñas)
- Dotenv
- Docker

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

- Sigue la [guía de buenas prácticas](./documents/guidelines.txt) para trabajar con Copilot y mantener el código limpio.
- Usa nombres descriptivos para variables y funciones.
- Escribe comentarios cuando el código no sea obvio.
- Realiza pruebas antes de subir cambios.

---

## Contribuir

1. Haz un fork del repositorio.
2. Crea una rama para tu feature o fix.
3. Haz tus cambios y escribe pruebas si es necesario.
4. Haz un pull request describiendo tus cambios.

---

## Contacto

Para dudas o sugerencias, contacta a los administradores del repositorio o abre un issue.

---
