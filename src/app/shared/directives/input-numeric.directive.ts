import { Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appInputNumeric]'
})
export class InputNumericDirective {

  keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  @HostListener('keypress')
  onkeypress(e) {
    const event = e || window.event;
    if (event) {
      return this.isNumberKey(event);
    }
  }
  isNumberKey(event) {
    console.log(event);
    return this.keys.includes(event.key);
  }

}
