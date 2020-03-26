import {Component, OnInit, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {BackendService} from '../../services/backend.service';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

declare let alertify: any;

@Component({
  selector: 'app-limites',
  templateUrl: './limites.component.html',
  styleUrls: ['./limites.component.css']
})
export class LimitesComponent implements OnInit {
  limites: any = [];
  headElements = [];
  divisaGlobal = '';
  isVisible: boolean = false;


  constructor(private backendService: BackendService) {

  }

  ngOnInit() {
    this.cambioDivisasMethod('contraparte');
  }


  public getLista(tipo, divisaValor) {


    let tipoEnvio;

    if (tipo == 'contraparte') {
      tipoEnvio = 0;
    } else {
      tipoEnvio = 1;
    }

    this.limites = [];


    this.backendService.limites(tipoEnvio).subscribe(da => {

      if (tipo == 'contraparte') {

        this.headElements = ['Contraparte', 'Limite Global', 'Límite Operaciones Directo', 'Límite Operaciones en Reporto', 'Límite por Operción', 'Límite Mercado de Cambios', 'Límite por Operción Mercado de Cambios', '', ''];

        for (var i = 0; i < da['length']; i++) {


          const contraparte = da[i]['contraparte'];
          const globalLimitConverted = ((parseFloat(da[i]['globalLimit'])) * divisaValor) / 1;

          const directOperationLimit = ((parseFloat(da[i]['directOperationLimit'])) * divisaValor) / 1;
          const reportoOperationLimit = ((parseFloat(da[i]['reportoOperationLimit'])) * divisaValor) / 1;
          const operationLimitMoneyMarket = ((parseFloat(da[i]['operationLimitMoneyMarket'])) * divisaValor) / 1;
          const exchangeMarketLimit = ((parseFloat(da[i]['exchangeMarketLimit'])) * divisaValor) / 1;
          const limitOperationExchangeMarket = ((parseFloat(da[i]['limitOperationExchangeMarket'])) * divisaValor) / 1;

          this.limites.push({
            contraparte: contraparte,
            globalLimit: globalLimitConverted.toFixed(2),
            directOperationLimit: directOperationLimit.toFixed(2),
            reportoOperationLimit: reportoOperationLimit.toFixed(2),
            operationLimitMoneyMarket: operationLimitMoneyMarket.toFixed(2),
            exchangeMarketLimit: exchangeMarketLimit.toFixed(2),
            limitOperationExchangeMarket: limitOperationExchangeMarket.toFixed(2),
            editable: false
          });

        }
      } else {


        this.headElements = ['Operador', 'Limite Global', 'Límite Operaciones Directo', 'Límite Operaciones en Reporto', 'Límite por Operción', 'Límite Mercado de Cambios', 'Límite por Operción Mercado de Cambios', '', ''];

        for (var i = 0; i < da['length']; i++) {


          const contraparte = da[i]['contraparte'];
          const globalLimitConverted = ((parseFloat(da[i]['globalLimit'])) * divisaValor) / 1;

          const directOperationLimit = ((parseFloat(da[i]['directOperationLimit'])) * divisaValor) / 1;
          const reportoOperationLimit = ((parseFloat(da[i]['reportoOperationLimit'])) * divisaValor) / 1;
          const operationLimitMoneyMarket = ((parseFloat(da[i]['operationLimitMoneyMarket'])) * divisaValor) / 1;
          const exchangeMarketLimit = ((parseFloat(da[i]['exchangeMarketLimit'])) * divisaValor) / 1;
          const limitOperationExchangeMarket = ((parseFloat(da[i]['limitOperationExchangeMarket'])) * divisaValor) / 1;

          this.limites.push({
            contraparte: contraparte,
            globalLimit: globalLimitConverted.toFixed(2),
            directOperationLimit: directOperationLimit.toFixed(2),
            reportoOperationLimit: reportoOperationLimit.toFixed(2),
            operationLimitMoneyMarket: operationLimitMoneyMarket.toFixed(2),
            exchangeMarketLimit: exchangeMarketLimit.toFixed(2),
            limitOperationExchangeMarket: limitOperationExchangeMarket.toFixed(2)
          });

        }


      }
      console.log(this.limites);
    });
  }

  public deleteq(id) {
    Swal.fire({
      title: '¿Esta seguro de querer eliminar la contraparte?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.backendService.deleteq(id).subscribe(da => {

          for (let i = 0; i < this.limites.length; ++i) {
            if (this.limites[i].contraparte === id) {
              this.limites.splice(i, 1);
            }
          }
        });
      }
    });

  }

  public cambio() {

    var tipo = $('#selectTipo').val();

    $('#contraparte').attr('placeholder', '' + tipo + '');


    this.cambioDivisasMethod(tipo);

  }

  public cambioDivisa() {

    var tipo = $('#selectTipo').val();
    this.cambioDivisasMethod(tipo);

  }

  public cambioDivisasMethod(tipo) {

    var tipoDivisas = $('#selectDivisas').val();
    var divisaValor = '';
    console.log('metodo onload');

    if (tipoDivisas == 'MXN') {
      divisaValor = '1';
    } else if (tipoDivisas == 'US') {
      divisaValor = '0.053';
    }


    this.backendService.divisas(tipoDivisas).subscribe(da => {
      this.divisaGlobal = divisaValor;
      this.getLista(tipo, divisaValor);

    });


  }

  public cancelar() {

    $('#add').css('display', 'none');
    $('#btnAgregar').slideDown('slow');


  }

  public addRow() {

    $('#btnAgregar').slideUp('slow');
    $('#add').css('display', 'block');

  }


  public insert() {


    var validacionLimiteGlobal = (parseInt($('#directOperationLimit').val().toString())) + (parseInt($('#reportoOperationLimit').val().toString())) + (parseInt($('#exchangeMarketLimit').val().toString()));
    console.log(validacionLimiteGlobal);
    var validacionOperacionMercadoMoney = (parseInt($('#directOperationLimit').val().toString())) + (parseInt($('#reportoOperationLimit').val().toString()));
    console.log(validacionOperacionMercadoMoney);
    var validacionOperacionMercadoCambios = (parseInt($('#exchangeMarketLimit').val().toString()));
    console.log(validacionOperacionMercadoCambios);

    var uno = $('#contraparte').val();


    if ($('#contraparte').val() == '') {
      alertify.set('notifier', 'position', 'bottom-left');
      alertify.error('Campo contraparte es necesario');

    } else if ($('#globalLimit').val() == '') {
      alertify.set('notifier', 'position', 'bottom-left');
      alertify.error('Campo limite global es necesario');

    } else if ($('#directOperationLimit').val() == '') {
      alertify.set('notifier', 'position', 'bottom-left');
      alertify.error('Campo limite operaciones directo es necesario');

    } else if ($('#reportoOperationLimit').val() == '') {
      alertify.set('notifier', 'position', 'bottom-left');
      alertify.error('Campo limite operaciones reporto es necesario');

    } else if ($('#operationLimitMoneyMarket').val() == '') {
      alertify.set('notifier', 'position', 'bottom-left');
      alertify.error('Campo limite por operacion es necesario');

    } else if ($('#exchangeMarketLimit').val() == '') {
      alertify.set('notifier', 'position', 'bottom-left');
      alertify.error('Campo limite mercado es necesario');

    } else if ($('#limitOperationExchangeMarket').val() == '') {
      alertify.set('notifier', 'position', 'bottom-left');
      alertify.error('Campo limite por operacion mercado es necesario');

    } else if ($('#globalLimit').val() < validacionLimiteGlobal) {

      $('#globalLimit').focus();
      alertify.set('notifier', 'position', 'bottom-left');
      alertify.error('El campo limite global debe ser mayor');
    } else if ($('#operationLimitMoneyMarket').val() > validacionOperacionMercadoMoney) {

      $('#operationLimitMoneyMarket').focus();
      alertify.set('notifier', 'position', 'bottom-left');
      alertify.error('El campo limite por operación debe ser menor');
    } else if ($('#limitOperationExchangeMarket').val() > validacionOperacionMercadoCambios) {

      $('#limitOperationExchangeMarket').focus();
      alertify.set('notifier', 'position', 'bottom-left');
      alertify.error('El campo limite por operación mercado de cambios debe ser menor');
    } else {

      var contraparte = $('#contraparte').val();
      contraparte = contraparte.toString().toUpperCase();

      var globalLimit;
      var directOperationLimit;
      var reportoOperationLimit;
      var operationLimitMoneyMarket;
      var exchangeMarketLimit;
      var limitOperationExchangeMarket;
      var estatus;


      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });

      Swal.fire({
        title: '¿Desea registrar el limite como contraparte o como operador?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#47FFAB',
        cancelButtonColor: '#47C2FF',
        confirmButtonText: 'Contraparte',
        cancelButtonText: 'Operador',
        reverseButtons: true
      }).then((result) => {

        if (result.value) {


          const estatus = 0;

          if ($('#selectDivisas').val() != 'MXN') {

            Swal.fire({
              title: 'El valor serà convertido a pesos mexicanos!',
              text: '',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.value) {

                globalLimit = ((parseFloat($('#globalLimit').val().toString())) * (1)) / parseFloat(this.divisaGlobal);
                directOperationLimit = ((parseFloat($('#directOperationLimit').val().toString())) * (1)) / parseFloat(this.divisaGlobal);
                reportoOperationLimit = ((parseFloat($('#reportoOperationLimit').val().toString())) * (1)) / parseFloat(this.divisaGlobal);
                operationLimitMoneyMarket = ((parseFloat($('#operationLimitMoneyMarket').val().toString())) * (1)) / parseFloat(this.divisaGlobal);
                exchangeMarketLimit = ((parseFloat($('#exchangeMarketLimit').val().toString())) * (1)) / parseFloat(this.divisaGlobal);
                limitOperationExchangeMarket = ((parseFloat($('#limitOperationExchangeMarket').val().toString())) * (1)) / parseFloat(this.divisaGlobal);

                const data = JSON.stringify({
                  contraparte: contraparte,
                  globalLimit: globalLimit,
                  directOperationLimit: directOperationLimit,
                  reportoOperationLimit: reportoOperationLimit,
                  operationLimitMoneyMarket: operationLimitMoneyMarket,
                  exchangeMarketLimit: exchangeMarketLimit,
                  limitOperationExchangeMarket: limitOperationExchangeMarket,
                  mercado: 'mexicano',
                  //usuario : "Roberto",
                  estatus: estatus
                });


                this.backendService.insert(data).subscribe(da => {
                  Swal.fire('La contraparte se registro correctamente', '', 'success');

                  $('#contraparte').val('');
                  $('#globalLimit').val('');
                  $('#directOperationLimit').val('');
                  $('#reportoOperationLimit').val('');
                  $('#operationLimitMoneyMarket').val('');
                  $('#exchangeMarketLimit').val('');
                  $('#limitOperationExchangeMarket').val('');
                  $('#add').css('display', 'none');
                  $('#btnAgregar').slideDown('slow');
                  this.limites.push({
                    contraparte: contraparte,
                    globalLimit: parseFloat(globalLimit).toFixed(2),
                    directOperationLimit: parseFloat(directOperationLimit).toFixed(2),
                    reportoOperationLimit: parseFloat(reportoOperationLimit).toFixed(2),
                    operationLimitMoneyMarket: parseFloat(operationLimitMoneyMarket).toFixed(2),
                    exchangeMarketLimit: parseFloat(exchangeMarketLimit).toFixed(2),
                    limitOperationExchangeMarket: parseFloat(limitOperationExchangeMarket).toFixed(2),
                    editable: false
                  });


                });


              }
            });

          } else {

            globalLimit = $('#globalLimit').val();
            directOperationLimit = $('#directOperationLimit').val();
            reportoOperationLimit = $('#reportoOperationLimit').val();
            operationLimitMoneyMarket = $('#operationLimitMoneyMarket').val();
            exchangeMarketLimit = $('#exchangeMarketLimit').val();
            limitOperationExchangeMarket = $('#limitOperationExchangeMarket').val();

            const data = JSON.stringify({
              contraparte: contraparte,
              globalLimit: globalLimit,
              directOperationLimit: directOperationLimit,
              reportoOperationLimit: reportoOperationLimit,
              operationLimitMoneyMarket: operationLimitMoneyMarket,
              exchangeMarketLimit: exchangeMarketLimit,
              limitOperationExchangeMarket: limitOperationExchangeMarket,
              mercado: 'mexicano',
              //usuario : "Roberto",
              estatus: estatus
            });

            this.backendService.insert(data).subscribe(da => {
              Swal.fire('La contraparte se registro correctamente', '', 'success');
              $('#contraparte').val('');
              $('#globalLimit').val('');
              $('#directOperationLimit').val('');
              $('#reportoOperationLimit').val('');
              $('#operationLimitMoneyMarket').val('');
              $('#exchangeMarketLimit').val('');
              $('#limitOperationExchangeMarket').val('');
              $('#add').css('display', 'none');
              $('#btnAgregar').slideDown('slow');


              this.limites.push({
                contraparte: contraparte,
                globalLimit: parseFloat(globalLimit).toFixed(2),
                directOperationLimit: parseFloat(directOperationLimit).toFixed(2),
                reportoOperationLimit: parseFloat(reportoOperationLimit).toFixed(2),
                operationLimitMoneyMarket: parseFloat(operationLimitMoneyMarket).toFixed(2),
                exchangeMarketLimit: parseFloat(exchangeMarketLimit).toFixed(2),
                limitOperationExchangeMarket: parseFloat(limitOperationExchangeMarket).toFixed(2),
                editable: false
              });

            });

          }

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          const estatus = 1;

          if ($('#selectDivisas').val() != 'MXN') {


            Swal.fire({
              title: 'El valor serà convertido a pesos mexicanos!',
              text: '',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.value) {

                globalLimit = ((parseFloat($('#globalLimit').val().toString())) * (1)) / parseFloat(this.divisaGlobal);
                directOperationLimit = ((parseFloat($('#directOperationLimit').val().toString())) * (1)) / parseFloat(this.divisaGlobal);
                reportoOperationLimit = ((parseFloat($('#reportoOperationLimit').val().toString())) * (1)) / parseFloat(this.divisaGlobal);
                operationLimitMoneyMarket = ((parseFloat($('#operationLimitMoneyMarket').val().toString())) * (1)) / parseFloat(this.divisaGlobal);
                exchangeMarketLimit = ((parseFloat($('#exchangeMarketLimit').val().toString())) * (1)) / parseFloat(this.divisaGlobal);
                limitOperationExchangeMarket = ((parseFloat($('#limitOperationExchangeMarket').val().toString())) * (1)) / parseFloat(this.divisaGlobal);


                const data = JSON.stringify({
                  contraparte: contraparte,
                  globalLimit: globalLimit,
                  directOperationLimit: directOperationLimit,
                  reportoOperationLimit: reportoOperationLimit,
                  operationLimitMoneyMarket: operationLimitMoneyMarket,
                  exchangeMarketLimit: exchangeMarketLimit,
                  limitOperationExchangeMarket: limitOperationExchangeMarket,
                  mercado: 'mexicano',
                  //usuario : "Roberto",
                  estatus: estatus
                });


                this.backendService.insert(data).subscribe(da => {
                  Swal.fire('La contraparte se registro correctamente', '', 'success');
                  $('#contraparte').val('');
                  $('#globalLimit').val('');
                  $('#directOperationLimit').val('');
                  $('#reportoOperationLimit').val('');
                  $('#operationLimitMoneyMarket').val('');
                  $('#exchangeMarketLimit').val('');
                  $('#limitOperationExchangeMarket').val('');
                  $('#add').css('display', 'none');
                  $('#btnAgregar').slideDown('slow');

                  this.limites.push({
                    contraparte: contraparte,
                    globalLimit: parseFloat(globalLimit).toFixed(2),
                    directOperationLimit: parseFloat(directOperationLimit).toFixed(2),
                    reportoOperationLimit: parseFloat(reportoOperationLimit).toFixed(2),
                    operationLimitMoneyMarket: parseFloat(operationLimitMoneyMarket).toFixed(2),
                    exchangeMarketLimit: parseFloat(exchangeMarketLimit).toFixed(2),
                    limitOperationExchangeMarket: parseFloat(limitOperationExchangeMarket).toFixed(2),
                    editable: false
                  });


                });


              }
            });

          } else {


            globalLimit = $('#globalLimit').val();
            directOperationLimit = $('#directOperationLimit').val();
            reportoOperationLimit = $('#reportoOperationLimit').val();
            operationLimitMoneyMarket = $('#operationLimitMoneyMarket').val();
            exchangeMarketLimit = $('#exchangeMarketLimit').val();
            limitOperationExchangeMarket = $('#limitOperationExchangeMarket').val();

            const data = JSON.stringify({
              contraparte: contraparte,
              globalLimit: globalLimit,
              directOperationLimit: directOperationLimit,
              reportoOperationLimit: reportoOperationLimit,
              operationLimitMoneyMarket: operationLimitMoneyMarket,
              exchangeMarketLimit: exchangeMarketLimit,
              limitOperationExchangeMarket: limitOperationExchangeMarket,
              mercado: 'mexicano',
              //usuario : "Roberto",
              estatus: estatus
            });

            this.backendService.insert(data).subscribe(da => {
              Swal.fire('La contraparte se registro correctamente', '', 'success');
              $('#contraparte').val('');
              $('#globalLimit').val('');
              $('#directOperationLimit').val('');
              $('#reportoOperationLimit').val('');
              $('#operationLimitMoneyMarket').val('');
              $('#exchangeMarketLimit').val('');
              $('#limitOperationExchangeMarket').val('');
              $('#add').css('display', 'none');
              $('#btnAgregar').slideDown('slow');


              this.limites.push({
                contraparte: contraparte,
                globalLimit: parseFloat(globalLimit).toFixed(2),
                directOperationLimit: parseFloat(directOperationLimit).toFixed(2),
                reportoOperationLimit: parseFloat(reportoOperationLimit).toFixed(2),
                operationLimitMoneyMarket: parseFloat(operationLimitMoneyMarket).toFixed(2),
                exchangeMarketLimit: parseFloat(exchangeMarketLimit).toFixed(2),
                limitOperationExchangeMarket: parseFloat(limitOperationExchangeMarket).toFixed(2),
                editable: false
              });

            });


          }
        }

      });

    }

  }


  globalLimit: string;
  directOperationLimit: string;
  reportoOperationLimit: string;
  operationLimitMoneyMarket: string;
  exchangeMarketLimit: string;
  limitOperationExchangeMarket: string;

  public editDomain(domain: any, index) {
    console.log(domain);

    this.globalLimit = domain.globalLimit;
    this.directOperationLimit = domain.directOperationLimit;
    this.reportoOperationLimit = domain.reportoOperationLimit;
    this.operationLimitMoneyMarket = domain.operationLimitMoneyMarket;
    this.exchangeMarketLimit = domain.exchangeMarketLimit;
    this.limitOperationExchangeMarket = domain.limitOperationExchangeMarket;

    domain.editable = !domain.editable;
  }


  public cancelUpdate(domain: any, index) {


    console.log(this.globalLimit);


    this.limites[index].globalLimit = this.globalLimit;
    this.limites[index].directOperationLimit = this.directOperationLimit;
    this.limites[index].reportoOperationLimit = this.globalLimit;
    this.limites[index].operationLimitMoneyMarket = this.reportoOperationLimit;
    this.limites[index].exchangeMarketLimit = this.exchangeMarketLimit;
    this.limites[index].limitOperationExchangeMarket = this.limitOperationExchangeMarket;

    domain.editable = !domain.editable;


  }

  public guardarUpdate(domain: any, index) {


    var validacionLimiteGlobal = (parseInt(domain.directOperationLimit)) + (parseInt(domain.reportoOperationLimit)) + (parseInt(domain.exchangeMarketLimit));
    //console.log(validacionLimiteGlobal)
    var validacionOperacionMercadoMoney = (parseInt(domain.directOperationLimit)) + (parseInt(domain.reportoOperationLimit));
    //console.log(validacionOperacionMercadoMoney)
    var validacionOperacionMercadoCambios = (parseInt(domain.exchangeMarketLimit));
    //console.log(validacionOperacionMercadoCambios)


    if (domain.globalLimit < validacionLimiteGlobal) {
      alertify.set('notifier', 'position', 'bottom-left');
      alertify.error('El campo limite global debe ser mayor');


    } else if (domain.operationLimitMoneyMarket > validacionOperacionMercadoMoney) {

      alertify.set('notifier', 'position', 'bottom-left');
      alertify.error('El campo limite por operación debe ser menor');
    } else if (domain.limitOperationExchangeMarket > validacionOperacionMercadoCambios) {

      alertify.set('notifier', 'position', 'bottom-left');
      alertify.error('El campo limite por operación mercado de cambios debe ser menor');
    } else {

      const data = JSON.stringify({
        contraparte: domain.contraparte,
        globalLimit: domain.globalLimit,
        directOperationLimit: domain.directOperationLimit,
        reportoOperationLimit: domain.reportoOperationLimit,
        operationLimitMoneyMarket: domain.operationLimitMoneyMarket,
        exchangeMarketLimit: domain.exchangeMarketLimit,
        limitOperationExchangeMarket: domain.limitOperationExchangeMarket,
        mercado: 'mexicano',
        //usuario : "Roberto"
      });

      this.backendService.update(data, domain.contraparte).subscribe(da => {
        domain.editable = !domain.editable;
        Swal.fire('Datos actualizados correctamente', '', 'success');

      });


    }


  }


}
