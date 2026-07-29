import { execFileSync } from 'node:child_process';

if (process.env.MIGRATE === 'true') {
    console.log('Running database migrations...');

    execFileSync(
        'node',
        ['ace.js', 'migration:run', '--force'],
        {
            stdio: 'inherit',
        }
    );
}

console.log('Starting AdonisJS...');

await import('./bin/server.js');