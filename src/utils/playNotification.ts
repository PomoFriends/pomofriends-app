import { NotificationSettings } from './types/userTypes';
import demonstrative from './audio/demonstrative.ogg';
import eventually from './audio/eventually.ogg';
import goesWithoutSaying from './audio/goes-without-saying.ogg';
import gotItDone from './audio/got-it-done.mp3';
import juntos from './audio/juntos.ogg';
import longChimeSound from './audio/long-chime-sound.ogg';
import pieceOfCake from './audio/piece-of-cake.ogg';
import pristine from './audio/pristine.ogg';
import slowSpringBoard from './audio/slow-spring-board.ogg';
import softBells from './audio/soft-bells.ogg';
import UIfx from 'uifx';

const audio = [
  softBells,
  demonstrative,
  eventually,
  goesWithoutSaying,
  gotItDone,
  juntos,
  longChimeSound,
  pieceOfCake,
  pristine,
  slowSpringBoard,
];

export const playNotification = (settings: NotificationSettings) => {
  if (settings.soundOn) {
    return new UIfx(audio[settings.soundtrack])
      .setVolume(settings.volume / 100)
      .play();
  }
  return null;
};
