import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import {BackendService} from '../../services/backend.service';
import * as $ from 'jquery';



@Component({
  selector: 'app-limites',
  templateUrl: './limites.component.html',
  styleUrls: ['./limites.component.css']
})
export class LimitesComponent implements OnInit {



  constructor(private backendService: BackendService) {
    this.funcionUno();
  }

  ngOnInit() {

  }

  public funcionUno() {
    this.backendService.limites(0).subscribe(da => {
      $('#conteTable').empty();
      const divisaValor = 1;
      $('#conteTable').append('<table  class="table table-striped" id="limites" >' +
        '<thead>' +
        '<tr>' +
        '<th>contraparte</th>' +
        '<th>Limite Global</th>' +
        '<th>Límite Operaciones Directo</th>' +
        '<th>Límite Operaciones en Reporto</th>' +
        '<th>Límite por Operción</th>' +
        '<th>Límite Mercado de Cambios</th>' +
        '<th>Límite por Operción Mercado de Cambios</th>' +
        '<th></th>' +
        '</tr>' +
        '</thead>' +
        '<tbody id="tableLimites">' +

        '</tbody>' +
        '</table>');
      for (var i = 0; i < da['length']; i++) {

        const globalLimitConverted = ((parseFloat(da[i]['globalLimit'])) * divisaValor) / 1;

        const directOperationLimit = ((parseFloat(da[i]['directOperationLimit'])) * divisaValor) / 1;
        const reportoOperationLimit = ((parseFloat(da[i]['reportoOperationLimit'])) * divisaValor) / 1;
        const operationLimitMoneyMarket = ((parseFloat(da[i]['operationLimitMoneyMarket'])) * divisaValor) / 1;
        const exchangeMarketLimit = ((parseFloat(da[i]['exchangeMarketLimit'])) * divisaValor) / 1;
        const limitOperationExchangeMarket = ((parseFloat(da[i]['limitOperationExchangeMarket'])) * divisaValor) / 1;


        $('#tableLimites').append('<tr  id="' + da[i]['contraparte'] + '">' +
          '<td>' + da[i]['contraparte'] + '</td>' +

          '<td>' + globalLimitConverted.toFixed(2) + '</td>' +
          '<td>' + directOperationLimit.toFixed(2) + '</td>' +
          '<td>' + reportoOperationLimit.toFixed(2) + '</td>' +
          '<td>' + operationLimitMoneyMarket.toFixed(2) + '</td>' +
          '<td>' + exchangeMarketLimit.toFixed(2) + '</td>' +
          '<td>' + limitOperationExchangeMarket.toFixed(2) + '</td>' +


          "<td><a class=\"btn btn-danger btn-xs\" style=\"color: white\" onclick=\"deleteq('"+da[i]['contraparte']+"',this)\">Eliminar</a></td>"+

          '</tr>');



      }


    });
  }




}
