## Pix Brasal

### como instalar
Clone o projeto
```
git clone http://link
``` 

### Instale as dependencias
entre no diretorio do projeto e Execute o comando abaixo
```
npm install
``` 

### Rodando o Projeto
Padrão
```
ionic serve
```

Local com acesso externo 
```
ionic serve --external
```

compilando nativo 
```
ionic capacitor run android
ionic capacitor run ios
```

compilando nativo e rodando com live reload (hot reload)
```
ionic capacitor run android -l --external
ionic capacitor run ios -l --external
```

Sincronizando o projeto para para efetuar build android/ios
```
ionic capacitor sync [android | ios]
ou
npx cap sync
```

Build de Produção Usando Capacitor para Nativo
```
ionic capacitor build android
ionic capacitor build ios
```

##### Pacotes

- [ngx-currency]('https://www.npmjs.com/package/ngx-currency') | Mascara monetaria de input configuravel
  
  <br />
  <br />
  <br />
##### Serviços

- [happi]('https://happi.dev/') | Api para Qrcode Base64
