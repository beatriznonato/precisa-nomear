import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { faker } from "@faker-js/faker";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

export const STATES = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

function generateFakeUser() {
  return {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    cpf: faker.string.numeric(11),
    birthDate: faker.date.birthdate().toISOString().split("T")[0],
    gender: faker.person.sex(),
    phoneNumber: faker.phone.number(),
    livesAlone: faker.datatype.boolean() ? "sim" : "não",
    livesWith: "família",
    hasDisability: "não",
    disability: "",
    needsMedicalEquip: "não",
    medicalEquip: "",
    takesMedication: "sim",
    medication: "paracetamol",
    emergencyContact: {
      name: faker.person.fullName(),
      relationship: "irmão",
      phoneNumber: faker.phone.number(),
    },
    address: {
      street: faker.location.street(),
      number: faker.location.buildingNumber(),
      additionalAddressInfo: "",
      district: faker.location.city(),
      city: faker.location.city(),
      state: STATES[Math.floor(Math.random() * STATES.length)],
      zip: faker.location.zipCode(),
    },
  };
}

async function seedUsers(count = 100) {
  const batch = db.batch();

  for (let i = 0; i < count; i++) {
    const newUser = generateFakeUser();
    const userRef = db.collection("users").doc();
    batch.set(userRef, newUser);
  }

  await batch.commit();
  console.log(`${count} users created with success!`);
}

seedUsers(100).catch(console.error);
