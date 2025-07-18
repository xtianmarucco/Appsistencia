# Template para Escribir Prompts Eficientes en Modo Agente

Este template te ayudará a estructurar tus solicitudes para trabajar de manera eficiente y clara con GitHub Copilot, siguiendo las buenas prácticas del proyecto.

---
## 1. Rol
**¿Como quien quiero que me responda el asistenc?**  
Ejemplo:  
> desarrollador js senior



## 2. Objetivo

**¿Qué quieres lograr?**  
Ejemplo:  
> Quiero centrar el formulario de login y aplicar un gradiente de fondo.

---

## 3. Contexto

**¿Dónde se aplicará el cambio?**  
- Archivo(s) involucrado(s):  
  - `front/src/pages/LoginPage.jsx`
  - `front/src/components/login-form/LoginForm.jsx`
- Fragmento(s) de código relevante(s) (opcional):  
  > [Pega aquí el fragmento si es necesario]

---

## 4. Acción Concreta

**¿Qué acción específica necesitas?**  
- [ ] Explicar código
- [ ] Refactorizar
- [ ] Corregir error
- [ ] Agregar funcionalidad
- [ ] Generar tests
- [ ] Otra: [especificar]

**Descripción detallada de la acción:**  
> Refactoriza el formulario de login para que esté centrado y tenga un ancho máximo de 600px. Muestra el Loader mientras la página está cargando o redireccionando.

---

## 5. Consideraciones Especiales

**¿Hay algo importante a tener en cuenta?**  
- Seguir los guidelines del proyecto.
- Mantener la compatibilidad con el diseño actual.
- Usar los colores del tema.

---

## 6. Resultado Esperado

**¿Cómo sabrás que la tarea está completa?**  
> El formulario debe estar centrado, con ancho máximo de 600px y el Loader debe mostrarse correctamente durante la carga.

---

**Ejemplo de Prompt usando el template:**

---
### Objetivo
Quiero mejorar la experiencia de usuario en la página de login.

### Contexto
Archivo: `front/src/pages/LoginPage.jsx`  
Actualmente el formulario no está centrado y el Loader no se muestra correctamente.

### Acción Concreta
- Refactorizar el formulario para que esté centrado y tenga un ancho máximo de 600px.
- Mostrar el componente Loader mientras la página está cargando o redireccionando.

### Consideraciones Especiales
- Usar los colores del tema para el fondo.
- Seguir la guía de buenas prácticas.

### Resultado Esperado
El formulario debe estar centrado, con el Loader visible durante la carga/redirección.

---

Utiliza este template para estructurar tus prompts y así trabajar de forma más clara y eficiente en modo agente.
