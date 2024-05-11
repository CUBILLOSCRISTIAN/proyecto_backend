# Backend para Servicio de E-Commerce de Libros 📚💼

¡Bienvenido a mi proyecto de backend para un servicio de e-commerce de libros! En este proyecto, he desarrollado una API robusta que permite a los usuarios vender y comprar libros usados de manera fácil y segura.

## Descripción del Problema Solucionado

Desarrollé este backend para abordar la necesidad de crear un sistema eficiente y seguro para un servicio de e-commerce de libros usados. Permite al usuario listar sus libros, realizar pedidos y gestionar su inventario de manera intuitiva.

## Funcionalidades Principales

- **Modelos Desarrollados**: Usuarios, Libros, Pedidos.
- **Operaciones Básicas de Almacenamiento**:
  - **Create**: Crea una entrada en la base de datos con los datos enviados al backend.
  - **Read**: Permite buscar unidades o cantidades de libros. Filtrado avanzado disponible para usuarios, libros y pedidos.
  - **Update**: Modifica una entrada en la base de datos con los datos enviados al backend.
  - **Delete**: Realiza "soft deletes" para garantizar la seguridad de los datos.

## Endpoints Principales 🎯

- `/users`
- `/books`
- `/orders`

## Consideraciones Importantes 🚨

- Todos los endpoints requieren autenticación de usuario, excepto CREATE de usuario y READ de productos.
- Las operaciones de READ excluyen las entradas inhabilitadas, a menos que se soliciten explícitamente.
- Se requiere autenticación para identificar a los usuarios en operaciones como la creación de pedidos.
- Los pedidos pueden ser cancelados por el usuario que los realizó o completados/cancelados por el usuario que los recibió.
- Al crear un pedido, los libros asociados se eliminan automáticamente, si esté es cancelado, los libros retornan a disponibles nuevamente.
- Un pedido puede contener múltiples libros, todos del mismo usuario.

## Repositorio y Autor 📁✍️

Este proyecto se encuentra alojado en [GitHub](https://github.com/CUBILLOSCRISTIAN/proyecto_backend) y fue desarrollado por mí, `<Cristian Cubillos/>`.

¡Gracias por revisar mi proyecto! 🙌
