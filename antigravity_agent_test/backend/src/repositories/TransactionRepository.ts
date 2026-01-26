import { Knex } from 'knex';
import { db } from '../config/database';

export interface Transaction {
    id: string;
    wallet_id: string;
    type: 'DEPOSIT' | 'WITHDRAW' | 'BET' | 'PRIZE';
    amount: number;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    external_id?: string;
    created_at: Date;
}

export class TransactionRepository {
    async create(data: Partial<Transaction>, trx?: Knex.Transaction): Promise<Transaction> {
        const builder = trx ? trx('transactions') : db('transactions');
        const [transaction] = await builder.insert(data).returning('*');
        return transaction;
    }

    async findById(id: string): Promise<Transaction | undefined> {
        return db('transactions').where('id', id).first();
    }

    async updateStatus(id: string, status: 'PENDING' | 'COMPLETED' | 'FAILED', trx?: Knex.Transaction): Promise<void> {
        const builder = trx ? trx('transactions') : db('transactions');
        await builder.where('id', id).update({ status });
    }
}
