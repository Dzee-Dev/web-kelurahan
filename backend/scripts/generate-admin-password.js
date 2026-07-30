const { hashPassword } = require('../src/services/adminAuth.service');

async function main() {
  const password = process.argv[2];
  if (!password) {
    console.error('Gunakan: npm run hash:admin -- "password-kuat-minimal-10-karakter"');
    process.exitCode = 1;
    return;
  }
  console.log(await hashPassword(password));
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
