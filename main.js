
var CTX;

$(document).ready(function(){
    
    var ctx = document.getElementById("myBarChart");
    
        
    window.grafica = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["2010", "2011", "2012","2013","2014","2015","2016","2017","2018","2019","2020"],
        datasets: [{
        label: "Cantidad",
        backgroundColor: "rgba(2,117,216,1)",
        borderColor: "rgba(2,117,216,1)",
        data: [0,0,0,0,0,0,0,0,0,0,0],
        }],
    },
    options: {
        scales: {
        xAxes: [{
            time: {
            unit: 'year'
            },
            gridLines: {
            display: false
            },
            ticks: {
            maxTicksLimit: 6
            }
        }],
        yAxes: [{
            ticks: {
            min: 0,
            max: 20,
            maxTicksLimit: 3
            },
            gridLines: {
            display: true
            }
        }],
        },
        legend: {
        display: false
        }
    }
    });
   
});

function getCountry(){
    var country="";
    if(document.getElementById('arg').checked){
        return 'ARG';
    }
    else if(document.getElementById('bol').checked){
        return 'BOL';
    }
    else if(document.getElementById('bra').checked){
        return 'BRA';
    }
    else if(document.getElementById('chi').checked){
        
        return 'CHL';
    }
    else if(document.getElementById('col').checked){
        return 'COL';
    }
    else if(document.getElementById('ecu').checked){
        return 'ECU';
    }
    else if(document.getElementById('pry').checked){
        return 'PRY';
    }
    else if(document.getElementById('per').checked){
        return 'PER';
    }
    else if(document.getElementById('ury').checked){
        return 'URY';
    }
    else if(document.getElementById('ven').checked){
        return 'VEN';
    }
    return "";
}

