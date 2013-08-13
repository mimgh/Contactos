$(function() {
    document.addEventListener("deviceready", function() {
        $('#cBtn').tap(function() {
            var nom = $('#cName').val();
            var ema = $('#cMail').val();
            var tel = $('#cTel').val();
            
            if(nom!='' && ema!='' && tel!='')
                crearContacto(nom, ema, tel);
        });
        $('#btnListar').tap(function() {
            listarContactos();
        });
    }, false);
});


function listarContactos() {
    function onSuccess(contacts) {
        $('#lista').html('');
        for(var i=0; i<contacts.length; i++) {
          $('<li class="forward"><a href="tel:'+contacts[i].phoneNumbers[0].value+'">'+contacts[i].name.formatted+'</a></li>').appendTo('#lista');
        }
        alert(contacts.length);
    };
    function onError(contactError) {
        alert('onError!');
    };
    var options = new ContactFindOptions();
    options.filter = "Mario";
    options.multiple = true;
    var fields = ["*"];
    navigator.contacts.find(fields, onSuccess, onError, options);
}


function crearContacto(nom, ema, tel) {
    var myContact = navigator.contacts.create();
    myContact.displayname = nom
    myContact.nickname = nom
    //  Asignar nombre del Contacto
    var nombre = new ContactName();
    nombre.givenName = nom;
    myContact.name = nombre;
    //  Asignar e-mail del Contacto
    var email = [];
    email[0] = new ContactField("home", ema, true);
    email[1] = new ContactField("work", "ejemplo@algo.com", false);
    myContact.emails = email;
    //  Asignar teléfono del Contacto
    var telefono = [];
    telefono[0] = new ContactField("home", tel, false);
    telefono[1] = new ContactField("work", "222-2222", true);
    myContact.phoneNumbers = telefono;
    //  Guardar Contacto
    myContact.save(function() {
        $('#cName').val('');
        $('#cMail').val('');
        $('#cTel').val('');
        navigator.notification.alert("Contacto creado satisfactoriamente", function() {
            window.location.href = "#home";
        }, "Felicidades", "Aceptar");
    }, function(err) {
        alert(err.code);
    });
}