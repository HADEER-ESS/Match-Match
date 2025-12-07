# Welcome to your Expo app 👋
## Match-Match
### A React Native (Expo) color-analysis application with a custom Turbo Module

- Match-Match is a lightweight mobile application built with React Native & Expo for analyzing and detecting colors.
- The app integrates a custom Android Turbo Module written in Kotlin, enabling fast, native-level color extraction and processing.

## Features
- Real-time color analysis
- Cross-platform UI using React Native
- High-performance native image processing on Android
- Clean and modular architecture

## Technologies
### UI
- React Native (Expo)
- TypeScript
### Native Layer
- Kotlin
- React Native Turbo-Module
- Codegen
- Android Studio

## Turbo Module
This project includes a custom Turbo Module implemented only for Android, located in:
```bash
android/app/src/main/java/com/nativemediapicker/...
android/app/src/main/java/com/nativetexttospeach/...
```
Native files include:
[NativeMediaPicker]Module.kt    -> for Kotlin logic implementation
[NativeMediaPicker]Package.kt   -> for Module dispatch

## Project Structure
```bash
/specs         ->   React Native interfaces for Method force
/controller    ->   logeical function
/app           ->   Application screen preview
/components    ->   Application Main components view
/android       ->  Native Turbo Module (Kotlin)
```

## Get started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start the app

   ```bash
   npx expo start
   ```
## License
This project is open-source and available
