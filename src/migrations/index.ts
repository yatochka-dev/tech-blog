import * as migration_20250621_141108 from './20250621_141108';
import * as migration_20250621_204738 from './20250621_204738';

export const migrations = [
  {
    up: migration_20250621_141108.up,
    down: migration_20250621_141108.down,
    name: '20250621_141108',
  },
  {
    up: migration_20250621_204738.up,
    down: migration_20250621_204738.down,
    name: '20250621_204738'
  },
];
