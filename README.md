# Micro Frontend (MFE) Project Documentation

This project is built using **Webpack Module Federation** with a **Host (Global App)** and multiple **Remote Applications (MFEs)**.  
Each remote can run **independently (standalone)** or be **mounted inside the host**.

## 1. Project Structure

├─ fc-aiot-fe-host # Host application
├─ fc-aiot-fe-module-a # Remote module A
├─ fc-aiot-fe-module-b # Remote module B
├─ fc-aiot-fe-share # Shared services, utils, types, store, constant, enum, ...

## 2. Start Project

### 2.1. Run Global Application (Host)

cd ./fc-aiot-fe-host
npm install
npm start

### 2.2. Run a Single Remote Module (Standalone)

cd ./fc-aiot-fe-host
npm install
npm start

## 3. Module Federation Configuration

All remotes and exposes are configured in: federation.config.js
This file defines:

- Module name
- Remote entry URL
- Exposed components / providers

## 4. Create a New Remote Module

### 4.1. Remote Module Setup

1.Copy an existing remote module as a template
2.Update webpack.config.js and register a new remote
3.Create domain models following backend standards
(can be placed inside the remote module or shared module depending on business logic)
4.Create API services(./src/services)
5.Create Redux actions and reducers(./src/shareds/providers/redux)
6.Configure(federation.config.js):
remote paths
exposes
module name
7.Mock and declare module paths in:
federation.d.ts

### 4.2. Host Module Integration

To load a remote inside the host:
1.Add remote entry to host federation.config.js
2.Load remote using lazy loading:
const RemoteApp = React.lazy(() => import('remoteModule/App'));
