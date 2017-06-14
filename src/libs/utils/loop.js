import Cp from '../core/Cp';
import looptime from './looptime';

const cp = Cp();
let id;

export const addToLoop = (func) => {
  cp.add(func);
  if (!id) {
    id = setInterval(() => { cp.update(); }, looptime);
  }
  return func;
};

export const removeFromLoop = (func) => {
  cp.remove(func);
  if (!cp.length) {
    clearInterval(id);
    id = null;
  }
};
