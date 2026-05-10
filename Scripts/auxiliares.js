function analizar() {
    const input = document.getElementById('input').value.trim();
    const output = document.getElementById('output');
    
    if (!input) {
        output.textContent = 'Por favor, ingrese datos de entrada.';
        return;
    }
    
    try {
        const resultado = calcularPedidos(input);
        output.textContent = resultado || 'No se encontraron datos válidos para procesar.';
    } catch (error) {
        output.textContent = 'Error: ' + error.message;
    }
}

function cargarEjemplo() {
    const ejemplo = 'Clothing,Technology--Customer1 Laptop Technology 3000 1 10;Customer2 Shirt Clothing 50 2 12;Customer1 Shoes Clothing 100 1 15;Customer2 Shoes Clothing 200 1 20;Customer3 TV Technology 2500 1 25';
    document.getElementById('input').value = ejemplo;
    analizar();
}

function limpiar() {
    document.getElementById('input').value = '';
    document.getElementById('output').textContent = 'El resultado aparecerá aquí...';
}

// Esto es para cargar el ejemplo en el textarea cuando se carga la página
window.onload = function() {
    cargarEjemplo();
};
