// @flow
import { useState } from 'react';

export type CallbackParams = {
  callback?: (?*) => void,
  argsArray?: Array<*>
};

type UseIsOpenType = {
  isOpen: boolean,
  open: (callbackParams?: ?CallbackParams) => void,
  close: (callbackParams?: ?CallbackParams) => void
};

const useIsOpen = (defaultOpen: boolean = false): UseIsOpenType => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const open = (callbackParams?: ?CallbackParams) => {
    setIsOpen(true);
    performCallback(callbackParams);
  };

  const close = (callbackParams: ?CallbackParams) => {
    setIsOpen(false);
    performCallback(callbackParams);
  };

  const performCallback = (callbackParams?: ?CallbackParams) => {
    if (!callbackParams) return null;
    const { callback, argsArray } = callbackParams;
    if (!callback) return null;

    return argsArray ? callback(...argsArray) : callback();
  };

  return { isOpen, open, close };
};

export default useIsOpen;
