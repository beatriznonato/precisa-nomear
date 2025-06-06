# Rede do Bem 🤲🏼

## Challenge Description

This project is a web application developed as a Progressive Web App (PWA), with the goal of providing **visibility and support to people in vulnerable situations during natural disasters**. The platform connects users — such as elderly individuals, people with disabilities, or reduced mobility — to **institutions responsible for emergency response**, making it easier to access help when every second matters.

The application offers **accessible and intuitive features**, including registration with specific needs, climate risk alerts, an emergency button, and an institutional dashboard for real-time data visualization of users at risk.

Information is securely stored using **Firebase**, ensuring **data integrity and scalability**. Authentication is handled via **Firebase Auth**, with encryption and session protection.


## Features ✨

Features currently available in the software:

- **Accessible registration forms:** for entering personal data and special needs (e.g., wheelchair use, medical devices).
- **Institutional dashboard:** real-time map, graphs, help request list, and state-by-state data visualization.
- **User home screen:** weather information, emergency button, and visual alerts.
- **Settings screen:** with personal data and logout option.
- **Login and registration screens:** accessible and mobile-friendly.

## Pre Requirements ‼️

It is necessary install [Npm](https://docs.npmjs.com/cli/v7/commands/npm-install).

This project use node version 22.2.0.

## How to Install ⚙️

To install in developer mode, follow the step-by-step:

1. Clone the repository on your computer

```
    git clone <repository_url>
```

2.  Access the directory where you downloaded this project and run the command below _install dependencies_

```
   npm install or npm i
```

## How to Run 🕹

### Building the Project

To create a production-ready build of the project, execute:

```
% npm run build
```

### Production Mode

To run the production-ready version of the project, use:

```
% npm run preview
```

### Development Mode

For development purposes, where you can see changes in real-time as you edit the code, run:

```
% npm run dev
```

## Firebase Setup 🖥

1. Create a file named `.env` at the root of the project and fill in the fields with the data from your Firebase project:

```
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
VITE_WEATHER_API_KEY=
```
🔑 **Important:** The `VITE_WEATHER_API_KEY` field must contain your OpenWeatherMap API key, used to fetch real-time alerts and weather forecasts.

2. Access the **Firebase Console**, open your project, and configure the Firestore security rules with the following content:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
These rules ensure that only authenticated users can read and write data in the database.

3. Generating the Authentication Certificate 

If you want to batch-create user profiles to simulate how the application would function, you’ll need to generate an authentication certificate on Firebase:

1. Go to **Project Settings > Service Accounts**
2. Click on **Generate new private key**
3. After downloading the .json file:
- Rename it to serviceAccountKey.json
- Move it to the project's scripts folder
- Save it securely — it should never be shared or committed to version control
  
To mock user data, simply run the following command in your CLI:

```bash
pnpm generate-users 10
```
🔑 **Important:** Replace `10` with the desired number of users you want to create. If you don’t pass a number, the default is 100 users.

🔗 Learn how to configure your .env file, set secure Firestore rules, and optionally generate a Firebase service key in the Firebase Setup [Wiki](https://github.com/beatriznonato/rede-do-bem/wiki/⚙%EF%B8%8F-Firebase-Setup).

## PWA 📱

To install a Progressive Web App (PWA) on your mobile device:

**In Google Chrome for Android**: A banner will appear at the bottom of the screen, suggesting that you install the app. Tap on this banner and follow the instructions.

**In Safari for iOS**: Tap on the "Share" icon (a square with an upward arrow) at the bottom of the screen, and then select "Add to Home Screen".

## Design and Prototyping 🎨

Figma was chosen as the central tool in the challenge due to its real-time collaboration capabilities and intuitive interface for agile design and prototyping. For the application experience, please visit the prototype [link](https://www.figma.com/design/LdWWBrQBafU8sLhzFEEHJO/GS-2025?node-id=0-1&t=JcSXuFEF317Pfx69-1).

## Application Architecture 🏗️

The project structure was designed to ensure organization, scalability, and a clear separation of concerns, following best practices for PWA development and Firebase integration.

🔗 Understand the structure and technologies used in the [Wiki](https://github.com/beatriznonato/rede-do-bem/wiki/🏗%EF%B8%8F-Application-Architecture)

## CI/CD with GitHub Actions 🤖

This project uses GitHub Actions to automate tasks such as build, testing, and validation, ensuring reliability throughout the development process.

🔗 See the details of the CI/CD workflow in the [Wiki](https://github.com/beatriznonato/rede-do-bem/wiki/🤖-CI-CD-with-GitHub-Actions)

## Branch Protection 🛡

The `main` branch is protected to ensure the integrity of the main codebase. This includes requiring pull requests and code reviews before merging.

🔗 Learn more about the protection rules in the [Wiki](https://github.com/beatriznonato/rede-do-bem/wiki/🛡-Branch-Protection)

## Fun Facts ⭐

- This challenge was specifically developed for **Global Solution** as part of a guidance program by [FIAP](https://www.fiap.com.br) in partnership with [IBM](https://www.ibm.com/us-en), [Médicos Sem Fronteiras](https://doe.msf.org.br), [INPE](https://www.gov.br/inpe/pt-br), [Santo André | Defesa Civil](https://portais.santoandre.sp.gov.br/defesacivil/) and [Corpo de Bombeiros | São Paulo](https://www.corpodebombeiros.sp.gov.br/#/).
