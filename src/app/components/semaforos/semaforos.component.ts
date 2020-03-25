import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import * as $ from 'jquery';
import {ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {Label} from 'ng2-charts';


@Component({
  selector: 'app-semaforos',
  templateUrl: './semaforos.component.html',
  styleUrls: ['./semaforos.component.css']
})

export class SemaforosComponent implements OnInit {

  private arrayContraparte: string[] = [];
  private arrayLimiteGlobal: number[] = [];
  private arrayLimiteUtilizado: number[] = [];
  private arrayLimiteRestante: number[] = [];
  private arrayContraparte2: string[] = [];
  private arrayLimiteGlobal2: number[] = [];
  private arrayLimiteUtilizado2: number[] = [];
  private arrayLimiteRestante2: number[] = [];
  private arrayContraparte3: string[] = [];
  private arrayLimiteGlobal3: number[] = [];
  private arrayLimiteUtilizado3: number[] = [];
  private arrayLimiteRestante3: number[] = [];


  constructor(private backendService: BackendService) {
    this.getListaSemaforos();
  }

  ngOnInit() {

  }


  public getListaSemaforos() {
    this.backendService.semaforosAlertas(0).subscribe(da => {
      console.log(da);
      $('#spinner').fadeIn();
      $('#conteTableSemaforo').append('<table class="table table-striped" id="semaforo" >' +
        '<thead>' +
        '<tr>' +
        '<th>Contraparte</th>' +
        '<th>Limite Global</th>' +
        '<th>Límite Utilizado</th>' +
        '<th>Límite Restante</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody id="tableSemaforo">' +
        '</tbody>' +
        '</table>');


      for (let i = 0; i < da['length']; i++) {
        const resta = (parseFloat(da[i].globalLimit) - parseFloat(da[i].suma));
        const porcentaje = ((resta * 100) / parseFloat(da[i].globalLimit));
        let clase = '';
        if (porcentaje > 50) {
          clase = 'alert alert-success';
        } else if (porcentaje > 25 && porcentaje < 50) {
          clase = 'alert alert-warning';
        } else {
          clase = 'alert alert-danger';
        }
        $('#tableSemaforo').append('<tr>' +
          '<td>' + da[i].contraparte + '</td>' +
          '<td>' + da[i].globalLimit + '</td>' +
          '<td>' + da[i].suma + '</td>' +
          '<td class="' + clase + '">' + resta + '</td>' +
          '</tr>');
        this.arrayContraparte.push(da[i].contraparte); // Pariente
        this.arrayLimiteGlobal.push(da[i].globalLimit); // Pariente
        this.arrayLimiteUtilizado.push(da[i].suma); // Pariente
        this.arrayLimiteRestante.push(resta); // Pariente
      }
      $('#btnShowGraficaSemaforo').slideDown();
      this.getListaSemaforosOperador();
      $('#spinner').fadeOut();


    });
  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: Label[] = this.arrayContraparte;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [pluginDataLabels];


  barChartData: ChartDataSets[] = [
    {data: this.arrayLimiteGlobal, label: 'Limite Global'},
    {data: this.arrayLimiteUtilizado, label: 'Límite Utilizado'},
    {data: this.arrayLimiteRestante, label: 'Límite Restante'}
  ];

  public getListaSemaforosOperador() {
    this.backendService.semaforosAlertas(1).subscribe(da => {
      $('#conteTableSemaforoUsuario').append('<table class="table table-striped" id="semaforoUsuario" >' +
        '<thead>' +
        '<tr>' +
        '<th>Operador</th>' +
        '<th>Limite Global</th>' +
        '<th>Límite Utilizado</th>' +
        '<th>Límite Restante</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody id="tableSemaforoUsuario">' +
        '</tbody>' +
        '</table>');


      // console.log(da);
      const arrayContraparte = [], arrayLimiteGlobal = [], arrayLimiteUtilizado = [], arrayLimiteRestante = []; // Pariente
      for (let i = 0; i < da['length']; i++) {
        // console.log("....");
        const resta = (parseFloat(da[i].globalLimit) - parseFloat(da[i].suma));
        const porcentaje = ((resta * 100) / parseFloat(da[i].globalLimit));
        let clase = '';
        if (porcentaje > 50) {
          clase = 'alert alert-success';
        } else if (porcentaje > 25 && porcentaje < 50) {
          clase = 'alert alert-warning';
        } else {
          clase = 'alert alert-danger';
        }

        $('#tableSemaforoUsuario').append('<tr>' +
          '<td>' + da[i].contraparte + '</td>' +
          '<td>' + da[i].globalLimit + '</td>' +
          '<td>' + da[i].suma + '</td>' +
          '<td class="' + clase + '">' + resta + '</td>' +
          '</tr>');
        this.arrayContraparte2.push(da[i].contraparte); // Pariente
        this.arrayLimiteGlobal2.push(da[i].globalLimit); // Pariente
        this.arrayLimiteUtilizado2.push(da[i].suma); // Pariente
        this.arrayLimiteRestante2.push(resta); // Pariente
      }
      $('#btnShowGraficaSemaforoUsuario').slideDown();
      // document.getElementById("btnShowGraficaSemaforoUsuario").style.display = "block";
      // $("#spinner").fadeOut();
      // showGraficas(arrayContraparte, 'graficaSemaforoUsuario', arrayLimiteGlobal, arrayLimiteUtilizado, arrayLimiteRestante);//Pariente
      this.getListaSemaforosOperaciones();
    });

  }

  barChartOptions2: ChartOptions = {
    responsive: true,
  };

  barChartLabels2: Label[] = this.arrayContraparte2;
  barChartType2: ChartType = 'bar';
  barChartLegend2 = true;
  barChartPlugins2 = [pluginDataLabels];


  barChartData2: ChartDataSets[] = [
    {data: this.arrayLimiteGlobal2, label: 'Limite Global'},
    {data: this.arrayLimiteUtilizado2, label: 'Límite Utilizado'},
    {data: this.arrayLimiteRestante2, label: 'Límite Restante'}
  ];


  public getListaSemaforosOperaciones() {
    this.backendService.listaSemaforosOperaciones().subscribe(da => {
      $('#conteTableSemaforoOperaciones').append('<table class="table table-striped" id="semaforoOperacion" >' +
        '<thead>' +
        '<tr>' +
        '<th>Mercado</th>' +
        '<th>ID Operación</th>' +
        '<th>Contraparte</th>' +
        '<th>Operador</th>' +
        '<th>Reporto/Directo</th>' +
        '<th>Límite x Operación</th>' +
        '<th>Monto de la Operación</th>' +
        '<th>Límite Restante</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody id="tableSemaforoOperacion">' +
        '</tbody>' +
        '</table>');

      console.log(da);
      const arrayContraparte = [], arrayLimiteGlobal = [], arrayLimiteUtilizado = [], arrayLimiteRestante = []; // Pariente
      for (let i = 0; i < da['length']; i++) {
        const resta = (parseFloat(da[i].reportoDirecto) - parseFloat(da[i].multiplicacion));
        /*	var porcentaje = ((resta*100) / parseFloat(da[i]['globalLimit']));
        var clase = "";
        if(porcentaje > 50 ){
          clase = "alert alert-success";
        }else if(porcentaje > 25 && porcentaje < 50){
          clase = "alert alert-warning";
        }else{
          clase = "alert alert-danger";
        }*/

        $('#tableSemaforoOperacion').append('<tr>' +
          '<td>M Dinero</td>' +
          '<td>' + da[i].idOperacionesDirecto + '</td>' +
          '<td>' + da[i].contraparte + '</td>' +
          '<td>' + da[i].nombre + ' ' + da[i].apellido + '</td>' +
          '<td>' + da[i].directoReporto + '</td>' +
          '<td>' + da[i].reportoDirecto + '</td>' +
          '<td>' + da[i].multiplicacion + '</td>' +
          '<td>' + resta + '</td>' +
          '</tr>');
        this.arrayContraparte3.push(da[i].contraparte); // Pariente
        this.arrayLimiteGlobal3.push(da[i].reportoDirecto); // Pariente
        this.arrayLimiteUtilizado3.push(da[i].multiplicacion); // Pariente
        this.arrayLimiteRestante3.push(resta); // Pariente
      }
      $('#btnShowGraficaSemaforoOperaciones').slideDown();
      $('#spinner').fadeOut();
    });
  }

  barChartOptions3: ChartOptions = {
    responsive: true,
  };

  barChartLabels3: Label[] = this.arrayContraparte3;
  barChartType3: ChartType = 'bar';
  barChartLegend3 = true;
  barChartPlugins3 = [pluginDataLabels];


  barChartData3: ChartDataSets[] = [
    {data: this.arrayLimiteGlobal3, label: 'Límite x Operación'},
    {data: this.arrayLimiteUtilizado3, label: 'Monto de la Operación'},
    {data: this.arrayLimiteRestante3, label: 'Límite Restante'}
  ];

  public showGrafica(idGrafica, idButton) {
    if (document.getElementById(idGrafica).style.display == 'none') {
      document.getElementById(idGrafica).style.display = 'block';
      // document.getElementById(idButton).text = 'Ocultar Grafica';
    } else {
      document.getElementById(idGrafica).style.display = 'none';
      // document.getElementById(idButton).text = 'Mostrar Grafica';
    }

  }


}
