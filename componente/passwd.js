const bcrypt = require("bcryptjs");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Ingresa la contraseña: ", async (password) => {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    console.log("\n🔐 Hash generado:");
    console.log(hash);
  } catch (error) {
    console.error("Error generando hash:", error);
  } finally {
    rl.close();
  }
});