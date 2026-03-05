import { prisma } from "../src/lib/prisma.js";
import bcrypt from 'bcrypt'
const userData = [
 { username : 'andy', password : hashedPassword, nickname: 'an'},
 { username : 'bobby', password : hashedPassword, nickname: 'bob'},
 { username : 'candy', password : hashedPassword, nickname: 'can'},
 { username : 'danny', password : hashedPassword, nickname: 'dan'},
]
const hashedPassword = bcrypt.hashSync('123456', 8)

async function main() {
 console.log('Start clean table...');
 await prisma.$executeRaw`TRUNCATE TABLE User`
 console.log('Start seeding...');
 const createdUsers = await prisma.user.createMany({
   data : userData,
   skipDuplicates: true,
 });
 console.log(`Created ${createdUsers.count} users.`);
}
main()
 .then(async () => {
   await prisma.$disconnect();
 })
 .catch(async (e) => {
   console.error(e);
   await prisma.$disconnect();
   process.exit(1);
 });
