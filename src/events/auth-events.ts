import mitt from 'mitt';

export const authEmitter = mitt<{ logout: void }>();
