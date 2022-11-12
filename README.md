# Prueba Técnica Full Stack

## Diagrama del ejercicio

![Diagrama del ejercicio](diagrama.png)

> [Enunciado](https://cs1.ssltrust.me/s/YeaQjE8XFljaMxv)

> [API desplegada](https://toolbox-challenge-api.vercel.app/api/files/data)

> [Frontend desplegado](https://toolbox-challenge.vercel.app)

## Herramientas

El repositorio es un monorepo que incluye el backend (`packages/api`) y el frontend (`packages/app`).

En el backend se utilizó:

- [express](https://expressjs.com/es/)
- [nodemon](https://nodemon.io/) - para reiniciar el servidor automaticámente cuando hay cambios en los archivos
- [node-fetch](https://www.npmjs.com/package/node-fetch) - para llamar a la API externa
- [chai](https://www.chaijs.com/) - para el test del servidor
- [mocha](https://mochajs.org/) - para el test del servidor

En el frontend se utilizó:
- [react](https://es.reactjs.org/)
- [vite](https://vitejs.dev/) - para transpilar y empaquetar el jsx de react
- [bootstrap](https://getbootstrap.com/) y [react-bootstrap](https://vitejs.dev/) - para estilar
- [redux-toolkit](https://redux-toolkit.js.org/) - para el manejo de estados globales
- [jest](https://jestjs.io/) - para los tests unitarios

> Se desarrolló usando node v16.18.0.

## Desarrollo en local

1. Clonar o [forkear](https://github.com/marsidev/toolbox-challenge/fork) el repositorio
2. `npm install`
3. `npm run dev`

> El frontend se ejecuta en el puerto [3000](http://localhost:3000/)

> La API se ejecuta en el puerto [3001](http://localhost:3001/api/files/data)
