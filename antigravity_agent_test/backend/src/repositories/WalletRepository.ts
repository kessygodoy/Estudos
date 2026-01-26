import { Knex } from 'knex';
import { db } from '../config/database';

export interface Wallet {
    id: string;
    user_id: string;
    balance: number;
    created_at: Date;
}

export class WalletRepository {
    async create(userId: string, trx?: Knex.Transaction): Promise<Wallet> {
        const builder = trx ? trx('wallets') : db('wallets');
        const [wallet] = await builder.insert({ user_id: userId }).returning('*');
        return wallet;
    }

    async findByUserId(userId: string, trx?: Knex.Transaction): Promise<Wallet | undefined> {
        const builder = trx ? trx('wallets') : db('wallets');
        return builder.where('user_id', userId).first();
    }

    async lockWallet(userId: string, trx: Knex.Transaction): Promise<Wallet> {
        return trx('wallets')
            .where('user_id', userId)
            .forUpdate()
            .first();
    }

    async incrementBalance(userId: string, amount: number, trx: Knex.Transaction): Promise<void> {
        await trx('wallets')
            .where('user_id', userId)
            .increment('balance', amount);
    }

    async decrementBalance(userId: string, amount: number, trx: Knex.Transaction): Promise<void> {
        await trx('wallets')
            .where('user_id', userId)
            .decrement('balance', amount);
    }
}
