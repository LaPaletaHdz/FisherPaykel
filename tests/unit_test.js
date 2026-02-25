
const assert = require('assert');

function validarAcceso(usuario, password, puertoBD) {
    [cite_start]
    if (puertoBD !== 3306 && puertoBD !== 1433) {
        return { 
            autenticado: false, 
            error: "Error de red: Puerto de base de datos no autorizado." 
        };
    }

    [cite_start]
    const credencialesValidas = {
        user: "it_staff_fp",
        pass: "inventory2026"
    };

    if (usuario === credencialesValidas.user && password === credencialesValidas.pass) {
        return { 
            autenticado: true, 
            mensaje: "Acceso concedido. Redirigiendo a módulo de escaneo QR." 
        };
    } else {
        return { 
            autenticado: false, 
            error: "Credenciales inválidas." 
        };
    }
}

[cite_start]
console.log("---------------------------------------------------------");
console.log("EJECUTANDO: Pruebas Unitarias - Caso de Prueba UT01");
console.log("---------------------------------------------------------");

try {
    [cite_start]// Prueba 1: Acceso exitoso con puerto 3306 [cite: 51]
    console.log("Prueba 1: Validando acceso con credenciales y puerto 3306...");
    const res1 = validarAcceso("it_staff_fp", "inventory2026", 3306);
    assert.strictEqual(res1.autenticado, true, "Fallo: Debería haber permitido el acceso.");
    console.log("✅ RESULTADO: Autenticación exitosa.");

    [cite_start]// Prueba 2: Fallo por puerto incorrecto [cite: 51]
    console.log("\nPrueba 2: Validando seguridad por puerto de base de datos...");
    const res2 = validarAcceso("it_staff_fp", "inventory2026", 8080);
    assert.strictEqual(res2.autenticado, false, "Fallo: No debería permitir conexión por puertos no configurados.");
    console.log("✅ RESULTADO: Bloqueo de puerto no autorizado correcto.");

    [cite_start]// Prueba 3: Fallo por credenciales erróneas [cite: 28]
    console.log("\nPrueba 3: Validando rechazo de credenciales incorrectas...");
    const res3 = validarAcceso("usuario_desconocido", "1234", 3306);
    assert.strictEqual(res3.autenticado, false);
    console.log("✅ RESULTADO: Rechazo de acceso no autorizado correcto.");

    console.log("\n---------------------------------------------------------");
    console.log("RESUMEN: Todas las validaciones de UT01 han pasado.");
    console.log("---------------------------------------------------------");
    process.exit(0); [cite_start]// Éxito para el Pipeline [cite: 36]

} catch (error) {
    console.error("\n❌ ERROR EN LA PRUEBA UNITARIA:");
    console.error(error.message);
    process.exit(1); [cite_start]// Falla el Pipeline de CI/CD para evitar errores en producción [cite: 28]
}
