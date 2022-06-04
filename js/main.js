(function(){
    'use strict';
    var regalo = document.getElementById('regalo');
    document.addEventListener('DOMContentLoaded', function(){

        var map = L.map('mapa').setView([24.772897, -107.391119], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([24.772897, -107.391119]).addTo(map)
            .bindPopup('GDLWebCamp 2021 <br> boletos ya disponibles')
            .openPopup()
            .bindTooltip('Un Tooltip')
            .openTooltip();
        //Datos usuario
        var nombre = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var email = document.getElementById('email');

        //Campos pases
        var pase_dia = document.getElementById('pase_dia');
        var pase_dosdias = document.getElementById('pase_dosdias');
        var pase_completo = document.getElementById('pase_completo');

        //botones y divs
        var calcular = document.getElementById('calcular');
        var errorDiv = document.getElementById('error');
        var botonRegistro = document.getElementById('btnRegistro');
        var lista_Productos = document.getElementById('lista-productos');
        var suma = document.getElementById('suma-total');

        //Extras
        var etiquetas = document.getElementById('etiquetas');
        var camisas  = document.getElementById('camisa_evento');

        if(document.getElementById('calcular')){
        calcular.addEventListener('click',calcularMontos);

        pase_dia.addEventListener('blur',mostrarDias);
        pase_dosdias.addEventListener('blur',mostrarDias);
        pase_completo.addEventListener('blur',mostrarDias);


        nombre.addEventListener('blur',validarCampos);
        apellido.addEventListener('blur',validarCampos);
        email.addEventListener('blur',validarCampos);
        email.addEventListener('blur',validarMail);

        function validarCampos(){
            if(this.value == ''){
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = "este campo es obligatorio";
                this.style.border = '1px solid red';
                errorDiv.style.border = '1px solid red';
            }
            else{
                errorDiv.style.display = 'none';
                this.style.border = '1px solid #cccccc';
            }
        }
      
        function validarMail(){
            if(this.value.indexOf("@") > -1) //indexof busca un caracter en una cadena, si no lo encuentra regresa -1
            {
                errorDiv.style.display = 'none';
                this.style.border = '1px solid #cccccc';
            }
            else{
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = "este correo no es valido";
                this.style.border = '1px solid red';
                errorDiv.style.border = '1px solid red';
            }
        }

        function calcularMontos(event){
            event.preventDefault();
           if(regalo.value === ''){
               alert("Debes elegir un regalo");
               regalo.focus();
           }else{
               var boletosDias = parseInt(pase_dia.value,10) || 0,
                    boletosDosDias = parseInt(pase_dosdias.value,10) || 0,
                    boletosCompleto = parseInt(pase_completo.value,10) || 0,
                    cantCamisas = parseInt(camisas.value,10) || 0,
                    cantEtiquetas = parseInt(etiquetas.value,10) || 0;

                var totalPagar = (boletosDias * 30) + (boletosDosDias * 45) + (boletosCompleto * 50) +((cantCamisas * 10) * .93) + (cantEtiquetas * 2);
                console.log(totalPagar);


                var listadoProductos = [];
                if(boletosDias >=1)
                {
                    listadoProductos.push(boletosDias + " Pases por día");
                }
                if(boletosDosDias >=1)
                {
                    listadoProductos.push(boletosDosDias + " Pases por 2 días");
                }
                if(boletosCompleto >=1)
                {
                    listadoProductos.push(boletosCompleto + " Pases completos");
                }

                if(cantCamisas >=1)
                {
                    listadoProductos.push(cantCamisas + " Camisas");
                }
                if(cantEtiquetas >=1)
                {
                    listadoProductos.push(cantEtiquetas + " Etiquetas");
                }
                 lista_Productos.style.display = "block";
                 lista_Productos.innerHTML = '';
                for(var i =0; i<listadoProductos.length;i++)
                {
                    lista_Productos.innerHTML += listadoProductos[i] + '<br/>';
                }
                
                suma.innerHTML = "$ "+totalPagar.toFixed(2); //SOLO 2 DECIMALES

           }
        }

        function mostrarDias(){
            var boletosDias = parseInt(pase_dia.value,10) || 0,
            boletosDosDias = parseInt(pase_dosdias.value,10) || 0,
            boletosCompleto = parseInt(pase_completo.value,10) || 0;

            var diasElegidos = [];
            if(boletosDias >0){
                diasElegidos.push('viernes');
                console.log(diasElegidos);
            }
            if(boletosDosDias >0){
                diasElegidos.push('viernes','sabado');
                console.log(diasElegidos);
            }
            if(boletosCompleto >0){
                diasElegidos.push('viernes','sabado','domingo');
                console.log(diasElegidos);
            }

            for(var i=0; i< diasElegidos.length; i++){
                document.getElementById(diasElegidos[i]).style.display = 'block';
            }

        }
    }
    }); //Dom Content Loaded
})();




$(function(){

    //Lettering
    $('.nombre-sitio').lettering();

    //Menu fijo
    var windowHeight = $(window).height();
    var barraAltura = $('.barra').innerHeight();
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();

        if(scroll > windowHeight){
            $('.barra').addClass('fixed');
            $('body').css({'margin-top': barraAltura+'px'});
        }
        else{
            $('.barra').removeClass('fixed');
            $('body').css({'margin-top': '0px'});
        }
      
    });

    //Menu responsive
    $('.menu-movil').on('click',function(){
        $('.navegacion-principal').slideToggle();
    })


    //Programas de conferencias
    $('.programa-evento .info-curso:first').show();
    $('.menu-programa a:first').addClass('activo');

    $('.menu-programa a').on('click',function(){
        $('.menu-programa a').removeClass('activo');
        $(this).addClass('activo');
        $('.ocultar').hide();

        var enlace = $(this).attr('href');
        $(enlace).fadeIn(1000);
        return false;
    });

    //Animaciones para los numeros

    var resumenLista = $('.resumen-evento');
    if(resumenLista.length > 0){
        $('.resumen-evento').waypoint(function(){
            $('.resumen-evento li:nth-child(1) p').animateNumber({number:6},1200);
            $('.resumen-evento li:nth-child(2) p').animateNumber({number:15},1200);
            $('.resumen-evento li:nth-child(3) p').animateNumber({number:3},1500);
            $('.resumen-evento li:nth-child(4) p').animateNumber({number:9},1500);  
        },{
            offset:'60%'
        }); 
    }

    //Animaciones para contador
    $('.cuenta-regresiva').countdown('2021/03/21 09:00:00',function(event){
        $('#dias').html(event.strftime('%D'));
        $('#horas').html(event.strftime('%H'));
        $('#minutos').html(event.strftime('%M'));
        $('#segundos').html(event.strftime('%S'));
    });

});

