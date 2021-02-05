import {Component, HostListener, OnInit} from '@angular/core';
import {ModalService} from '../shared/services/modal.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../shared/services/alert.service';
import {ToastService} from '../shared/services/toast.service';
import {AtendentesService} from '../shared/services/atendentes.service';
import {Colaborador} from '../shared/models/colaborador';
import {AuthService} from '../shared/services/auth.service';
import Usuario from '../shared/models/usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  usuario: Usuario;

  form: FormGroup;

  customAlertOptions: any = {
    header: 'Selecione seu nome abaixo para iniciar o pagamento PIX:',
    translucent: true
  };

  setup: {
    enable: boolean,
    time: number
  } = {
    enable: true,
    time: 60
  };

  colaboradores: Colaborador[];

  dateNow: Date = new Date();

  constructor(
      private modalService: ModalService,
      private toastService: ToastService,
      private alertService: AlertService,
      private atendentesService: AtendentesService,
      private authService: AuthService,
  ) {
    this.form = new FormGroup({
      attendant_id: new FormControl(null, [Validators.required])
    });

    setInterval(_ => {
      this.dateNow = new Date();
    }, 1000);
  }

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
    this.getAtendentes();
  }

  doRefresh(event) {
    this.atendentesService.getAtendentes().subscribe(
        response => {
          this.colaboradores = response;
          this.toastService.showToast('A lista de atendentes foi atualizada.');
          event.target.complete();
        },
        error => {
          console.log(error);
          event.target.cancel();
          this.toastService.showToastError('Ops, não foi possivel atualizar a lista de funcionarios, verifique a rede e tente novamente.');
        }
    );
  }

  getAtendentes() {
    this.atendentesService.getAtendentes().subscribe(
        response => {
          this.colaboradores = response;
        },
        error => {
          console.log(error);
          this.toastService.showToastError('Ops, não foi possivel atualizar a lista de funcionarios, verifique a rede e tente novamente.');
        }
    );
  }

  @HostListener('document:keydown.enter', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (document.getElementsByClassName('inputPass').length > 0) {
      const okButton: any = document.querySelectorAll('ion-alert button')[1];
      okButton.click();
    }
  }

  showModal() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const col = this.colaboradores.find(c => c.id === (this.form.get('attendant_id').value as number));
      this.modalService.showModalPagamento(col).then(res => {
          this.form.reset();
        }).finally(() => {
      });
    } else {
      this.toastService.showToast('Nenhum funcionário selecionado.');
      setTimeout(_ => {
        this.form.get('attendant_id').markAsUntouched();
      }, 10000);
    }
  }

  openConfig() {
    this.alertService.showAlertPassword().then(response => {
      console.log('success: ', response);
      if (response === '1234') {
        this.modalService.showModalConfig().then(res => {
          console.log(res);
        });
      } else {
        this.toastService.showToast('A senha informada é inválida.');
      }
    }).catch(error => {
      console.log('error: ', error);
    });
  }
}
