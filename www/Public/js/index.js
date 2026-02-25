/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function loadPartialView(viewName, divClass = null) {
    $.ajax({
      url: "Views/" + viewName + ".html",
      method: "GET",
      success: function (data) {
        $(divClass).html(data);
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar la vista parcial", error);
      },
    });
  }


  function saveLocalStorage(name, value) {
    window.localStorage.setItem(name, value);
    console.log(name + " guardado exitosamente.");
  }
  
  function getLocalStorage(name) {
    try {
      const storedValue = window.localStorage.getItem(name);
  
      // Si no hay valor en localStorage, devolver null
      if (storedValue === null) {
        return null;
      }
  
      // Intentar analizar el valor como JSON
      return JSON.parse(storedValue);
    } catch (e) {
      // Si ocurre un error (por ejemplo, si el valor no es JSON válido), se captura el error
      console.error("Error al recuperar o analizar el valor de localStorage:", e);
      return null;  // Retorna null si ocurre un error
    }
  }
  
  
  function removeLocalStorage(name) {
    window.localStorage.removeItem(name);
    console.log(name + " eliminado exitosamente.");
  }

  //removeLocalStorage("users");

  function GetAllUsers() {
    // Recupera y retorna la lista completa de usuarios
    var users = JSON.parse(window.localStorage.getItem("users")) || [];
    console.log("Usuarios actuales:", users);
    return users;
  }

  function GetaUser(Email) {
    // Recupera la lista de usuarios desde el localStorage o crea un arreglo vacío si no hay usuarios
    var users = JSON.parse(window.localStorage.getItem("users")) || [];
    
    // Busca un usuario con el correo igual al email proporcionado
    return users.find(user => user.email === Email.email) || null;
  }




  function SaveusersComplete(user) {
    // Recupera los usuarios existentes en localStorage
    let users = JSON.parse(window.localStorage.getItem("userscomplete")) || [];
    
    // Agrega el nuevo usuario al arreglo
    users.push(user);
    
    // Guarda el arreglo actualizado en localStorage
    window.localStorage.setItem("userscomplete", JSON.stringify(users));
    console.log("Usuario guardado exitosamente.");
  }

  function GetAllUsersComplete() {
    // Recupera y retorna la lista completa de usuarios
    var users = JSON.parse(window.localStorage.getItem("userscomplete")) || [];
    console.log("Usuarios actuales:", users);
    return users;
  }

  function GetaUserComplete(Email) {
    // Recupera la lista de usuarios desde el localStorage o crea un arreglo vacío si no hay usuarios
    var users = JSON.parse(window.localStorage.getItem("userscomplete")) || [];
    
    // Busca un usuario con el correo igual al email proporcionado
    return users.find(user => user.email === Email.email) || null;
  }

  function Comprobation(Email, Password, Firstname, Lastname, Area, Position) {
    // Recupera la lista de usuarios desde el localStorage o crea un arreglo vacío si no hay usuarios
    var users = JSON.parse(window.localStorage.getItem("userscomplete")) || [];
  
    // Busca un usuario con los parámetros proporcionados
    return users.find(user =>
      user.email === Email &&
      user.password === Password &&
      user.firstname === Firstname &&
      user.lastname === Lastname &&
      user.area === Area &&
      user.position === Position
    ) || null;
  }

  function LoginComprobation(Email, Password) {
    // Recupera la lista de usuarios desde el localStorage o crea un arreglo vacío si no hay usuarios
    var users = JSON.parse(window.localStorage.getItem("userscomplete")) || [];
  
    // Busca un usuario con los parámetros proporcionados
    return users.find(user =>
      user.email === Email &&
      user.password === Password
    ) || null;
  }

  function EditUser (Email, Password, updatedData) {
    // Recupera la lista de usuarios desde el localStorage o crea un arreglo vacío si no hay usuarios
    var users = JSON.parse(window.localStorage.getItem("userscomplete")) || [];

    // Busca el usuario que deseas editar
    const user = users.find(user => user.email === Email);

    // Verifica si el usuario existe y si la contraseña coincide
    if (user && user.password === Password) {
        // Actualiza los datos del usuario
        Object.assign(user, updatedData); // Actualiza los datos del usuario
        window.localStorage.setItem("userscomplete", JSON.stringify(users)); // Guarda la lista actualizada en localStorage
        console.log("Usuario actualizado:", user);
        return user; // Retorna el usuario actualizado
    } else {
        console.log("Usuario no encontrado o contraseña incorrecta");
        return null; // Retorna null si el usuario no existe o la contraseña no coincide
    }
}

  function Savematerials(material) {
    // Recupera los usuarios existentes en localStorage
    let materials = JSON.parse(window.localStorage.getItem("Materials")) || [];
    
    // Agrega el nuevo usuario al arreglo
    materials.push(material);
    
    // Guarda el arreglo actualizado en localStorage
    window.localStorage.setItem("Materials", JSON.stringify(materials));
    console.log("Material guardado exitosamente.");
  }

  function GetAllMaterials() {
    // Recupera y retorna la lista completa de usuarios
    var materials = JSON.parse(window.localStorage.getItem("Materials")) || [];
    return materials;
  }
  

  function AdminUser() {
    var UserAdminComp = {
      email: "Admin",
      password: "Admin",
      firstname: "Admin",
      lastname: "Admin",
      area: "Admin",
      position: "Admin"
    };
  
    // Llamamos a la función 'Comprobation' pasando los valores individuales
    var user = Comprobation(
      UserAdminComp.email,
      UserAdminComp.password,
      UserAdminComp.firstname,
      UserAdminComp.lastname,
      UserAdminComp.area,
      UserAdminComp.position
    ); 
    
    console.log(user); // Verifica si está recuperando correctamente el usuario
    
    // Si no se encuentra el usuario, lo guarda
    if (user === null) {
      SaveusersComplete(UserAdminComp); // Guardamos el nuevo usuario
    }
  }
  
  
  
  AdminUser();

   setInterval(GetAllUsersComplete, 5000);
  // setInterval(GetAllMaterials, 5000);
  // window.localStorage.removeItem("userscomplete");
  // window.localStorage.removeItem("users");
  //window.localStorage.removeItem("Materials");
  //setInterval(removeLocalStorage("userscomplete"), 1000);
function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
