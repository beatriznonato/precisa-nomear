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

const DISABILITIES = ["fisica", "visual", "auditiva", "cognitiva", "cronica"];

const MEDICAL_EQUIPMENT = [
  "cadeira de rodas",
  "andador",
  "muleta",
  "bengala",
  "respirador portátil",
  "oxímetro",
  "aparelho de pressão",
  "concentrador de oxigênio",
  "bomba de infusão",
  "nebulizador",
  "colchão pneumático",
  "prótese auditiva",
  "elevador para banheira",
  "cadeira de banho",
  "comadre ou urinol",
  "suporte para soro",
  "colete ortopédico",
  "cadeira reclinável médica",
];

const MEDICATIONS = [
  "paracetamol",
  "dipirona",
  "losartana",
  "enalapril",
  "furosemida",
  "sinvastatina",
  "atorvastatina",
  "insulina",
  "metformina",
  "glifage",
  "omeprazol",
  "pantoprazol",
  "ranitidina",
  "amoxicilina",
  "azitromicina",
  "clonazepam",
  "diazepam",
  "fluoxetina",
  "sertralina",
  "levotiroxina",
  "hidroclorotiazida",
  "ácido acetilsalicílico (AAS)",
  "prednisona",
  "ibuprofeno",
  "cetoprofeno",
  "salbutamol (aerolin)",
  "brometo de ipratrópio",
];

const RELATIONSHIPS = [
  "pai",
  "mae",
  "avo",
  "irmao",
  "filho",
  "tio",
  "sobrinho",
  "primo",
  "conjuge",
  "amigo",
  "vizinho",
  "cuidador",
  "outro",
];

function generateFakeUser() {
  const hasDisability = faker.datatype.boolean();
  const disability = hasDisability
    ? DISABILITIES[Math.floor(Math.random() * DISABILITIES.length)]
    : "";

  const needsMedicalEquip = faker.datatype.boolean();
  const takesMedication = faker.datatype.boolean();

  const medicalEquip = needsMedicalEquip
    ? MEDICAL_EQUIPMENT[Math.floor(Math.random() * MEDICAL_EQUIPMENT.length)]
    : "";

  const medication = takesMedication
    ? MEDICATIONS[Math.floor(Math.random() * MEDICATIONS.length)]
    : "";

  const relationship =
    RELATIONSHIPS[Math.floor(Math.random() * RELATIONSHIPS.length)];

  return {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    cpf: faker.string.numeric(11),
    birthDate: faker.date.birthdate().toISOString().split("T")[0],
    gender: faker.person.sex(),
    phoneNumber: faker.phone.number(),
    livesAlone: faker.datatype.boolean() ? "sim" : "não",
    livesWith: "família",
    hasDisability: hasDisability ? "sim" : "não",
    disability,
    needsMedicalEquip: needsMedicalEquip ? "sim" : "não",
    medicalEquip,
    takesMedication: takesMedication ? "sim" : "não",
    medication,
    emergencyContact: {
      name: faker.person.fullName(),
      relationship,
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

async function seedUsers(count = 500) {
  const batch = db.batch();

  for (let i = 0; i < count; i++) {
    const newUser = generateFakeUser();
    const userRef = db.collection("users").doc();
    batch.set(userRef, newUser);
  }

  await batch.commit();
  console.log(`${count} users created with success!`);
}

seedUsers(500).catch(console.error);
