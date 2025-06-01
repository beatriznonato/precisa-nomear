# OceanGuardian 🌊

## Challenge Description

This project is a web application developed as a Progressive Web App (PWA), with the aim of monitoring the marine environment, contributing to the protection of life in the oceans. Through the platform, users can register information about marine pollution, marine vegetation, and marine animals, assisting in the collection and analysis of data for conservation actions.

The application offers several features, including registration and login screens, as well as an interactive dashboard to facilitate access to different functionalities. The platform also includes a signaling screen useful for divers to communicate underwater.

The collected information is securely stored using Firebase, ensuring data integrity and easy retrieval. User account security is guaranteed with password encryption on the registration screen.

## Features ✨
Features already available in the software:

**Forms**: forms to monitor pollution, marine vegetation, and marine animals.

**Dashboard**: contains shortcuts to main functionalities.

**Signal screen**: useful for divers to communicate.

**Configuration screen**: with registered diver's data and logout option.

**Registration screen**: where it's possible to create a new diver's registration.

**Login screen**: where it's possible to provide the email and password to access the application.


## Pre Requirements ‼️

It is necessary install [Npm](https://docs.npmjs.com/cli/v7/commands/npm-install).

This project use node version 22.2.0.

## How to Install ⚙️

To install in developer mode, follow the step-by-step:

1. Clone the repository on your computer
```
    git clone <repository_url>
```

 2. Access the directory where you downloaded this project and run the command below *install dependencies*
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

Create a *.env* file and fill in the fields with your Firebase Data.

```
API_KEY=
AUTH_DOMAIN=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGING_SENDER_ID=
APP_ID=
```

(Importante ativar authentication e cloudstore firebase no firebase também)
(quando criar cloudstore, scriar uma coleção chamada users - alterar as regras do firestore (colocar aqui depois))

## PWA 📱

To install a Progressive Web App (PWA) on your mobile device:

**In Google Chrome for Android**: A banner will appear at the bottom of the screen, suggesting that you install the app. Tap on this banner and follow the instructions.

**In Safari for iOS**: Tap on the "Share" icon (a square with an upward arrow) at the bottom of the screen, and then select "Add to Home Screen".


## Design and Prototyping 🎨

Figma was chosen as the central tool in the challenge due to its real-time collaboration capabilities and intuitive interface for agile design and prototyping. For the application experience, please access the prototype [link](https://www.figma.com/design/QtBAQndvvI1mSl9y9PSANg/OceanGuardian?m=dev&node-id=58-605&t=z1ibDg7EFksKTGOB-1) , and to view the app's creation, visit the [mockup](https://www.figma.com/design/QtBAQndvvI1mSl9y9PSANg/OceanGuardian?m=dev&node-id=58-605&t=z1ibDg7EFksKTGOB-1).

## Agile Methodology ⚡️

The use of Jira in the challenge was essential for organizing and tracking project tasks in an agile manner, promoting efficient and collaborative management. Here is the [link](https://gschallenge.atlassian.net/jira/software/projects/GS124/boards/2/backlog) to access the board.

## Fun Facts ⭐

- This challenge was specifically developed for **Global Solution** as part of a guidance program by [FIAP](https://www.fiap.com.br) in partnership with [O20](https://www.g20.org/pt-br/g20-social/grupos-de-engajamento/oceans-20#:~:text=Sobre%20o%20O20&text=A%20cria%EF%BF%A7￣o%20do%20Oceans20%20pela), [Pacto Global Rede Brasil](https://www.pactoglobal.org.br), [Cátedra UNESCO para sustentabilidade dos oceanos](https://oceano.iea.usp.br), [Softtek](https://www.softtek.com/pt/), [AWS](https://aws.amazon.com/partners/) and [Select Soluções](https://www.selectsolucoes.com.br).

## License
MIT © Beatriz Nonato 👩🏻‍💻 and Larissa Soares 👩🏼‍💻
