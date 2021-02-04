/* tslint:disable:no-shadowed-variable */
import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController, Platform} from '@ionic/angular';
import {Step} from '../shared/models/step';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../shared/services/toast.service';
import {Colaborador} from '../shared/models/colaborador';
import {PagamentoService} from '../shared/services/pagamento.service';
import {Qrcode} from '../shared/models/qrcode';
import {PrintService} from '../shared/services/print.service';
import {environment} from '../../environments/environment';
import {DatePipe} from '@angular/common';
import Usuario from '../shared/models/usuario';
import {AuthService} from '../shared/services/auth.service';

@Component({
    selector: 'app-gerar-pagamento',
    templateUrl: './gerar-pagamento.page.html',
    styleUrls: ['./gerar-pagamento.page.scss'],
})
export class GerarPagamentoPage implements OnInit {

    usuario: Usuario;

    colaborador: Colaborador;

    inputValorOptions = {
        align: 'center',
        allowNegative: false,
        allowZero: false,
        decimal: ',',
        precision: 2,
        prefix: 'R$ ',
        suffix: '',
        thousands: '.',
        nullable: false,
        min: 0,
        max: 9999,
    };

    inputPhoneOptions = {
        align: 'center',
        allowNegative: false,
        allowZero: false,
        decimal: ',',
        precision: 2,
        prefix: 'R$ ',
        suffix: '',
        thousands: '.',
        nullable: false,
        min: 0,
        max: 9999,
    };

    dateNow: Date = new Date();

    pagamento: Qrcode;
    atualStep = 1;

    steps: Step[] = [
        {
            name: 'Valor',
            type: 'icon',
            icon: 'wallet-outline'
        },
        {
            name: 'QR Code',
            type: 'icon',
            icon: 'qr-code-outline'
        },
        {
            name: 'Validação',
            type: 'icon',
            icon: 'thumbs-up-outline'
        },
    ];
    form: FormGroup;

    constructor(
        private modalController: ModalController,
        private platform: Platform,
        private toastService: ToastService,
        private pagamentoService: PagamentoService,
        private loadingController: LoadingController,
        private printService: PrintService,
        private datePipe: DatePipe,
        private authService: AuthService,
        private alertController: AlertController,
    ) {
        this.form = new FormGroup({
            price: new FormControl(0, [Validators.required, Validators.min(.01)]),
            attendant_id: new FormControl(null, [Validators.required, Validators.min(1)]),
        });
        setInterval(_ => {
            this.dateNow = new Date();
        }, 1000);
    }

    ngOnInit() {
        this.usuario = this.authService.getUsuario();
        this.form.get('attendant_id').patchValue(this.colaborador.id);


        // // for dev only
        // this.pagamento = {
        //     message: "Pagamento Efetuado com Sucesso.",
        //     txid: "7d95688878cc47fe8a39c9f38d7581bc",
        //     qrcode_url: "https://pix.brasal.com.br/api/v2/qrcode/7d95688878cc47fe8a39c9f38d7581bc/image",
        //     is_paid: true,
        //     qrcode_base64: 'sdfasdfasdfasdfasdf'
        // };
        // this.pagamento.pix_data_print = {
        //     title: 'PIX - BRASAL COMBUSTÍVEIS',
        //     bank: '341 ITAU UNIBANCO S.A.',
        //     pix_endToEndId: 'E18236120202102031954s0447790WS5',
        //     pix_value: '0,10',
        //     pix_created_at: '03/02/2021 16:54:48',
        //     company: 'Brasal Combustíveis Ltda',
        //     station: {
        //         name: 'Posto Sia',
        //         cnpj: '00.097.626/0001-68',
        //     },
        //     attendant: {
        //         name: 'HEBER DE ALMEIDA JACINTO',
        //     },
        //     client: {
        //         name: 'CESAR HENRIQUE FERREIRA BORGES'
        //     }
        // };
        // this.atualStep = 3;
    }

    numberOnly(event): boolean {
        console.log(event);
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;

    }

    close() {
        this.modalController.dismiss(false);
    }

    finish(): void {
        this.modalController.dismiss(true);
    }

    atualStepSub() {
        if (this.atualStep > 1) {
            this.atualStep--;
        }
    }

    atualStepAdd() {
        if (this.atualStep <= this.steps.length) {
            switch (this.atualStep) {
                case 1:
                    this.gerarPagamento();
                    break;
                case 2:
                    this.checkPagamento();
                    break;
                case 3:
                    this.finish();
                    break;
            }
        }
    }

    focus() {
        document.execCommand('selectall', false, null);
        // element.setSelectionRange(0, element.value.length);
    }

    changes($event: any) {
        console.log($event);
        return ['0', '1'].includes($event.detail.data) || $event.detail.inputType === 'deleteContentBackward';
    }

