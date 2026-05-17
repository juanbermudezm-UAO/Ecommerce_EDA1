function calcularPedidos(caso) {                              // O(p + m + n log n)
    if (!caso || caso.trim() === '') {                          // O(1)
        return '';                                                 // O(1)
    }

    const separadorIdx = caso.indexOf('--');                      // O(1)
    if (separadorIdx === -1) {                                    // O(1)
        return 'Falta --';                                        // O(1)
    }
    const categoriasPermitidas = caso.substring(0, separadorIdx) // O(p)
        .split(',')                                               // O(p)
        .map(c => c.trim())                                       // O(p)
        .filter(c => c !== '');                                   // O(p)
    const registrosStr = caso.substring(separadorIdx + 2);       // O(1)
    const categoriasSet = new Set(categoriasPermitidas);         // O(p)

    const registros = registrosStr.split(';').filter(r => r.trim() !== ''); // O(m)

    const clientes = {};                                          // O(1)

    registros.forEach(registro => {                               // O(m)
        const partes = registro.trim().split(' ');                // O(1)
        if (partes.length < 6) return;                           // O(1)
        const customer = partes[0];                              // O(1)
        const category = partes[2];                              // O(1)
        if (categoriasSet.size > 0 && !categoriasSet.has(category)) { // O(1)
            throw new Error(`Categoría inválida '${category}' no declarada antes de '--'`); // O(1)
        }
        const price = parseFloat(partes[3]);                     // O(1)
        const quantity = parseInt(partes[4]);                    // O(1)
        const gastoPorRegistro = price * quantity;               // O(1)

        if (!clientes[customer]) {                               // O(1)
            clientes[customer] = {                               // O(1)
                totalSpent: 0,
                categories: {},
                favoriteCategory: '',
                maxCategorySpent: 0
            };
        }

        clientes[customer].totalSpent += gastoPorRegistro;       // O(1)

        clientes[customer].categories[category] =               // O(1)
            (clientes[customer].categories[category] || 0) + gastoPorRegistro;

        if (clientes[customer].categories[category] >           // O(1)
            clientes[customer].maxCategorySpent) {
            clientes[customer].maxCategorySpent =               // O(1)
                clientes[customer].categories[category];
            clientes[customer].favoriteCategory = category;     // O(1)
        }
    });

    const customerList = Object.keys(clientes).map(customer => ({ // O(n)
        customer: customer,
        totalSpent: clientes[customer].totalSpent,
        favoriteCategory: clientes[customer].favoriteCategory
    }));

    customerList.sort((a, b) => {                               // O(n log n)
        if (b.totalSpent !== a.totalSpent)                       // O(1)
            return b.totalSpent - a.totalSpent;
        if (b.favoriteCategory !== a.favoriteCategory)           // O(1)
            return b.favoriteCategory.localeCompare(a.favoriteCategory);
        return a.customer.localeCompare(b.customer);            // O(1)
    });

    return customerList                                         // O(n)
        .map((item, idx) => `${idx + 1}) ${item.customer} ${item.totalSpent} ${item.favoriteCategory}`)
        .join('\n');
}

// Complejidad total:
// O(p) + O(m) + O(m) + O(n) + O(n log n) + O(n)
// = O(p + m + n log n)