// Implementa el algoritmo de Luhn para calcular el dígito de comprobación Luhn
function luhn_checksum(code) {
    var len = code.length;  // Obtiene la longitud del código proporcionado
    var parity = len % 2;   // Calcula la paridad basada en la longitud del código
    var sum = 0;            // Inicializa la suma que almacenará la suma de los dígitos

    // Itera sobre cada dígito del código, de derecha a izquierda
    for (var i = len - 1; i >= 0; i--) {
        var d = parseInt(code.charAt(i));  // Convierte el carácter actual a un número entero
        if (i % 2 == parity) { d *= 2; }   // Si el índice es par, multiplica el dígito por 2
        if (d > 9) { d -= 9; }             // Si el dígito es mayor que 9, le resta 9
        sum += d;                          // Agrega el dígito a la suma total
    }

    return sum % 10;  // Devuelve el módulo 10 de la suma total
}

// Calcula el dígito de verificación para un código parcial y lo devuelve
function luhn_calculate(partcode) {
    var checksum = luhn_checksum(partcode + "0");  // Calcula el checksum con un dígito extra "0"
    return checksum == 0 ? 0 : 10 - checksum;      // Devuelve el dígito de verificación
}

// Valida un código completo usando el algoritmo de Luhn
function luhn_validate(fullcode) {
    return luhn_checksum(fullcode) == 0;  // Devuelve true si el checksum es 0, lo que indica un código válido
}

// Función principal para validar la cédula
function validarCedula() {
    // Obtener elementos del DOM
    const cedulaInput = document.getElementById('cedulaInput');
    const resultado = document.getElementById('resultado');
    const spinner = document.getElementById('spinner');
    
    const cedula = cedulaInput.value;  // Obtener el valor actual del campo de entrada de la cédula

    spinner.style.display = 'inline-block';  // Mostrar el spinner de carga

    // Usar un temporizador para simular un retraso en la validación
    setTimeout(() => {
        spinner.style.display = 'none';  // Ocultar el spinner después del tiempo de espera

        // Verificar la longitud de la cédula
        if (cedula.length !== 11) {
            resultado.textContent = "La cédula debe tener 11 dígitos.";  // Mostrar mensaje de error si la longitud no es 11
            resultado.style.color = 'red';  // Cambiar el color del mensaje a rojo
            return false;
        }

        // Validar la cédula usando el algoritmo de Luhn
        if (luhn_validate(cedula)) {
            resultado.textContent = "La cédula es válida.";  // Mostrar mensaje de éxito si la cédula es válida
            resultado.style.color = 'green';  // Cambiar el color del mensaje a verde
            return true;
        } else {
            resultado.textContent = "La cédula no es válida.";  // Mostrar mensaje de error si la cédula no es válida
            resultado.style.color = 'red';  // Cambiar el color del mensaje a rojo
            return false;
        }
    }, 1000);  // Establecer un tiempo de espera de 1000 milisegundos (1 segundo)
}

// Función para limpiar el campo de entrada y el mensaje de resultado
function limpiarCampo() {
    // Obtener elementos del DOM
    const cedulaInput = document.getElementById('cedulaInput');
    const resultado = document.getElementById('resultado');
    
    cedulaInput.value = '';  // Limpiar el campo de entrada de la cédula
    resultado.textContent = '';  // Limpiar el mensaje de resultado
}
