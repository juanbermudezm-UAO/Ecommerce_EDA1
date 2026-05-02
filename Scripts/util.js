/**
 * Analiza pedidos de comercio electrónico y genera ranking de clientes
 * @param {string} caso - Cadena con registros de compras separados por ;
 * @returns {string} - Ranking de clientes formateado
 */

function calcularPedidos(caso) {
    if (!caso || caso.trim() === '') {
        return '';
    }
    
    // Se divide cada registro por el punto y coma
    let registros = caso.split(';').filter(record => record.trim() !== '');
    
    // Se crea el objeto json de clientes
    let clientes = {};
    
    // Procesar cada registro
    registros.forEach(registro => {
        let parts = registro.trim().split(' ');
        if (parts.length < 6) return;
        
        let customer = parts[0];
        let product = parts[1];
        let category = parts[2];
        let price = parseFloat(parts[3]);
        let quantity = parseInt(parts[4]);
        let timestamp = parseInt(parts[5]);
        
        // Inicializar cliente si no existe
        if (!clientes[customer]) {
            clientes[customer] = {
                totalSpent: 0,
                categories: {}
            };
        }
        
        // Actualizar total gastado
        let totalPorRegistro = price * quantity;
        clientes[customer].totalSpent += totalPorRegistro;
        
        // Actualizar conteo de categorías
        if (!clientes[customer].categories[category]) {
            clientes[customer].categories[category] = 0;
        }
        clientes[customer].categories[category] += quantity;
    });
    
    // Determinar categoría favorita para cada cliente
    const customerList = Object.keys(clientes).map(customer => {
        const customerData = clientes[customer];
        let favoriteCategory = '';
        let maxQuantity = 0;
        
        // Encontrar categoría con más compras
        Object.keys(customerData.categories).forEach(category => {
            if (customerData.categories[category] > maxQuantity) {
                maxQuantity = customerData.categories[category];
                favoriteCategory = category;
            }
        });
        
        return {
            customer: customer,
            totalSpent: customerData.totalSpent,
            favoriteCategory: favoriteCategory
        };
    });
    
    // Ordenar según los criterios especificados
    customerList.sort((a, b) => {
        // Criterio 1: Ordenamiento descendente por totalSpent
        if (b.totalSpent !== a.totalSpent) {
            return b.totalSpent - a.totalSpent;
        }
        
        // Criterio 2: Ordenamiento descendente por favoriteCategory (alfabético)
        if (b.favoriteCategory !== a.favoriteCategory) {
            return b.favoriteCategory.localeCompare(a.favoriteCategory);
        }
        
        // Criterio 3: Ordenamiento ascendente por customer (alfabético)
        return a.customer.localeCompare(b.customer);
    });
    
    // Formatear salida
    let result = customerList.map((item, index) => {
        return `${index + 1}) ${item.customer} ${item.totalSpent} ${item.favoriteCategory}`;
    }).join('\n');
    
    return result;
}
