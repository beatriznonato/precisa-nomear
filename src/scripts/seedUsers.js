import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { createRequire } from "module";
import { DISABILITIES } from "../data/disabilities.js";
import { MEDICAL_EQUIPMENT } from "../data/medicalEquipment.js";
import { MEDICATIONS } from "../data/medications.js";
import { RELATIONSHIPS } from "../data/relationships.js";
import { STATES } from "../data/states.js";
import { CITIES_BY_STATE } from "../data/citiesByState.js";
import { DISTRICTS } from "../data/districts.js";
import { LIVES_WITH } from "../data/livesWith.js";
import { ADDITIONAL_ADDRESS_INFO } from "../data/additionalAddressInfo.js";
import { Faker, pt_BR } from "@faker-js/faker";

const require = createRequire(import.meta.url);
const serviceAccount = require("./serviceAccountKey.json");

const faker = new Faker({ locale: [pt_BR] });

initializeApp({
  credential: cert(serviceAccount),
});

const generateBrazilianPhone = () => {
  const ddd = faker.number.int({ min: 11, max: 99 });
  const prefix = faker.number.int({ min: 90000, max: 99999 });
  const suffix = faker.number
    .int({ min: 0, max: 9999 })
    .toString()
    .padStart(4, "0");
  return `(${ddd}) ${prefix}-${suffix}`;
};

const db = getFirestore();

function generateFakeUser() {
  const hasDisability = faker.datatype.boolean();
  const disability = hasDisability
    ? faker.helpers.arrayElement(DISABILITIES)
    : "";

  const needsMedicalEquip = faker.datatype.boolean();
  const takesMedication = faker.datatype.boolean();

  const medicalEquip = needsMedicalEquip
    ? faker.helpers.arrayElement(MEDICAL_EQUIPMENT)
    : "";

  const medication = takesMedication
    ? faker.helpers.arrayElement(MEDICATIONS)
    : "";

  const relationship = faker.helpers.arrayElement(RELATIONSHIPS);

  const state = faker.helpers.arrayElement(STATES);
  const city = faker.helpers.arrayElement(CITIES_BY_STATE[state]);

  return {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    cpf: faker.string.numeric(11),
    birthDate: faker.date.birthdate().toISOString().split("T")[0],
    gender: faker.person.sex(),
    phoneNumber: generateBrazilianPhone(),
    livesAlone: faker.datatype.boolean() ? "sim" : "não",
    livesWith: faker.helpers.arrayElement(LIVES_WITH),
    hasDisability: hasDisability ? "sim" : "não",
    disability,
    needsMedicalEquip: needsMedicalEquip ? "sim" : "não",
    medicalEquip,
    takesMedication: takesMedication ? "sim" : "não",
    medication,
    emergencyContact: {
      name: faker.person.fullName(),
      relationship,
      phoneNumber: generateBrazilianPhone(),
    },
    address: {
      street: faker.location.street(),
      number: faker.location.buildingNumber(),
      additionalAddressInfo: faker.helpers.arrayElement(
        ADDITIONAL_ADDRESS_INFO
      ),
      district: faker.helpers.arrayElement(DISTRICTS),
      city,
      state,
      zip: faker.location.zipCode("#####-###"),
    },
  };
}

const argCount = process.argv[2];
const userCount = argCount ? parseInt(argCount, 10) : 100;

if (isNaN(userCount) || userCount <= 0) {
  console.error(
    "Por favor, informe uma quantidade válida de usuários para gerar."
  );
  process.exit(1);
}

async function seedUsers(count = 50) {
  const batch = db.batch();

  for (let i = 0; i < count; i++) {
    const newUser = generateFakeUser();
    const userRef = db.collection("users").doc();
    batch.set(userRef, newUser);
  }

  await batch.commit();
  console.log(`${count} users created with success!`);
}

seedUsers(userCount).catch(console.error);