function mostrarData(){
    cantidades =[0,0,0,0,0,0,0,0,0,0,0];
    var name="";
    var pais="";
    var unicoPais = 0;
    var ele0=0.0;
    var ele1=0.0;
    var ele2=0.0;
    var ele3=0.0;
    var ele4=0.0;
    var ele5=0.0;
    var ele6=0.0;
    var ele7=0.0;
    var ele8=0.0;
    var ele9=0.0;
    var ele10=0.0;
    var tam=0;
    var mayor=0;

    var nombre="";

    if(document.getElementById('r1').checked){
        nombre="SH.DYN.AIDS"; 
    }else if(document.getElementById('r2').checked){
        nombre="SP.DYN.SMAM.MA";
    }else if(document.getElementById('r3').checked){
        nombre="SP.DYN.SMAM.FE";
    }else if(document.getElementById('r4').checked){
        nombre="SH.STA.DIAB.ZS";
    }else if(document.getElementById('r5').checked){
        nombre="SH.MED.BEDS.ZS";
    }else if(document.getElementById('r6').checked){
        nombre="SH.TBS.INCD";
    }else if(document.getElementById('r7').checked){
        nombre="SP.DYN.LE00.IN";
    }
    
    if(document.getElementById('todos').checked){
        
        cadena = `https://back-lab2-sd.azurewebsites.net/api/series?seriesCode=${nombre}`;
    }
    else{
        unicoPais=1;
        var country=getCountry();
        cadena = `https://back-lab2-sd.azurewebsites.net/api/seriesCountry?seriesCode=${nombre}&countryCode=${country}`;
        
    }
        
   



    $.ajax({
       
        
       url: cadena,
       type: 'GET',
       dataType: 'json',
       success: function(res){
            let data ='';
            res.forEach(element => {
                name = element.name;
                pais = " en "+element.countryName;
                ele0 = element.age2010;
                ele1 = element.age2011;
                ele2 = element.age2012;
                ele3 = element.age2013;
                ele4 = element.age2014;
                ele5 = element.age2015;
                ele6 = element.age2016;
                ele7 = element.age2017;
                ele8 = element.age2018;
                ele9 = element.age2019;
                ele10 = element.age2020;

                if(ele0==".."){
                    ele0=0;
                }
                if(ele1==".."){
                    ele1=0;
                }
                if(ele2==".."){
                    ele2=0;
                }
                if(ele3==".."){
                    ele3=0;
                }
                if(ele4==".."){
                    ele4=0;
                }
                if(ele5==".."){
                    ele5=0;
                }
                if(ele6==".."){
                    ele6=0;
                }
                if(ele7==".."){
                    ele7=0;
                }
                if(ele8==".."){
                    ele8=0;
                }
                if(ele9==".."){
                    ele9=0;
                }
                if(ele10==".."){
                    ele10=0;
                }

                cantidades[0]=cantidades[0]+parseFloat(ele0);
                cantidades[1]=cantidades[1]+parseFloat(ele1);
                cantidades[2]=cantidades[2]+parseFloat(ele2);
                cantidades[3]=cantidades[3]+parseFloat(ele3);
                cantidades[4]=cantidades[4]+parseFloat(ele4);
                cantidades[5]=cantidades[5]+parseFloat(ele5);
                cantidades[6]=cantidades[6]+parseFloat(ele6);
                cantidades[7]=cantidades[7]+parseFloat(ele7);
                cantidades[8]=cantidades[8]+parseFloat(ele8);
                cantidades[9]=cantidades[9]+parseFloat(ele9);
                cantidades[10]=cantidades[10]+parseFloat(ele10);

               
                


             data+=`
                <tr>
                    <td>${element.name}</td>
                    <td>${element.code}</td>
                    <td>${element.countryName}</td>
                    <td>${element.countryCode}</td>
                    <td>${element.age2010}</td>
                    <td>${element.age2011}</td>
                    <td>${element.age2012}</td>
                    <td>${element.age2013}</td>
                    <td>${element.age2014}</td>
                    <td>${element.age2015}</td>
                    <td>${element.age2016}</td>
                    <td>${element.age2017}</td>
                    <td>${element.age2018}</td>
                    <td>${element.age2019}</td>
                    <td>${element.age2020}</td>
                </tr>
                ` 
                tam=tam+1;  
            });

            for(i=0;i<11;i++){
                if(cantidades[i]/tam>mayor){
                    mayor = cantidades[i]/tam;
                    
                }
            }

            mayor = parseInt(mayor);

            if(mayor<10){
                mayor=10;
            }else if(mayor<20){
                mayor=20;
            }else if(mayor<50){
                mayor=50;
            }
            else if(mayor<100){
                mayor=100;
            }else if(mayor<200){
                mayor=200;
            }else if(mayor<500){
                mayor=500;
            }else if(mayor<1000){
                mayor=1000;
            }else if(mayor<2000){
                mayor=2000;
            }else if(mayor<5000){
                mayor=5000;
            }else if(mayor<10000){
                mayor=10000;
            }else if(mayor<20000){
                mayor=20000;
            }else if(mayor<50000){
                mayor=50000;
            }else if(mayor<100000){
                mayor=100000;
            }else if(mayor<200000){
                mayor=200000;
            }else if(mayor<500000){
                mayor=500000;
            }else{
                mayor=1000000;
            }


            $('#tbody').html(data);
            $('#numTotal').html(`<p>Numero de elementos: ${tam}</p>`);
            if(unicoPais==0){
                $('#nombreConsulta').html(`<i class="fas fa-chart-bar me-1"></i>Consulta: ${name}`);
            }
            else{
                $('#nombreConsulta').html(`<i class="fas fa-chart-bar me-1"></i>Consulta: ${name}${pais}`);
            }
            
          // Set new default font family and font color to mimic Bootstrap's default styling
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';

       
    // Bar Chart Example
 
    CTX = document.getElementById('myBarChart').getContext('2d');
    if (window.grafica) {
        window.grafica.clear();
        window.grafica.destroy();
    }
    //window.grafica = new Chart(ctx, {/* Opciones aquí */});
        var ctx = document.getElementById("myBarChart");
    
        
    window.grafica = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["2010", "2011", "2012","2013","2014","2015","2016","2017","2018","2019","2020"],
        datasets: [{
        label: "Cantidad",
        backgroundColor: "rgba(2,117,216,1)",
        borderColor: "rgba(2,117,216,1)",
        data: [cantidades[0]/tam,cantidades[1]/tam,cantidades[2]/tam,cantidades[3]/tam,cantidades[4]/tam,cantidades[5]/tam,cantidades[6]/tam,cantidades[7]/tam,cantidades[8]/tam,cantidades[9]/tam,cantidades[10]/tam],
        }],
    },
    options: {
        scales: {
        xAxes: [{
            time: {
            unit: 'year'
            },
            gridLines: {
            display: false
            },
            ticks: {
            maxTicksLimit: 6
            }
        }],
        yAxes: [{
            ticks: {
            min: 0,
            max: mayor,
            maxTicksLimit: 3
            },
            gridLines: {
            display: true
            }
        }],
        },
        legend: {
        display: false
        }
    }
    });
    
   
            

       }
       

    })
}