    imprimirQrCode(): void {
        this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Imprimindo',
            duration: 2000,
        }).then(l => l.present());

        this.getBase64ImageFromUrl(this.pagamento.qrcode_url).then((result: string) => {
            this.imprimir(result).then(r => {
                this.loadingController.dismiss().then();
            });
        }).catch(err => console.error(err));
    }

    async imprimir(qr: string) {

        await this.printService.setAlignment(1);
        await this.printService.printBitmap(environment.brasalLogo.replace('data:image/bmp;base64,', ''), 380, 164);
        await this.printService.lineWrap(1);

        await this.printService.setFontSize(20);
        await this.printService.printOriginalText(`${this.usuario.station.name}`);
        await this.printService.lineWrap(1);

        await this.printService.printOriginalText(`Cnpj: ${this.authService.getUsuario().station.cnpj}`);
        await this.printService.lineWrap(1);

        await this.printService.printOriginalText(('Atendente: ' + this.colaborador.name ?? 'Error').substring(0, 37));
        await this.printService.lineWrap(1);

        await this.printService.printOriginalText(`Valor: R$ ${Number(this.form.get('price').value).toFixed(2).replace('.', ',')}`);
        await this.printService.lineWrap(1);

        await this.printService.printBitmap(qr.replace('data:image/png;base64,', ''), 350, 350);
        await this.printService.lineWrap(1);

        await this.printService.printOriginalText(`${this.datePipe.transform(new Date(), 'dd/MM/yyyy  HH:mm:ss')}`);
        await this.printService.lineWrap(1);

        await this.printService.printOriginalText(`www.brasal.com.br`);
        return await this.printService.lineWrap(4).then(r => true);
    }

    async imprimirComprovante() {
        if (this.pagamento.is_paid) {
            console.log('imprime');
            this.loadingController.create({
                cssClass: 'my-custom-class',
                message: 'Imprimindo',
                duration: 950,
            }).then(l => l.present());
            await this.printService.setAlignment(1);
            await this.printService.printBitmap(environment.brasalLogo.replace('data:image/bmp;base64,', ''), 380, 164);
            await this.printService.lineWrap(1);

            await this.printService.setFontSize(26);
            await this.printService.printOriginalText(`${this.pagamento.pix_data_print.company}`);
            await this.printService.lineWrap(1);

            await this.printService.printOriginalText(`${this.pagamento.pix_data_print.station.name}`);
            await this.printService.lineWrap(1);

            await this.printService.printOriginalText(`CNPJ: ${this.pagamento.pix_data_print.station.cnpj}`);
            await this.printService.lineWrap(1);

            await this.printService.setFontSize(21);
            await this.printService.printOriginalText('Detalhes do pagamento.');
            await this.printService.lineWrap(1);

            await this.printService.setFontSize(19);
            await this.printService.setAlignment(0);
            await this.printService.printString(('Atendente: ' + this.pagamento.pix_data_print.attendant.name).substring(0, 37));
            await this.printService.lineWrap(1);

            await this.printService.printString(('Cliente: ' + this.pagamento.pix_data_print.client.name).substring(0, 36));
            await this.printService.lineWrap(1);

            await this.printService.setAlignment(1);
            await this.printService.setFontSize(22);
            await this.printService.printOriginalText(`Valor: ${this.pagamento.pix_data_print.pix_value}`);
            await this.printService.lineWrap(1);

            await this.printService.printOriginalText(`Data/Hora: ${this.pagamento.pix_data_print.pix_created_at}`);
            await this.printService.lineWrap(1);

            await this.printService.setFontSize(20);
            await this.printService.printOriginalText(`Chave:`);
            await this.printService.lineWrap(1);
            await this.printService.setFontSize(20);
            await this.printService.printOriginalText(`${this.pagamento.pix_data_print.pix_endToEndId}`);
            await this.printService.lineWrap(4);
        } else {
            this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Ops. erro no sistema.',
                message: 'Não foi possivel imprimir a guia.',
                buttons: [
                    {
                        text: 'Ok',
                        handler: () => {
                        }
                    }
                ]
            }).then(a => a.present());
        }
    }

    async getBase64ImageFromUrl(imageUrl) {
        const res = await fetch(imageUrl);
        const blob = await res.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                resolve(reader.result);
            }, false);

            reader.onerror = () => {
                return reject(this);
            };
            reader.readAsDataURL(blob);
        });
    }

    private checkPagamento(): void {
        this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Aguarde, Verificando pagamento.',
        }).then(l => l.present());
        this.pagamentoService.checarPagamento(this.pagamento.txid).subscribe(
            response => {
                if (response.is_paid) {
                    this.pagamento.pix_data_print = response.pix_data_print;
                    this.pagamento.is_paid = response.is_paid;
                    this.loadingController.dismiss();
                    this.atualStep++;
                } else {
                    this.loadingController.dismiss();
                    this.alertController.create({
                        cssClass: 'my-custom-class',
                        header: 'Atenção',
                        message: 'Este pagamento esta pendente.',
                        buttons: [
                            {
                                text: 'Ok',
                                handler: () => {
                                }
                            }
                        ]
                    }).then(a => a.present());
                }
            },
            error => {
                console.log(error);
                this.loadingController.dismiss();
                this.alertController.create({
                    cssClass: 'my-custom-class',
                    header: 'Confirm!',
                    message: 'Pagamento não confirmado.',
                    buttons: [
                        {
                            text: 'Ok',
                            handler: () => {
                            }
                        }
                    ]
                }).then(a => a.present());
            }
        );
    }

    private gerarPagamento(): void {
        if (this.form.valid) {

            this.loadingController.create({
                cssClass: 'my-custom-class',
                message: 'Gerando pagamento...',
            }).then(l => l.present());

            this.pagamentoService.gerarPagamento(this.form.value).subscribe(
                response => {
                    this.pagamento = {...response, is_paid: false};
                    this.loadingController.dismiss().then(() => {
                        this.atualStep++;
                    }).catch();
                },
                error => {
                    console.log(error);
                    this.loadingController.dismiss();
                    this.alertController.create({
                        cssClass: 'my-custom-class',
                        header: 'Ops',
                        message: 'Erro ao gerar pagamento, verifique a conexão de internet.',
                        buttons: [
                            {
                                text: 'Ok',
                                handler: () => {
                                }
                            }
                        ]
                    }).then(a => a.present());
                }
            );
        } else {
            this.toastService.showToast('Verifique o valor digitado.');
        }
    }
}
