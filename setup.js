const fs = require('fs');
const path = require('path');

// Create necessary directories
const directories = [
    'components',
    'utils',
    'styles',
    'public',
    'tracking'
];

// Create directories if they don't exist
directories.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Created directory: ${dir}`);
    }
});

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    const envContent = `
NODE_ENV=development
PORT=3000
GROQ_API_KEY=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
FLUVIO_WEBSOCKET_ENDPOINT=ws://localhost:3000
`;
    fs.writeFileSync(envPath, envContent.trim());
    console.log('Created .env file');
}

// Create or update config file
const configPath = path.join(__dirname, 'config.js');
if (!fs.existsSync(configPath)) {
    const configContent = fs.readFileSync(path.join(__dirname, 'config.js'), 'utf8');
    fs.writeFileSync(configPath, configContent);
    console.log('Created config.js file');
}

console.log('Setup complete! Run npm start to launch the application.');
