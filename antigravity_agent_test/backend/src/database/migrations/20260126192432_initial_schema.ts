import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('password_hash').notNullable();
        table.string('pix_key');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('wallets', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
        table.decimal('balance', 14, 2).defaultTo(0).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('lotteries', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.enum('status', ['OPEN', 'PROCESSING', 'COMPLETED']).defaultTo('OPEN');
        table.timestamp('draw_date').notNullable();
        table.decimal('prize_pool', 14, 2).defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('bets', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.uuid('lottery_id').references('id').inTable('lotteries');
        table.uuid('user_id').references('id').inTable('users');
        table.specificType('numbers', 'integer[]').notNullable();
        table.decimal('amount', 14, 2).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('transactions', (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.uuid('wallet_id').references('id').inTable('wallets');
        table.enum('type', ['DEPOSIT', 'WITHDRAW', 'BET', 'PRIZE']).notNullable();
        table.decimal('amount', 14, 2).notNullable();
        table.enum('status', ['PENDING', 'COMPLETED', 'FAILED']).defaultTo('PENDING');
        table.string('external_id').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('transactions');
    await knex.schema.dropTableIfExists('bets');
    await knex.schema.dropTableIfExists('lotteries');
    await knex.schema.dropTableIfExists('wallets');
    await knex.schema.dropTableIfExists('users');
}
