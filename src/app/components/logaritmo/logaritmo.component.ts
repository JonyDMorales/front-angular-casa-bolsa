import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-logaritmo',
  templateUrl: './logaritmo.component.html',
  styleUrls: ['./logaritmo.component.css']
})
export class LogaritmoComponent implements OnInit {

  constructor(private backendService: BackendService) {}

  ngOnInit() {
  }

  public logaritmo() {
    $('#spinner').fadeIn();
    let tasa = $('#tasaMercado').val();
    if (tasa === '') {
      tasa = 0;
    }

    let obj = {
      descripcion : $('#producto').val(),
      tasa : tasa,
      fecha : $('#fecha').val()
    };
    let myjson = JSON.stringify(obj);

    this.backendService.logaritmo(myjson).subscribe(response => {
        $('#conteLog').empty();
        if (response['length'] > 0) {
          for (let i = 0; i < response['length']; i++) {
            let suma = parseFloat(<string> (tasa)) + parseFloat((response[i].logaritmo));
            $('#conteLog')
              .append(
                '<div>'
                + '<div class="col-sm-6" style="display: inline-table;">'
                + response[i].logaritmo
                + '</div>'
                + '<div class="col-sm-6" style="display: inline-table;">'
                + suma + '</div></div>');

          }
        } else {
          $('#conteLog').append(
            '<center><h2>Sin Resultados</h2></center>');
        }
        $('#spinner').fadeOut();
    });
  }


}
