import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const generator = require("password-generator")
const cryptoJS = require("crypto-js")


@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  generarClave(){
    let clave = generator(8, false);
    return clave;
  }
  cifrarClave(clave: String) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

}
