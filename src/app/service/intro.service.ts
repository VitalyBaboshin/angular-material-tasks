import {Injectable} from '@angular/core';
import * as introJS from 'intro.js/intro';

@Injectable({
  providedIn: 'root'
})

export class IntroService {

  // для сохранения в localStorage
  private static INTRO_VIEWED_KEY = 'intro-viewed';
  private static INTRO_VIEWED_VALUE = 'done';

  private introJS = introJS; // объект для работы с интро

  constructor() { }

  // показать интро с подсветкой элементов
  public startIntroJS(checkViewed: boolean): void {

    // если просмотр уже был, то большо не показывать
    if (checkViewed === true && localStorage.getItem(IntroService.INTRO_VIEWED_KEY) === IntroService.INTRO_VIEWED_VALUE) {
      return;
    }

    this.introJS.setOptions(
      {
        nextLabel: 'след. >',
        prevLabel: '< пред.',
        doneLabel: 'Выход',
        skipLabel: 'Выход',
        exitOnEsc: true,
        exitOnOverlayClick: false
      });
    this.introJS.start();

    // при закрытии сохраняем информацию в localStorage
    this.introJS.onexit(_ => localStorage.setItem(IntroService.INTRO_VIEWED_KEY, IntroService.INTRO_VIEWED_VALUE));
  }

}

