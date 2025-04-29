# E.C.L.A.I.R. - Entity Controller Limited At Infra-Red


A full-stack IoT system for controlling infrared home appliances remotely via a web or mobile application. The goal of this project is to unify control of multiple IR devices into a single, secure platform and reduce e-waste caused by redundant physical remotes.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)

---

## Overview

E.C.L.A.I.R. is designed to allow users to:
- Save and replicate IR remote commands
- Control home appliances via mobile/web
- Manage remotes and commands securely
- Replace physical remotes using Raspberry Pi hardware

The project includes:
- A web and mobile front-end (React Native)
- A .NET Core server for API and authentication
- A Python Flask server running on a Raspberry Pi for IR interaction
- IR signal transmission and decoding using C and pigpio

---

## Features

✅ User registration, login, and role-based access  
✅ Create/view/edit/delete remotes and buttons  
✅ Record IR signals using KY-022 Receiver  
✅ Transmit IR signals via IR LED  
✅ Data stored in SQL Server with Entity Framework  
✅ Device interaction via Raspberry Pi using pigpio and Flask  
✅ Admin tools for managing users  

---

## Tech Stack

### Frontend
- React Native (Android/iOS/web)
- TypeScript
- Axios

### Backend
- ASP.NET Core (Web API)
- Entity Framework Core (SQL Server)
- Identity Framework (Authentication)

### Embedded / Hardware
- Raspberry Pi 3B+
- Python + Flask
- pigpio + C (IR signal transmission)
- KY-022 IR Receiver Module
- IR LED + PN2222A Transistor

---

## Architecture

[Mobile/Web App] ⇄ [.NET Server] ⇄ [SQL Server] ⇅ [Flask Server] ⇅ [Raspberry Pi] ⇅ [IR Receiver / IR LED / Devices]

---

## Installation

### Prerequisites

- .NET SDK 6.0+
- Node.js 16+
- Python 3.9+
- SQL Server or Docker container
- Raspberry Pi 3B+ with Raspbian OS

### 1. Clone the repo
```bash
git clone https://github.com/RazvanGPaduraru/RGP_IR_REMOTE_CONTROL.git
cd RGP_IR_REMOTE_CONTROL

cd backend
dotnet restore
dotnet ef database update
dotnet run
```

### 2. Backend Setup (.NET)
```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

### 3. Frontend Setup (React Native)
```bash
cd frontend
npm install
npm start
```

### 4. Raspberry Pi Setup
```bash
cd frontend
npm install
npm start
```

Install dependencies:

```bash
sudo apt-get install pigpio python3-flask
```
Run Flask server:

```bash
cd raspberry-pi
python3 app.py
```

### Usage
- Launch the mobile or web app.

- Register a new user and verify your email.

- Add remotes and buttons.

- Record infrared signals using your original remote.

- Transmit commands to your appliances through Raspberry Pi.
