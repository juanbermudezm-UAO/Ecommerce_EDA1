# Ecommerce_EDA1
Proyecto final de Estructuras de Datos y Algoritmos 1 // Final Project for Data Structures and Algorithms 1 

# Análisis de Pedidos en Comercio Electrónico

Este proyecto consiste en una solución en JavaScript para procesar y analizar registros de transacciones de comercio electrónico. El objetivo es calcular el gasto total por cliente, identificar su categoría favorita y generar un ranking basado en criterios específicos de negocio.

## 📋 Descripción

El sistema procesa volúmenes de datos donde cada transacción incluye:
- **Customer**: Identificador del cliente.
- **Product**: Nombre del producto.
- **Category**: Categoría del producto.
- **Price**: Valor unitario.
- **Quantity**: Cantidad comprada.
- **Timestamp**: Momento de la compra.

## ⚙️ Especificaciones Técnicas

### Formato de Entrada
La entrada es una cadena de texto con registros separados por punto y coma (`;`). Cada registro contiene los datos separados por espacios:

`customer product category price quantity timestamp`

**Ejemplo:**
`Customer1 Laptop Technology 3000 1 10;Customer2 Shirt Clothing 50 2 12;Customer1 Mouse Technology 100 1 15`

### Criterios de Ordenamiento
Los resultados se ordenan siguiendo esta jerarquía:
1.  **Gasto Total (descendente)**: De mayor a menor dinero gastado (`price * quantity`).
2.  **Categoría Favorita (descendente)**: Alfabéticamente de la Z a la A en caso de empate en gasto.
3.  **Cliente (ascendente)**: Alfabéticamente de la A a la Z en caso de que persista el empate.

