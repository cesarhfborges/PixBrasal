export interface Qrcode {
    message: string;
    txid: string;
    qrcode_url: string;
    qrcode_base64: string;
    is_paid: boolean;
    pix_data_print?: PaymentResponse;
}

interface PaymentResponse {
    'title': string;
    'bank': string;
    'pix_endToEndId': string;
    'pix_value': string;
    'pix_created_at': Date | string;
    'company': string;
    'station': {
        'name': string;
        'cnpj': string;
    };
    'attendant': {
        'name': string;
    };
    'client': {
        'name': string;
    };
}
