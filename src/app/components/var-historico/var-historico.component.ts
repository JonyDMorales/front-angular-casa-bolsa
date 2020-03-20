import { Component, OnInit } from '@angular/core';
import {BackendService} from '../../services/backend.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-var-historico',
  templateUrl: './var-historico.component.html',
  styleUrls: ['./var-historico.component.css']
})
export class VarHistoricoComponent implements OnInit {

  constructor(private backendService: BackendService) {
    this.mesaDedinero();
  }

  ngOnInit() {
  }

  public mesaDedinero() {
    this.backendService.mesaDeDinero().subscribe((da: any) => {
      console.log(da);
      const selectPorcentajePre = $('#porcentajeSelect').val();
      const selectPorcentajeSplit = selectPorcentajePre[0].split('&');
      const selectPorcentaje = selectPorcentajeSplit[0];
      const selectPorcentajeValor = selectPorcentajeSplit[1];

      if ( da['length'] > 0 ) {

        let html = '';
        let html2 = '';


        html += '<table class="table">';
        html += '<thead class="thead-light">';
        html += '<tr>';
        html += '<th scope="col">#</th>';
        html += '<th scope="col">Producto</th>';
        html += '<th scope="col">' + selectPorcentaje + '%</th>';
        html += '<th scope="col">limite</th>';
        html += '<th scope="col">var-limite</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';

        var porcentajeValues:Array<string> = ['2', '1', '3'];
        let sumaLimites = 0;

        for (let i = 0; i < da['length']; i++) {

          const calculoTempoLimite = parseFloat(da[i].limite) -  parseFloat(porcentajeValues[i]) ;

          html += '<tr>';
          html += ' <th scope="row">' + (i + 1) + '</th>';
          html += '<td>' + da[i]['issue'] + '</td>';
          html += '<td>' + porcentajeValues[i] + '</td>';
          html += '<td>' + da[i]['limite'] + '</td>';

          if ( calculoTempoLimite < 0) {
            html += '<td style="color:red;">' + calculoTempoLimite + '</td>';
          } else {
            html += '<td style="color:green;">' + calculoTempoLimite + '</td>';
          }

          html += '</tr>';

          sumaLimites += da[i]['limite'];

        }

        html += '</tbody>';
        html += '</table>';





        html2 += '<table class="table">';
        html2 += '<thead class="thead-light">';
        html2 += '<tr>';
        html2 += '<th scope="col">Var MD</th>';
        html2 += '<th scope="col">limite Var</th>';
        html2 += '<th scope="col">Var-lm</th>';
        html2 += '</tr>';
        html2 += '</thead>';
        html2 += '<tbody>';

        let sumaVarLm = (sumaLimites) - (selectPorcentajeValor);
        html2 += '<tr>';
        html2 += '<td>' + selectPorcentajeValor + '</td>';
        html2 += '<td>' + sumaLimites + '</td>';

        if ( sumaVarLm < 0 ) {
          html2 += '<td style="color:red;">' + sumaVarLm + '</td>';
        } else {
          html2 += '<td style="color:green;">' + sumaVarLm + '</td>';
        }

        html2 += '</tr>';

        html2 += '</tbody>';
        html2 += '</table>';



        document.getElementById('tableFirst').innerHTML = html;
        document.getElementById('tableSecond').innerHTML = html2;
      }
    });
  }

}
