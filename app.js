

// Pegar aquí tu apikey o CDN de firebase
const firebaseConfig = {
    apiKey: "AIzaSyDdxWIviwXPB1SjNXBQ6Mw0mBGYPcfaTrs",
    authDomain: "pagina-web-2198e.firebaseapp.com",
    projectId: "pagina-web-2198e",
    storageBucket: "pagina-web-2198e.appspot.com",
    messagingSenderId: "350227880317",
    appId: "1:350227880317:web:d1a85d1d035e94f4905414",
    measurementId: "G-QPSKX7ZMFN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


// Llamando al DOM o al HTML
const btnRegistrar = document.getElementById('btnCrearCuenta');
const btnIngresar = document.getElementById('btnIniciarSesion');
const formulario = document.getElementById('formulario');
const contenidoDelaweb = document.getElementById('contenidoDelaweb');
const btnCerarSesion = document.getElementById('btnCerarSesion');
const btnGoogle = document.getElementById('btngoogle');
const btnfacebook = document.getElementById('btnfacebook');
let txtTitulo = document.getElementById('txtTitulo');
let txtDescripcion = document.getElementById('txtDescripcion')
const btnPublicar = document.getElementById('btnPublicar');
const verDatosEnPantalla = document.getElementById('verDatosEnPantalla')



//a los botones se les pone const no cambia de valor//
// Función Regístrate o Crear cuenta nueva
    btnRegistrar.addEventListener('click', () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    console.log("se registro correctamente");
    console.log(email);
    console.log(password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            console.log("Inicio de sesión correcto");
            cargarJSON();
            formulario.classList.replace('mostrar', 'ocultar');
            contenidoDelaweb.classList.replace('ocultar', 'mostrar');
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            console.log(errorMessage);
            // ..

        });

});

// Función Iniciar sesión
    btnIniciarSesion.addEventListener('click', () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log("Inicio sesion correctamente")
            cargarJSON();
            verDatosEnPantallaTexto();
            formulario.classList.replace('mostrar', 'ocultar');
            contenidoDelaweb.classList.replace('ocultar', 'mostrar');
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error al inicio secion"); 
            alert(errorMessage);

        });
});

// Función Cerrar Sesión
btnCerarSesion.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log('cerrar sesion correctamente')
        contenidoDelaweb.classList.replace('mostrar', 'ocultar');
        formulario.classList.replace('ocultar', 'mostrar');
    }).catch((error) => {
        // An error happened.
        console.log("error");
    });
})
//funcion estado de usuario
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        cargarJSON();
        var uid = user.uid;
        contenidoDelaweb.classList.replace('ocultar', 'mostrar');
        formulario.classList.replace('mostrar', 'ocultar');
        //...
    } else {
        contenidoDelaweb.classList('mostrar', 'ocultar');
        formulario.classList.replace('ocultar', 'mostrar');
    }
});

/*funcion de google*/
btnGoogle.addEventListener('click', () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            console.log("la sesion con google se realizo")
            cargarJSON();
            imprimirDatosEnPantalla();
            var user = result.user;

        }).catch((error) => {
            var errorMessage = error.message;
            alert(errorMensaje);
            var email = error.email;
            var credential = error.credential;
            console.log("error al enlazar  con Google");

        });
})
//funcion Facebook
btnfacebook.addEventListener('click', () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;

            console.log("La sesion de fasebook se realizo")

        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessege);
            console.log("error en el enlace de fasebook")
        });
})
//funcion jalar datos de json

function cargarJSON() {
    fetch("main.json")
        .then(function (res) {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            let html = '';
            data.forEach((productos) => {
                html += `
         <div class="producto" >
          <p>${productos.Origen}</p>
          <p>${productos.Tipico}</p>
          <img src="${productos.img}" width="50px" class="imgProducto">
          <strong> S/.${productos.Region} </strong>
        </div>
      `;
            })
            document.getElementById('resultado').innerHTML = html;
        })
}
// funcion Agregar datos de firestore
btnPublicar.addEventListener('click', () => {
    db.collection("comentarios").add({
        titulo: txtTitulo = document.getElementById('txtTitulo').value,
        descripcion: txtDescripcion = document.getElementById('txtDescripcion').value,
    })
        .then((docRef) => {
            console.log("Se guardó correctamente");
            verDatosEnPantalla();
        })
        .catch((error) => {
            console.error("Error al Guardar");
        });
})


//funcion leer datos de firestore
function verDatosEnPantallaTexto() {
    db.collection("comentarios").get().then((querySnapshot) => {
        let html = '';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.data().titulo}`);
            console.log(`${doc.data().descripcion}`);
            var listarDatos = `
       
               <li class="listarDatos"> 
                    <h5 class="listarDatosH5"> ${doc.data().titulo} </h5>
                    <p> ${doc.data().descripcion} </p>
               </li>
            `;
            html += listarDatos;
        }); document.getElementById('verDatosEnPantalla').innerHTML = html;
    });
}




