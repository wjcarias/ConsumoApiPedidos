var UrlGetPedidos   = 'http://localhost:80/G7_19/Controller/pedidos.php?op=GetPedidos';
var UrlPostPedido   = 'http://localhost:80/G7_19/Controller/pedidos.php?op=InsertPedido';
var UrlPostUno      = 'http://localhost:80/G7_19/Controller/pedidos.php?op=GetUno';
var UrlPutPedido    = 'http://localhost:80/G7_19/Controller/pedidos.php?op=UpdatePedido';
var UrlDeletePedido = 'http://localhost:80/G7_19/Controller/pedidos.php?op=DeletePedido';   

$(document).ready(function(){
    CargarPedidos();
});

function CargarPedidos(){
    $.ajax({
        url: UrlGetPedidos,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores = '';

            for(i=0; i < MiItems.length; i++ ){
               Valores += '<tr>'+
               '<td>'+ MiItems[i].Id +'</td>' +
               '<td>'+ MiItems[i].Id_Socio +'</td>' +
               '<td>'+ MiItems[i].Fecha_Pedido +'</td>' +
               '<td>'+ MiItems[i].Detalle +'</td>' +
               '<td>'+ MiItems[i].Sub_Total +'</td>' +
               '<td>'+ MiItems[i].Total_ISV +'</td>' +
               '<td>'+ MiItems[i].Total +'</td>' +
               '<td>'+ MiItems[i].Fecha_Entrega +'</td>' +
               '<td>'+ MiItems[i].Estado +'</td>' +
               '<td>'+
                '<button class="btn btn-warning" onclick="CargarPedido('+MiItems[i].Id+')">Editar</button>'+
                '<button class="btn btn-danger" onclick="EliminarPedido('+MiItems[i].Id+')">Eliminar</button>' + 
               '</td>'+               
           '</tr>';
           $('.pedidos').html(Valores);     
            }
        } 
    })
}

function Agregarpedido(){
var datospedido = {
    Id_Socio: $('#Id_Socio').val(),
    Fecha_Pedido: $('#Fecha_Pedido').val(),
    Detalle:$('#Detalle').val(),
    Sub_Total:$('#Sub_Total').val(),
    Total_ISV:$('#Total_ISV').val(),
    Total: $('#Total').val(),
    Fecha_Entrega: $('#Fecha_Entrega').val(),
    Estado:$('#Estado').val()
}
 var datospedidojson= JSON.stringify(datospedido);
 
 $.ajax({
    url:UrlPostPedido,
    type:'POST',
    data:datospedidojson,
    datatype:'JSON',
    contentType:'aplication/json',
    success:function(response){
        console.log(response);
    }
 });
    alert("Pedido agregado exitosamente");
}

function CargarPedido(idpedido){
    var datospedido = {
        Id:idpedido
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url:UrlPostUno,
        type:'POST',
        data:datospedidojson,
        datatype:'JSON',
        contentType:'aplication/json',
        success:function(response){
            var MiItems= response;
            $('#Id_Socio').val(MiItems[0].Id_Socio);
            $('#Fecha_Pedido').val(MiItems[0].Fecha_Pedido);
            $('#Detalle').val(MiItems[0].Detalle);
            $('#Sub_Total').val(MiItems[0].Sub_Total);
            $('#Total_ISV').val(MiItems[0].Total_ISV);
            $('#Total').val(MiItems[0].Total);
            $('#Fecha_Entrega').val(MiItems[0].Fecha_Entrega);
            $('#Estado').val(MiItems[0].Estado);
            var btnactualizar ='<input type="submit" id="btn_actualizar" onclick="ActualizarPedido('+ MiItems[0].Id +')" value="Actualizar Pedido" class="btn btn-primary"></input>';
            $('.button').html(btnactualizar);

        }
     });
} 

function ActualizarPedido(idpedido){
    var datospedido = {
        Id:idpedido,
        Id_Socio: $('#Id_Socio').val(),
        Fecha_Pedido: $('#Fecha_Pedido').val(),
        Detalle:$('#Detalle').val(),
        Sub_Total:$('#Sub_Total').val(),
        Total_ISV:$('#Total_ISV').val(),
        Total: $('#Total').val(),
        Fecha_Entrega: $('#Fecha_Entrega').val(),
        Estado:$('#Estado').val()
    };
     var datospedidojson= JSON.stringify(datospedido);  
     
     $.ajax({
        url:UrlPutPedido,
        type:'PUT',
        data:datospedidojson,
        datatype:'JSON',
        contentType:'aplication/json',
        success:function(response){
            console.log(response);
        }
     });
        alert("Pedido actualizado exitosamente");
}

function EliminarPedido(idpedido){
    var datospedido = {
        Id:idpedido
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url:UrlDeletePedido,
        type:'DELETE',
        data:datospedidojson,
        datatype:'JSON',
        contentType:'aplication/json',
        success:function(response){
            console.log(response);
        }
     });
        alert("Pedido eliminado exitosamente");
}