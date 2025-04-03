import { neon } from '@neondatabase/serverless';
import { eachDayOfInterval, format, subDays } from 'date-fns';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';

import { convertAmountToMiliunits } from '@/lib/utils';

import { accounts, categories, transactions } from '@/database/schema';

config({ path: '.env' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const SEED_USER_ID = 'user_2sBaBxyvWCfDnjo1EzWcYwLVft8';
const SEED_CATEGORIES = [
  {
    id: 'category_1',
    name: 'Food',
    userId: SEED_USER_ID,
    plaidId: null,
  },
  {
    id: 'category_2',
    name: 'Rent',
    userId: SEED_USER_ID,
    plaidId: null,
  },
  {
    id: 'category_3',
    name: 'Utilities',
    userId: SEED_USER_ID,
    plaidId: null,
  },
  {
    id: 'category_4',
    name: 'Entertainment',
    userId: SEED_USER_ID,
    plaidId: null,
  },
];

const SEED_ACCOUNTS = [
  {
    id: 'account_1',
    name: 'Expenses',
    userId: SEED_USER_ID,
    plaidId: null,
  },
  {
    id: 'account_2',
    name: 'Savings',
    userId: SEED_USER_ID,
    plaidId: null,
  },
  {
    id: 'account_3',
    name: 'Investments',
    userId: SEED_USER_ID,
    plaidId: null,
  },
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const SEED_TRANSACTIONS: (typeof transactions.$inferInsert)[] = [];

function generateRandomAmount(category: typeof categories.$inferInsert) {
  switch (category.name) {
    case 'Food':
      return Math.random() * 600;
    case 'Rent':
      return Math.random() * 10000;
    case 'Utilities':
      return Math.random() * 50;
    case 'Entertainment':
      return Math.random() * 100;
    default:
      return Math.random() * 100;
  }
}

function generateTransactionsForDay(day: Date) {
  const numTransactions = Math.floor(Math.random() * 3) + 1;

  for (let i = 0; i < numTransactions; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const isExpense = Math.random() < 0.6;
    const amount = generateRandomAmount(category);
    const formattedAmount = convertAmountToMiliunits(
      isExpense ? -amount : amount,
    );

    SEED_TRANSACTIONS.push({
      id: `transaction_${format(day, 'yyyy-MM-dd')}_${i}`,
      userId: SEED_USER_ID,
      accountId: SEED_ACCOUNTS[0].id,
      categoryId: category.id,
      date: day,
      amount: formattedAmount,
      payee: 'Random',
      notes: 'Random',
    });
  }
}

function generateTransactions() {
  const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });

  days.forEach((day) => {
    generateTransactionsForDay(day);
  });
}

generateTransactions();

async function main() {
  try {
    await db.delete(transactions).execute();
    await db.delete(categories).execute();
    await db.delete(accounts).execute();

    await db.insert(categories).values(SEED_CATEGORIES).execute();
    await db.insert(accounts).values(SEED_ACCOUNTS).execute();
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();

    console.info('Seed completed successfully');
  } catch (error) {
    console.error('Error during seed: ', error);
    process.exit(1);
  }
}

main();
