$(document).ready(function() {
    var idrandom1 = Math.floor(Math.random() * 99999999);
    var idrandom2 = Math.floor(Math.random() * 9999);
    var idrandom3 = Math.floor(Math.random() * 999);
    var idrandom4 = Math.floor(Math.random() * 9999);
    var idrandom5 = Math.floor(Math.random() * 999999999999);

    var idrandom = idrandom1 + "-" + idrandom2 + "-4" + idrandom3 + "-" + idrandom4 + "-" + idrandom5;


    $("#ocultar").click(function() {

        document.getElementById("chat").style.display = 'none';
        document.getElementById("mostrar").style.display = 'block';
    });

    $("#mostrar").click(function() {

        document.getElementById("chat").style.display = 'block';
        document.getElementById("ocultar").style.display = 'block';
        document.getElementById("mostrar").style.display = 'none';
    });

    $(document)
        .one('focus.autoExpand', 'textarea.autoExpand', function() {
            var savedValue = this.value;
            this.value = '';
            this.baseScrollHeight = this.scrollHeight;
            this.value = savedValue;
        })
        .on('input.autoExpand', 'textarea.autoExpand', function() {
            var minRows = this.getAttribute('data-min-rows') | 0,
                rows;
            this.rows = minRows;
            rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
            this.rows = minRows + rows;
        });

    function createButton(elMsgTemplate, item) {
        var elBtnTemplate = $("#template-button").clone();
        elBtnTemplate.removeAttr('id').removeClass('d-none');
        elBtnTemplate.find('button').html(item.title);
        elBtnTemplate.on("click", function() {
            Opciones(item.value);
        })
        elMsgTemplate.find('.btn-section').append(elBtnTemplate);
    }

    function sendMsg(e) {

        var mensajellenar = $('#mensajeCLI').val();

        $("#mensajeCLI").val("");
        if (mensajellenar.length != 0) {

            var textoCLI = mensajellenar;
            var hora = new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

            var divCLI = $("#template").clone();


            var elMsgTemplatecli = $("#template").clone();
            elMsgTemplatecli.removeAttr('id').removeClass('d-none');
            elMsgTemplatecli.find('.horaenvio').html(hora);
            elMsgTemplatecli.find('.msgenvio').html(textoCLI);

            elMsgTemplatecli.find('.comentariobot').addClass('d-none');
            $("#respuestasbot").append(elMsgTemplatecli);

            ////////////// FALTA PASAR LOS VALORES (INSTALAR EL "Web Server for Chrome" DEL Chrome web store)
            document.getElementById("cargando").style.display = 'block';
            var posicion = $("#scrollfocus").offset().top;
            $(".card-body.comments-main").animate({
                scrollTop: $(".p-0").height()
            }, 2000);
            $.ajax({
                type: 'POST',
                url: "https://api.us-south.apiconnect.appdomain.cloud/caja-arequipa-apic-dev/desarrollo/chatbot/message",
                headers: { "Content-Type": "application/json", "x-ibm-client-id": "5211d0a0-594b-404f-af6c-bb154abcc631", "cache-control": "no-cache" },
                dataType: "json",
                data: '{"clientId":"' + idrandom + '","mensaje":"' + mensajellenar + '","plataforma":"web"}',
                success: function(data) {

                    var respuestaCA = data.text || '';
                    var respuestaCATitulo = data.tituloOptions || '';
                    var respuestaCAOpcion = data.options || [];

                    var elMsgTemplate = $("#template").clone();
                    elMsgTemplate.removeAttr('id').removeClass('d-none');
                    elMsgTemplate.find('.divrespuestacli').addClass('d-none');

                    var horaRecibido = new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
                    elMsgTemplate.find('.horabot').html(horaRecibido);

                    if (respuestaCA !== undefined && respuestaCATitulo !== undefined && respuestaCAOpcion !== undefined) {
                        elMsgTemplate.find('.respuestaCA').html(respuestaCA);
                        elMsgTemplate.find('.respuestaCATitulo').html(respuestaCATitulo);

                        if (respuestaCAOpcion.length > 0) {
                            elMsgTemplate.find('.textoseleccione').removeClass('d-none').html('Seleccione una de estas opciones');
                            $.each(respuestaCAOpcion, function(index, item) {
                                createButton(elMsgTemplate, item);
                            });
                        }
                    } else if (respuestaCA) {
                        elMsgTemplate.find('.respuestaCA').addClass('d-none');
                        elMsgTemplate.find('.respuestaCATitulo').html(respuestaCA);
                    } else {
                        elMsgTemplate.find('.respuestaCA').addClass('d-none');
                        elMsgTemplate.find('.respuestaCATitulo').html(respuestaCATitulo);
                        $.each(respuestaCAOpcion, function(index, item) {
                            createButton(elMsgTemplate, item);
                        });
                    }


                    document.getElementById("cargando").style.display = 'none';
                    $("#respuestasbot").append(elMsgTemplate);
                    var posicion = $("#scrollfocus").offset().top;
                    $(".card-body.comments-main").animate({
                        scrollTop: $(".p-0").height()
                    }, 2000);



                }

            });

        }
    }

    $('#ejecutar').click(sendMsg);



    $("#mensajeCLI").keypress(function(e) {
        if (e.which == 13) {
            sendMsg(e);
        }
    });
    ///////////////////////////////////////
    $(document).ready(function() {


        var mensajellenar = $('#mensajeCLI').val();
        var textoCLI = mensajellenar;
        var hora = new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

        var divCLI = $("#template").clone();
        document.getElementById("cargando").style.display = 'block';


        $.ajax({
            type: 'POST',
            url: "https://api.us-south.apiconnect.appdomain.cloud/caja-arequipa-apic-dev/desarrollo/chatbot/message",
            headers: { "Content-Type": "application/json", "x-ibm-client-id": "5211d0a0-594b-404f-af6c-bb154abcc631" },
            dataType: "json",
            data: '{"clientId":"' + idrandom + '","mensaje":"hola","plataforma":"web"}',
            success: function(data) {


                var respuestaCA = data.text || '';
                var respuestaCATitulo = data.tituloOptions || '';
                var respuestaCAOpcion = data.options || [];

                var elMsgTemplate = $("#template").clone();
                elMsgTemplate.removeAttr('id').removeClass('d-none');
                elMsgTemplate.find('.divrespuestacli').addClass('d-none');
                elMsgTemplate.find('.horaenvio').addClass('d-none');
                elMsgTemplate.find('.msgenvio').addClass('d-none');
                var horaRecibido = new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
                elMsgTemplate.find('.horabot').html(horaRecibido);

                if (respuestaCA !== undefined && respuestaCATitulo !== undefined && respuestaCAOpcion !== undefined) {
                    elMsgTemplate.find('.respuestaCA').html(respuestaCA);
                    elMsgTemplate.find('.respuestaCATitulo').html(respuestaCATitulo);

                    if (respuestaCAOpcion.length > 0) {
                        elMsgTemplate.find('.textoseleccione').removeClass('d-none').html('Seleccione una de estas opciones');
                        $.each(respuestaCAOpcion, function(index, item) {
                            createButton(elMsgTemplate, item);
                        });
                    }
                } else if (respuestaCA) {
                    elMsgTemplate.find('.respuestaCA').addClass('d-none');
                    elMsgTemplate.find('.respuestaCATitulo').html(respuestaCA);
                } else {
                    elMsgTemplate.find('.respuestaCA').addClass('d-none');
                    elMsgTemplate.find('.respuestaCATitulo').html(respuestaCATitulo);
                    $.each(respuestaCAOpcion, function(index, item) {
                        createButton(elMsgTemplate, item);
                    });
                }


                document.getElementById("cargando").style.display = 'none';
                $("#respuestasbot").append(elMsgTemplate);
                var posicion = $("#scrollfocus").offset().top;
                $(".card-body.comments-main").animate({
                    scrollTop: $(".p-0").height()
                }, 2000);



            }

        });
    });


    function Opciones(e) {
        var mensajellenar = $('#mensajeCLI').val();
        var textoCLI = mensajellenar;
        var hora = new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

        var divCLI = $("#template").clone();
        document.getElementById("cargando").style.display = 'block';


        $.ajax({
            type: 'POST',
            url: "https://api.us-south.apiconnect.appdomain.cloud/caja-arequipa-apic-dev/desarrollo/chatbot/message",
            headers: { "Content-Type": "application/json", "x-ibm-client-id": "5211d0a0-594b-404f-af6c-bb154abcc631" },
            dataType: "json",
            data: '{"clientId":"' + idrandom + '","mensaje":"' + e + '","plataforma":"web"}',
            success: function(data) {


                var respuestaCA = data.text || '';
                var respuestaCATitulo = data.tituloOptions || '';
                var respuestaCAOpcion = data.options || [];

                var elMsgTemplate = $("#template").clone();
                elMsgTemplate.removeAttr('id').removeClass('d-none');
                elMsgTemplate.find('.divrespuestacli').addClass('d-none');
                elMsgTemplate.find('.horaenvio').addClass('d-none');
                elMsgTemplate.find('.msgenvio').addClass('d-none');
                var horaRecibido = new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
                elMsgTemplate.find('.horabot').html(horaRecibido);

                if (respuestaCA !== undefined && respuestaCATitulo !== undefined && respuestaCAOpcion !== undefined) {
                    elMsgTemplate.find('.respuestaCA').html(respuestaCA);
                    elMsgTemplate.find('.respuestaCATitulo').html(respuestaCATitulo);

                    if (respuestaCAOpcion.length > 0) {
                        elMsgTemplate.find('.textoseleccione').removeClass('d-none').html('Seleccione una de estas opciones');
                        $.each(respuestaCAOpcion, function(index, item) {
                            createButton(elMsgTemplate, item);
                        });
                    }
                } else if (respuestaCA) {
                    elMsgTemplate.find('.respuestaCA').addClass('d-none');
                    elMsgTemplate.find('.respuestaCATitulo').html(respuestaCA);
                } else {
                    elMsgTemplate.find('.respuestaCA').addClass('d-none');
                    elMsgTemplate.find('.respuestaCATitulo').html(respuestaCATitulo);
                    $.each(respuestaCAOpcion, function(index, item) {
                        createButton(elMsgTemplate, item);
                    });
                }


                document.getElementById("cargando").style.display = 'none';
                $("#respuestasbot").append(elMsgTemplate);
                var posicion = $("#scrollfocus").offset().top;
                $(".card-body.comments-main").animate({
                    scrollTop: $(".p-0").height()
                }, 2000);



            }

        });
    }

});