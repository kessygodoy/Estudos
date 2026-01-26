import { Knex } from 'knex';
import { db } from '../config/database';

export interface User {
    id: string;
    name: string;
    email: string;
    password_hash: string;
    pix_key?: string;
    created_at: Date;
}

export class UserRepository {
    async create(data: Partial<User>, trx?: Knex.Transaction): Promise<User> {
        const builder = trx ? trx('users') : db('users');
        const [user] = await builder.insert(data).returning('*');
        return user;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return db('users').where('email', email).first();
    }

    async findById(id: string): Promise<User | undefined> {
        return db('users').where('id', id).first();
    }
}
