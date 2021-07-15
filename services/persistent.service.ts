import pgPromise from 'pg-promise';

export class PersistentService {
  db: pgPromise.IDatabase<any>;

  constructor() {
    const pgp = pgPromise();
    const options = {
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      password: 'root'
    };
    this.db = pgp(options);
  }
}