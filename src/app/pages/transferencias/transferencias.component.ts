import { TransferenciaService } from './../../shared/services/transferencia.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Transferencia } from 'src/app/shared/models/transferencia';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormGroup }   from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.css']
})

export class TransferenciasComponent implements OnInit {

  dataInicioFilter!: Date;
  dataInicio!: string;
  dataFimFilter!: Date;
  dataFim!: string;
  nomeOperadorFilter!: string;

  pesquisado = false;

  ELEMENT_DATA: Transferencia[] = [];
  dataSource = new MatTableDataSource < Transferencia >(this.ELEMENT_DATA);
  displayedColumns =[
    'dataTransferencia', 'valor', 'tipo', 'nomeOperador'
  ];

  valorTotal!: number;
  valorTotalFormatado!: string;

  @ViewChild(MatSort, {
    static: true
  }) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageEvent!: PageEvent;
  pageSize = 30;
  pageIndex = 0;
  totalSize = 0;
  pageSizeOptions: number[] = [30, 50, 100];

  formCliente!: FormGroup;

  constructor(
    private transferenciaService: TransferenciaService,
    private datePipe: DatePipe,
  ) {

  }

  ngOnInit(): void {
    this.getAllReports();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createForm(np: any){
    this.formCliente = new FormGroup({
      dataInico: new FormGroup([]),
      dataFim: new FormGroup([]),
      nome: new FormGroup([]),
    });
  }

  public getAllReports(): void {
    this.transferenciaService.getTransferencias().subscribe(
      data => {
        console.log(data);
        this.dataSource.data = data;
        this.valorTotal = this.calculoValorTotal(data)
        this.valorTotalFormatado = this.valorTotal.toFixed(2);
      },
      (err) => {
        console.log("Erro ao carregar transferencias", err);
      }
    );
  }

  private calculoValorTotal(data: Transferencia[]): number {
    return data.map(item => item.valor).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  public pesquisar(){

    this.dataInicio = this.converDataInico(this.dataInicioFilter);
    this.dataFim = this.converDataFim(this.dataFimFilter);
    this.nomeOperadorFilter = this.nomeOperadorFilter ?? '';

    if (this.dataInicio === '' && this.dataFim === '' && this.nomeOperadorFilter === '' ){
      this.pesquisado = false;
      this.getAllReports();
    }

    if (this.dataInicio !== '' && this.dataFim !== '') {
      this.dataSource.data = this.filtrarPorIntervaloDeDatas(this.dataInicio, this.dataFim);
      this.valorTotal = this.calculoValorTotal(this.dataSource.data)
      this.valorTotalFormatado = this.valorTotal.toFixed(2);
      this.pesquisado = true;
    } else if (this.dataInicio === '' && this.dataFim !== '') {
      alert('Por favor, preencha a data de início.');
    } else if (this.dataInicio !== '' && this.dataFim === '') {
      alert('Por favor, preencha a data de fim.');
    }

    if (this.nomeOperadorFilter !== ''){
      this.dataSource.data =  this.dataSource.data.filter(item => {
        this.valorTotal = item.valor;
        return item.nomeOperador == this.nomeOperadorFilter;
      });
      this.valorTotal = this.calculoValorTotal(this.dataSource.data)
      this.valorTotalFormatado = this.valorTotal.toFixed(2);
      this.pesquisado = true;
    }

  }
  private converDataInico(dataInicioFilter: Date): string{
    return this.datePipe.transform(dataInicioFilter, 'dd/MM/yyyy') ?? '';
  }

  private converDataFim(dataFimFilter: Date): string{
    return this.datePipe.transform(dataFimFilter, 'dd/MM/yyyy') ?? '';
  }

  private filtrarPorIntervaloDeDatas(dataInicio: string, dataFim: string): Transferencia[] {
    const dataInicioObj = new Date (dataInicio);
    const dataFimObj = new Date (dataFim);
    return this.dataSource.data.filter(item => {
      const dataItem = new Date (item.dataTransferencia);
      return dataItem >= dataInicioObj && dataItem <= dataFimObj;
    });
  }




}
