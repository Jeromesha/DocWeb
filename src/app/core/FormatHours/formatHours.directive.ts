import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appTimeFormat]'
})
export class TimeFormatDirective {

    private regex: RegExp = new RegExp(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/); // Matches "HH:mm" format

    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete', ':', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    constructor(private el: ElementRef) { }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return; // Allow special keys, numbers, and colon (:) to be pressed without restriction
        }

        const current: string = this.el.nativeElement.value;
        const next: string = current.concat(event.key);

        if (next && !String(next).match(this.regex)) {
            event.preventDefault(); // Prevent input if the next character doesn't match the regex pattern
        }
    }
}
