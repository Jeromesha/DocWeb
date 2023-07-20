import { NgModule } from '@angular/core';
import { OnlyNumber } from "./onlynumber.directive";
import { SpecialCharacter } from "./onlychar.directive";
import { onlycharSpecialCharacter } from './onlycharSpecial.directive';
import { onlynumberSpecialCharacter } from './onlynumberSpecial.directive';
import { inputText } from './inputtext.directive';
import { PasswordOnly } from './password.directive';
import { TimeOnly } from './time.directive';
import { RoleDirective } from './role.directive';

export const components = [
  OnlyNumber, SpecialCharacter, onlycharSpecialCharacter,
   onlynumberSpecialCharacter, inputText, PasswordOnly, TimeOnly, RoleDirective
];

@NgModule({
  declarations: [components],
  exports: [components]
})
export class DirectivesModule {}
