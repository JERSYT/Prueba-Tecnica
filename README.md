# Prueba Técnica - Consultores Estratégicos

## Descripción del Proyecto

Este proyecto es una API desarrollada con Node.js, Express, y MySQL, diseñada para recibir y gestionar formularios de contacto. El sistema almacena los envíos de los usuarios en una base de datos, y ofrece métricas sobre los envíos realizados, tales como el conteo diario, el conteo por país y por rango de fechas.

## Instrucciones de Configuración

Antes de ejecutar el proyecto, asegúrate de configurar las variables de entorno necesarias.

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=tu_base_de_datos
MAIL_HOST=tu_smtp_host
MAIL_PORT=tu_smtp_puerto
MAIL_USER=tu_email
MAIL_PASS=tu_password
ADMIN_EMAIL=correo_admin
PORT=3000
```

## Pasos para Instalar Dependencias

1. Clona el repositorio:

   ```bash
   git clone https://github.com/JERSYT/Prueba-Tecnica.git
   cd Prueba-Tecnica
   ```

2. Instala las dependencias usando npm:

   ```bash
   npm install
   ```

## Pasos para Ejecutar la Aplicación

Para iniciar el servidor en modo de desarrollo, ejecuta:

```bash
npm run dev
```

Este comando ejecutará el servidor utilizando `nodemon` para detectar cambios y reiniciar el servidor automáticamente.

## Instrucciones para Ejecutar las Pruebas

1. Asegúrate de tener Jest instalado (ya está en `devDependencies`).
2. Ejecuta las pruebas con:

```bash
npm test
```

> Asegúrate de tener la base de datos configurada correctamente para pruebas, o usar mocks según tu configuración.

## Ejemplos de Cómo Probar los Endpoints

### 1. **POST /api/contact-submissions**

- Método: `POST`
- URL: `http://localhost:3000/api/contact-submissions`
- Cuerpo de la solicitud (JSON):

```json
{
  "fullName": "Juan Pérez",
  "email": "juan@example.com",
  "country": "MX",
  "phone": "1234567890",
  "message": "¡Hola! Tengo una consulta."
}
```

**Respuesta esperada:**

```json
{
  "mensaje": "Formulario recibido correctamente."
}
```

---

### 2. **GET /api/metrics/daily-submissions**

- Método: `GET`
- URL: `http://localhost:3000/api/metrics/daily-submissions`

**Respuesta esperada:**

```json
{
  "conteo": 10
}
```

---

### 3. **GET /api/metrics/by-country**

- Método: `GET`
- URL: `http://localhost:3000/api/metrics/by-country`

**Respuesta esperada:**

```json
[
  { "country": "CO", "count": 3 },
  { "country": "MX", "count": 5 }
]
```

---

### 4. **GET /api/metrics/by-date-range?start=YYYY-MM-DD&end=YYYY-MM-DD**

- Método: `GET`
- URL de ejemplo:  
  `http://localhost:3000/api/metrics/by-date-range?start=2025-04-01&end=2025-04-25`

**Respuesta esperada:**

```json
[
  { "date": "2025-04-01", "count": 2 },
  { "date": "2025-04-05", "count": 1 },
  { "date": "2025-04-10", "count": 3 }
]
```

---

## Respuestas a las Preguntas de Razonamiento

### Arquitectura y Diseño

**¿Por qué elegiste Express o NestJS?**  
Elegí Express debido a su simplicidad y flexibilidad. Es muy adecuado para APIs pequeñas y medianas como la que se requiere en esta prueba técnica. Además, Express es ampliamente utilizado y tiene una gran comunidad y documentación.

**Estructura del Proyecto:**  
La estructura del proyecto sigue un patrón modular:

- **Controllers**: Contienen la lógica para manejar las solicitudes.
- **Routes**: Definen las rutas para cada endpoint.
- **Models**: Incluyen la configuración de la base de datos y el acceso a la misma.
- **Validations**: Contienen los esquemas de validación para los datos entrantes.
- **Services**: Incluyen la lógica para enviar correos electrónicos.

**Decisiones clave en el diseño del esquema de la base de datos:**  
El esquema de la base de datos incluye una tabla llamada `contact_submissions` para almacenar los envíos de contacto. Esta tabla tiene campos como `full_name`, `email`, `country`, `phone`, `message` y `created_at` para registrar los datos necesarios.

### Escalabilidad y Mejoras

**¿Dónde esperarías los principales cuellos de botella y qué estrategias aplicarías para escalarla?**

- **Base de Datos**: A medida que crece la cantidad de datos, las consultas a la base de datos pueden volverse más lentas. Para escalar la base de datos, utilizaría índices en columnas como `created_at` y `country` para mejorar el rendimiento de las consultas.
- **Código**: Podría optimizarse utilizando cacheo de respuestas frecuentes y limitando la cantidad de datos recuperados en una sola consulta (por ejemplo, paginación).
- **Infraestructura**: Utilizaría una solución de balanceo de carga y escalabilidad horizontal con contenedores Docker y Kubernetes si el tráfico es alto.

**Funcionalidades adicionales que mejorarían la API:**

1. Implementar autenticación y autorización para proteger los endpoints.
2. Añadir paginación para los resultados de métricas que puedan devolver grandes cantidades de datos.

### Alternativas y Trade-offs

**¿Consideraste brevemente otras librerías o enfoques técnicos?**  
Se consideraron alternativas como Sequelize para la gestión de la base de datos, pero se optó por usar `mysql2/promise` por su simplicidad y control directo sobre las consultas SQL.

**Trade-offs de la elección final:**  
El uso de `mysql2/promise` hace que el código sea más directo y fácil de comprender, pero podría ser menos flexible que un ORM como Sequelize si se quisiera extender la aplicación en el futuro con funcionalidades más complejas (como migraciones de base de datos).

**¿Hubo alguna simplificación o compromiso debido al tiempo?**  
El proyecto no incluyó pruebas automatizadas ni una implementación completa de seguridad, como la validación de entradas más estricta o la implementación de autenticación, debido a limitaciones de tiempo.

### Endpoint de Métricas

**¿Cómo implementaste la lógica para GET /api/metrics/daily-submissions?**  
Este endpoint cuenta el número de registros de contacto cuya fecha (`created_at`) es igual al día actual. La consulta se realiza utilizando MySQL, aprovechando las funciones `COUNT(*)` y `CURDATE()` para obtener el número de registros de hoy.

**¿Es eficiente?**  
Sí, es eficiente para un volumen bajo de registros. Sin embargo, si el volumen de registros crece significativamente, se podrían implementar índices en la columna `created_at` para mejorar el rendimiento.

**¿Cómo abordarías el diseño de un endpoint que permita obtener métricas por país o por un rango de fechas?**  
Utilizaría filtros en la consulta SQL basados en los parámetros proporcionados en la solicitud. Por ejemplo, para obtener métricas por país, agregaría una cláusula `WHERE country = ?` en la consulta. Para un rango de fechas, usaría condiciones como `WHERE created_at BETWEEN ? AND ?`.
