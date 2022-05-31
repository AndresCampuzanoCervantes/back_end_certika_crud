# Instutivo de implementacion del proyecto BACKEND
 
### `git clone`
lo usamos para clonar el repositorio del proyecto.

### `npm i`
hubicado en la carpeta del proyecto ejecutamos el comando `npm i` para instalar los modulos\
de dependencia para el correcto funcionamiento del proyecto.

### `Configurar archivo .env`
En el siguiente archivo dirigirse a modificar los datos de la instacia por ejemplo:\
`PORT_DATABASE:` indica el puerto donde se encuetra la instacia mysql\
`HOST_DATABASE:` indica el hosting donde se encuentra la instacia mysql\
`USER_DATABAS: ` indica el usuario de la instacia mysql\
`PASSWORD_DATABASE:` indica la contraseña de la instacia\
`SCHEMA_DATABASE:` indica el nombre del esquema de la base de datos de la instacia mysql\

### `Configurar instacia mysql`
en la carpeta sql se encuantra el archivo .sql que debera importar en su instacia de base de datos,\
este archivo ya cuenta con datos de pueba.

### `npm start`
Ejecuta la aplicación en el modo de desarrollo.\
Abra [http://localhost:3010](http://localhost:3010) para verlo en su navegador.

La página se volverá a cargar cuando realice cambios.\x
También puede ver errores en la consola.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.\**
Empaqueta correctamente React en modo de producción y optimiza la compilación para obtener el mejor rendimiento.

La compilación se minimiza y los nombres de archivo incluyen los hashes.\
¡Tu aplicación está lista para ser implementada!