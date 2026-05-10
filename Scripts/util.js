/**
 * Analiza pedidos de comercio electrónico y genera ranking de clientes
 * @param {string} caso - Cadena con registros de compras separados por ;
 * @returns {string} - Ranking de clientes formateado
 */

function calcularPedidos(caso) {
    if (!caso || caso.trim() === '')                        // Complejidad: O(1)
        return '';                                          // Complejidad: O(1)
    
    // Se divide cada registro por el punto y coma
    let registros = caso.split(';').filter(record => record.trim() !== '');     // Complejidad: O(n)
    
    // Se crea el objeto json de clientes
    let clientes = {};                                      // Complejidad: O(1)
    
    // Procesar cada registro
    registros.forEach(registro => {                         // Complejidad: O(n)
        let parts = registro.trim().split(' ');             // Complejidad: O(m)
        if (parts.length < 6) return;                       // Complejidad: O(1)
        
        let customer = parts[0];                            // Complejidad: O(1)
        let product = parts[1];                             // Complejidad: O(1)
        let category = parts[2];                            // Complejidad: O(1)
        let price = parseFloat(parts[3]);                   // Complejidad: O(1)
        let quantity = parseInt(parts[4]);                  // Complejidad: O(1)
        let timestamp = parseInt(parts[5]);                 // Complejidad: O(1)
        
        // Inicializar cliente si no existe
        if (!clientes[customer]) {                          // Complejidad: O(1)
            clientes[customer] = {                          // Complejidad: O(1)
                totalSpent: 0,                              // Complejidad: O(1)
                categories: {}                              // Complejidad: O(1)
            };
        }
        
        // Actualizar total gastado
        let totalPorRegistro = price * quantity;            // Complejidad: O(1)
        clientes[customer].totalSpent += totalPorRegistro;  // Complejidad: O(1)
        
        // Actualizar conteo de categorías
        if (!clientes[customer].categories[category]) {     // Complejidad: O(1)
            clientes[customer].categories[category] = 0;    // Complejidad: O(1)
        }
        clientes[customer].categories[category] += quantity;            // Complejidad: O(1)
    });
    
    // Determinar categoría favorita para cada cliente
    const customerList = Object.keys(clientes).map(customer => {        // Complejidad: O(p) donde
        const customerData = clientes[customer];                        // Complejidad: O(1)
        let favoriteCategory = '';                                      // Complejidad: O(1)
        let maxQuantity = 0;                                            // Complejidad: O(1)
        
        // Encontrar categoría con más compras
        Object.keys(customerData.categories).forEach(category => {      // Complejidad: O(p)
            if (customerData.categories[category] > maxQuantity) {      // Complejidad: O(1)
                maxQuantity = customerData.categories[category];        // Complejidad: O(1)
                favoriteCategory = category;                            // Complejidad: O(1)
            }
        });
        
        return {                                                        // Complejidad: O(1)
            customer: customer,                                         // Complejidad: O(1)
            totalSpent: customerData.totalSpent,                        // Complejidad: O(1)
            favoriteCategory: favoriteCategory                          // Complejidad: O(1)
        };
    });
    
    // Ordenar según los criterios especificados
    customerList.sort((a, b) => {                                       // Complejidad: O(p log p)
        // Criterio 1: Ordenamiento descendente por totalSpent
        if (b.totalSpent !== a.totalSpent) {                            // Complejidad: O(1)
            return b.totalSpent - a.totalSpent;                         // Complejidad: O(1)
        }
        
        // Criterio 2: Ordenamiento descendente por favoriteCategory (alfabético)
        if (b.favoriteCategory !== a.favoriteCategory) {                // Complejidad: O(1)
            return b.favoriteCategory.localeCompare(a.favoriteCategory);    // Complejidad: O(1)
        }
        
        // Criterio 3: Ordenamiento ascendente por customer (alfabético)
        return a.customer.localeCompare(b.customer);                    // Complejidad: O(1)
    });
    
    // Formatear salida
    let result = customerList.map((item, index) => {                    // Complejidad: O(1)
        return `${index + 1}) ${item.customer} ${item.totalSpent} ${item.favoriteCategory}`;    // Complejidad: O(1)
    }).join('\n');                                                      // Complejidad: O(1)
    
    return result;                                                      // Complejidad: O(1)
}

    // Complejidad total: O(n + m + p log p) 
        