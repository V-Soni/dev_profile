import init, { greet } from './pkg/my_wasm_project.js';

async function run() {
    await init(); // Initialize the WebAssembly module
    const greeting = greet('Rustacean'); // Call the Rust function
    document.getElementById('greeting').textContent = greeting;
}

run();