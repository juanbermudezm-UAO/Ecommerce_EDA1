/**
 * Analiza pedidos de comercio electrónico y genera ranking de clientes
 * @param {string} caso - Cadena con registros de compras separados por ;
 * @returns {string} - Ranking de clientes formateado
 */

function calcularPedidos(caso) {                                         //O(m nlog n)
    if (!caso || caso.trim() === '') {                                   //O(1)
        return '';
    }

    // ── Parsear formato "categorias--registros" ──────────────────────── O(m)
    const separadorIdx = caso.indexOf('--');
    const registrosStr = separadorIdx !== -1
        ? caso.substring(separadorIdx + 2)
        : caso;

    // ── Dividir registros por ';' ─────────────────────────────────────── O(m)
    const registros = registrosStr.split(';').filter(r => r.trim() !== '');

    const clientes = {};                                                //O(1)

    registros.forEach(registro => {                                     // O(m)
        const parts = registro.trim().split(' ');                       // O(1)
        if (parts.length < 6) return;                                   // O(1)
        const customer = parts[0];                                     // O(1) 
        // parts[1] = product (no se necesita en la salida)
        const category = parts[2];
        const price = parseFloat(parts[3]);                         // O(1)
        const quantity = parseInt(parts[4]);                           // O(1)
        // parts[5] = timestamp (no se necesita en la salida)

        const gastoPorRegistro = price * quantity;                      // O(1)

        // Inicializar cliente si no existe ─────────────────────────── O(1)
        if (!clientes[customer]) {
            clientes[customer] = {
                totalSpent: 0,
                categories: {},
                favoriteCategory: '',
                maxCategorySpent: 0
            };
        }

        // Acumular gasto total del cliente ─────────────────────────── O(1)
        clientes[customer].totalSpent += gastoPorRegistro;

        // Acumular gasto por categoría ─────────────────────────────── O(1) 
        clientes[customer].categories[category] =
            (clientes[customer].categories[category] || 0) + gastoPorRegistro;

        // Actualizar categoría favorita en línea ───────────────────── O(1)
        if (clientes[customer].categories[category] > clientes[customer].maxCategorySpent) {
            clientes[customer].maxCategorySpent = clientes[customer].categories[category];
            clientes[customer].favoriteCategory = category;
        }
    });

    // ── Construir arreglo de clientes ─────────────────────────────────── O(n)
    const customerList = Object.keys(clientes).map(customer => ({
        customer: customer,
        totalSpent: clientes[customer].totalSpent,
        favoriteCategory: clientes[customer].favoriteCategory
    }));

    // ── Ordenar según los tres criterios ────────────────── O(n log n)
    customerList.sort((a, b) => {
        if (b.totalSpent !== a.totalSpent)
            return b.totalSpent - a.totalSpent;                         // Criterio 1
        if (b.favoriteCategory !== a.favoriteCategory)
            return b.favoriteCategory.localeCompare(a.favoriteCategory);// Criterio 2
        return a.customer.localeCompare(b.customer);                    // Criterio 3
    });

    // ── Formatear y retornar resultado ────────────────────────────────── O(n)
    return customerList
        .map((item, idx) => `${idx + 1}) ${item.customer} ${item.totalSpent} ${item.favoriteCategory}`)
        .join('\n');
}

//Calculo Total de la Complejidad:
//O(1) + O(m) + O(m) + O(1) + O(m) + O(n) + O(n log n) + O(n) = O(m) + O(m) + O(m) + O(n) + O(nlogn) + O(n)
// = O(3m + 2n + nlogn) = O(m + nlogn)
