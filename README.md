# Server-web-Teseracto

<h1> Para este proyecto se es necesario consultar que las tecnologias que utilicemos sean compatibles para lo que queremos hacer</h1>

REVISAR LO SIGUIENTE:

1. dependencias y compatibilidad con PostgresSQL: CONSULTAR documentación https://node-postgres.com/ **Y REVISAR LA DOCUMENTACIÓN OFICIAL DE Typescript:** https://www.typescriptlang.org/docs/

Usaremos de typescript como lenguaje principal, postgresql como base de datos y express como framework para crear el servidor

<h1>PASO 1</h1> Clona el repositorio del proyecto con el siguiente comando en cualquier ubicación de tu equipo: 

```
git clone https://github.com/edRan21/Server-web-Teseracto.git
```

**Una vez que se clona todo el proyecto para revisar que cambios se le realizan al repositorio o en el desarrollo local ingresa este comando:**

```
git status 
```

**De igual forma, si es la primera vez que clonas el repositorio, o cada miembro del equipo de desarrollo realiza cambios es importante que ejecute el siguiente comando:**

```
git pull origin main
```

**Este comando sirve para actualizar los cambios que se esten haciendo del repositorio de github al del repositorio local, o sea el proyecto que clonaste del original no estará actualizado si en este caso alguien lo modifica así conforme si siga desarrollando y construyedo más código, archivos y carpetas**

*Para mayor informacion (yo también estaré estudiando), les recomiendo estudiar este video para conocer el funcionamiento de git y github, ya que el control de trabajo si debe realizarse de forma manual:*
https://youtu.be/3GymExBkKjE?si=zLJ2PQmF0lUdpPW_

<h1> PASO 2 </h1> Instala las dependencias que necesitará el proyecto, estas estan basadas en los videos: https://youtu.be/Gqr15Uvhr6s?si=7ETVZ1CnEPppSSSF y https://youtu.be/8qteIhQe4ts?si=-L_I0pJiULw6vzlV

<h2>Paquetes y dependencias a instalar con el comando:</h2>

```
npm install class-validator cors dotenv express morgan typeorm typeorm-naming-strategies typescript.
```

Breve descripción y función de cada depedencia:
1. class-validator: Permite generar validadores de clases sobre sus elementos a traves de sus decoradores, ejemplo: si es un email, etc

2. cors: Permite el cruzamiento de datos que cuando tenemos una aplicación "frontend" y esta consume una API, si no tenemos un core configurado que no tenga un origen especifico como una URL si no que sea una API publica, lo que pasará es que la politica de cors bloquerá ese consumo de datos.

3. odtenv: Manaja todas las variables de entorno, trabaja que tipo de ambiente vamos a trabajar: producción, desarrollo etc.

4. Express: Permite generar controladores, rutas para generar API de comunicación.

5. morgan: Es un especie de logger, por consola nos mostrara el tipo de ruta que estamos queriendo tomar y el tipo de solicitud (metodo): get, post, delete, etc, y el status de este. SE CONFIGURA EN EL PASO "Herramientas de inicio de de aplicación".

6. pg: Brinda las funciones que nos permitirá conectarnos a la base de datos de postgresql.

7. typeorm: Es una herramienta de mapeo objeto-relacional (ORM), permite trabajar con bases de datos utilizando conceptos de programación orientada a objetos en lugar de consultas SQL, nos permitira la gestion de estas de manera eficiente.

8. typeorm-naming-strategies: permite interactuar con identidades de la base de datos que estan escritas con el formato "snake_Case" escribiendolas con el formato "camelCase" configuradola desde la creación de los métodos sin tener tener problemas en el consumo de datos o en las peticiones.

9. typescript: Es la dependencia que nos brindará las funcionalidades de la sintaxis del lenguaje de programación Typescript unicamente funcional dentro del entorno de desarrollo, sin tener la que installar localmente.

Para instalar el uso de postgresql con nodejs:
```
 npm install pg
```

**Dependencias de desarollo necesarias:**

```
npm install -D @types/cors @types/express @types/morgan concurrently nodemon
```

```
npm install --save pg   # Para PostgreSQL
```

```
npm install --save-dev @types/pg 
```

**"Estas dependencias no serán utilizadas en producción, no entran en el package.json"**

<h1> PASO 3 </h1> asegurarse de que typescript se encuentre debidamente instalado con el comando: 
```
tsc -v
``` 
<p1> En caso de que no funcione o aparezca "command not found" utlizar el comando:

```
npm install -g typescript 
```

</p1>
Este comando instalará Typescript de manera global en la computadora. Posteriormene intentar nuevamente ejecutar el comando: 

```
tsc -v
```

Una vez que se asegure de que se instalo correctamente ejecutará el siguente comando: 

```
tsc --init
```

<p1> Este comando generará un archivo de configuración para activar configuraciones de typescript </p1>

<p1> MPORTANTE PARA EL DESARROLLO: el archivo ".gitignore" literalmente ignora todo los archivos que especifiquemos aquí, como por ejemplo dependencias reinstalables, etc **(NO SUBIR VARIBLES DE ENTORNO, EN ESPECIFICO EL ARCHIVO '.env')** </p1>