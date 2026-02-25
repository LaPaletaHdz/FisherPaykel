Feature: Control de Inventarios - Inicio de Sesión (UT01)
  Como empleado de IT de Fisher & Paykel
  Quiero acceder a la aplicación
  Para gestionar los materiales del inventario

  Scenario: Inicio de sesión exitoso
    Given El usuario abre la aplicación móvil
    When Ingresa credenciales válidas en el puerto 3306 # Puerto MySQL [cite: 51]
    Then El sistema permite el acceso al escáner de códigos QR [cite: 23]
