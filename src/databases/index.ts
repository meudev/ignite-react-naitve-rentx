import { Database } from '@nozbe/watermelondb';
import SQLiteApater from '@nozbe/watermelondb/adapters/sqlite';

import { schemas } from './schema';
import { User } from './model/User';
import { Car } from './model/Car';

const adapter = new SQLiteApater({
    schema: schemas,
});

export const database = new Database({
    adapter,
    modelClasses: [ User, Car ],
});