import { Directive, HostListener } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Directive({
  selector: '[appUserName]',
  standalone: true
})
export class UserNameDirective {
  constructor(private ionInput: IonInput) { }

  @HostListener('ionInput', ['$event'])
  onInput(event: any) {
    const newValue = event.detail.value.replace(/\s/g, ''); // Remove spaces
    const newValue_complete = newValue.replace(/[^a-zA-Z0-9_.]/g, ''); // Allow only letters, numbers, '_', and '.'
    this.ionInput.value = newValue_complete; // Update input value
  }
}
