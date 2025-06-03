# Rede do Bem 🤲🏼

## Challenge Description

## Features ✨

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

Create a _.env_ file and fill in the fields with your Firebase Data.

```
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
```

(Importante ativar authentication e cloudstore firebase no firebase também)
(quando criar cloudstore, scriar uma coleção chamada users - alterar as regras do firestore (colocar aqui depois))

## PWA 📱

To install a Progressive Web App (PWA) on your mobile device:

**In Google Chrome for Android**: A banner will appear at the bottom of the screen, suggesting that you install the app. Tap on this banner and follow the instructions.

**In Safari for iOS**: Tap on the "Share" icon (a square with an upward arrow) at the bottom of the screen, and then select "Add to Home Screen".

## Design and Prototyping 🎨

Figma was chosen as the central tool in the challenge due to its real-time collaboration capabilities and intuitive interface for agile design and prototyping. For the application experience, please visit the prototype [link](https://www.figma.com/design/LdWWBrQBafU8sLhzFEEHJO/GS-2025?node-id=0-1&t=JcSXuFEF317Pfx69-1).

## Application Architecture 🏗️

The project structure was designed to ensure organization, scalability, and a clear separation of concerns, following best practices for PWA development and Firebase integration.

🔗 Understand the structure and technologies used in the [Wiki]()

## CI/CD with GitHub Actions 🤖

This project uses GitHub Actions to automate tasks such as build, testing, and validation, ensuring reliability throughout the development process.

🔗 See the details of the CI/CD workflow in the [Wiki]()

## Branch Protection 🛡

The `main` branch is protected to ensure the integrity of the main codebase. This includes requiring pull requests and code reviews before merging.

🔗 Learn more about the protection rules in the [Wiki]()

## Fun Facts ⭐

- This challenge was specifically developed for **Global Solution** as part of a guidance program by [FIAP](https://www.fiap.com.br) in partnership with [IBM](https://www.ibm.com/us-en), [Médicos Sem Fronteiras](https://doe.msf.org.br), [INPE](https://www.gov.br/inpe/pt-br), [Santo André | Defesa Civil](https://portais.santoandre.sp.gov.br/defesacivil/) and [Corpo de Bombeiros | São Paulo](https://www.corpodebombeiros.sp.gov.br/#/).
