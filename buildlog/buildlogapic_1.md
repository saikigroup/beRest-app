saikigroup account icon
saikigroup


apick

Account

Project

Overview

Insights

Usage

Develop

Workflows

Development builds

Deploy

Builds

Submissions


Over-the-air updates

Hosting

Push notifications

Entities

Fingerprints

Project settings

General

Credentials

Environment variables

GitHub


User menu
saikigroup

Builds

df32b116


Compare
Android internal distribution build
b72d238 · Merge pull request #21 from saikigroup/claude/improve-landing-page-accessibility-Ah5tw fix: remove unused victory-native and react-native-skia causing crash


Profile


Environment

SDK version

Version

Fingerprint

Commit

Created by

preview

preview

55.0.0

 1.0.0 (1)

dd68a04

main
b72d238

saikigroup account icon
saikigroup

Build artifact
APK

Install

Open with Orbit

Status

Start time

Wait time

Queue time


Build time

Total time

Availability


Finished

Mar 22, 2026 12:03 PM
85ms

39s

16m 41s

17m 21s

13 days

Logs

Waiting to start

1s


Build is waiting in the queue
Spin up build environment

38s


Creating new worker instance
AMD, 4 vCPUs, 16 GB RAM
Using image "ubuntu-24.04-jdk-17-ndk-r27b-sdk-55" based on "ubuntu-2404-noble-amd64-v20260128"
Installed software:
- NDK 27.1.12297006
- Node.js 20.19.4
- Bun 1.3.8
- Yarn 1.22.22
- pnpm 10.28.2
- npm 10.9.3
- Java 17
- node-gyp 12.2.0
- Maestro 2.1.0
Project environment variables:
  EAS_USE_CACHE=1
  __API_SERVER_URL=https://api.expo.dev/
Environment secrets:
  EXPO_TOKEN=********
EAS Build environment variables:
  SHELL=/bin/sh
  NVM_INC=/home/expo/.nvm/versions/node/v20.19.4/include/node
  JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
  MEMORY_PRESSURE_WRITE=c29tZSAyMDAwMDAgMjAwMDAwMAA=
  PWD=/usr/local/eas-build-worker
  LOGNAME=expo
  SYSTEMD_EXEC_PID=1323
  HOME=/home/expo
  LANG=en_US.UTF-8
  MEMORY_PRESSURE_WATCH=/sys/fs/cgroup/system.slice/eas-build-worker.service/memory.pressure
  INVOCATION_ID=a6ed84ab40f040068f3ed73f38771442
  ANDROID_NDK_HOME=/home/expo/Android/Sdk/ndk/27.1.12297006
  NVM_DIR=/home/expo/.nvm
  ANDROID_HOME=/home/expo/Android/Sdk
  USER=expo
  SHLVL=0
  ANDROID_SDK_ROOT=/home/expo/Android/Sdk
  JOURNAL_STREAM=9:9578
  PATH=/home/expo/workingdir/bin:/home/expo/.nvm/versions/node/v20.19.4/bin:/opt/bundletool:/home/expo/Android/Sdk/build-tools/36.0.0:/home/expo/Android/Sdk/ndk/27.1.12297006:/home/expo/Android/Sdk/cmdline-tools/tools/bin:/home/expo/Android/Sdk/tools:/home/expo/Android/Sdk/tools/bin:/home/expo/Android/Sdk/platform-tools:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin:/home/expo/.bun/bin:/home/expo/.maestro/bin
  LOGGER_LEVEL=info
  NVM_BIN=/home/expo/.nvm/versions/node/v20.19.4/bin
  EAS_BUILD_WORKER_DIR=/home/expo/eas-build-worker
  _=/home/expo/.nvm/versions/node/v20.19.4/bin/node
  CI=1
  MAESTRO_DRIVER_STARTUP_TIMEOUT=120000
  MAESTRO_CLI_NO_ANALYTICS=1
  EAS_BUILD=true
  EAS_BUILD_RUNNER=eas-build
  EAS_BUILD_PLATFORM=android
  NVM_NODEJS_ORG_MIRROR=http://nodejs.production.caches.eas-build.internal
  EAS_BUILD_PROFILE=preview
  EAS_BUILD_GIT_COMMIT_HASH=b72d238645a536b3d8c02fbda48f02d55fd07451
  EAS_BUILD_ID=df32b116-d7db-4684-8d0b-dbf471c4e094
  EAS_BUILD_WORKINGDIR=/home/expo/workingdir/build
  EAS_BUILD_PROJECT_ID=4087ef4e-a903-468d-b293-d9652dc925a1
  ANDROID_CCACHE=/usr/bin/ccache
  EAS_BUILD_MAVEN_CACHE_URL=http://maven.production.caches.eas-build.internal
  GRADLE_OPTS=-Dorg.gradle.jvmargs="-XX:MaxMetaspaceSize=1g -Xmx4g -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8" -Dorg.gradle.parallel=true -Dorg.gradle.daemon=false
  __EAS_BUILD_ENVS_DIR=/home/expo/workingdir/env
Builder is ready, starting build
Prepare project

14s


.npmrc found at .npmrc
Read eas.json

0ms


Using eas.json:
{
  "cli": { "version": ">= 12.0.0" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" }
    },
    "production": {
      "android": { "buildType": "app-bundle" }
    }
  },
  "submit": {
    "production": {
      "android": { "serviceAccountKeyPath": "./google-services.json", "track": "production" }
    }
  }
}
Read package.json

1ms


Using package.json:
{
  "name": "apick-app",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@react-native-async-storage/async-storage": "2.2.0",
    "@supabase/supabase-js": "^2.99.2",
    "@tanstack/react-query": "^5.90.21",
    "expo": "~55.0.7",
    "expo-camera": "~55.0.10",
    "expo-constants": "~55.0.9",
    "expo-file-system": "~55.0.11",
    "expo-image-picker": "~55.0.13",
    "expo-linking": "~55.0.8",
    "expo-notifications": "~55.0.13",
    "expo-print": "~55.0.9",
    "expo-router": "~55.0.7",
    "expo-sharing": "~55.0.14",
    "expo-status-bar": "~55.0.4",
    "lucide-react-native": "^0.577.0",
    "nativewind": "^4.2.3",
    "react": "19.2.0",
    "react-hook-form": "^7.71.2",
    "react-native": "0.83.2",
    "react-native-gesture-handler": "~2.30.0",
    "react-native-qrcode-svg": "^6.3.21",
    "react-native-reanimated": "4.2.1",
    "react-native-safe-area-context": "~5.6.2",
    "react-native-screens": "~4.23.0",
    "react-native-svg": "15.15.3",
    "react-native-url-polyfill": "^3.0.0",
    "react-native-worklets": "0.7.2",
    "tailwindcss": "^3.3.2",
    "zod": "^4.3.6",
    "zustand": "^5.0.12"
  },
  "devDependencies": {
    "@types/react": "~19.2.2",
    "babel-preset-expo": "^55.0.11",
    "typescript": "~5.9.2"
  },
  "private": true
}
Install dependencies

10s


Running "npm ci --include=dev" in /home/expo/workingdir/build/ directory
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm warn deprecated text-encoding@0.7.0: no longer maintained
npm warn deprecated glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
npm warn deprecated glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
npm warn deprecated glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
npm warn deprecated glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
added 766 packages, and audited 767 packages in 11s
74 packages are looking for funding
  run `npm fund` for details
found 0 vulnerabilities
Read app config

113ms


Using app configuration:
{
  "name": "Apick",
  "slug": "apick",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": "./assets/icon.png",
  "userInterfaceStyle": "light",
  "scheme": "apick",
  "splash": {
    "image": "./assets/splash-icon.png",
    "resizeMode": "contain",
    "backgroundColor": "#2C7695"
  },
  "ios": {
    "supportsTablet": true,
    "bundleIdentifier": "id.apick.app"
  },
  "android": {
    "package": "id.apick.app",
    "adaptiveIcon": {
      "backgroundColor": "#2C7695",
      "foregroundImage": "./assets/android-icon-foreground.png",
      "backgroundImage": "./assets/android-icon-background.png",
      "monochromeImage": "./assets/android-icon-monochrome.png"
    },
    "predictiveBackGestureEnabled": false,
    "permissions": [
      "android.permission.CAMERA",
      "android.permission.RECORD_AUDIO"
    ]
  },
  "web": {
    "favicon": "./assets/favicon.png"
  },
  "plugins": [
    "expo-router",
    "expo-sharing",
    [
      "expo-camera",
      {
        "cameraPermission": "Izinkan Apick mengakses kamera untuk scan QR Code dan foto"
      }
    ],
    [
      "expo-notifications",
      {
        "icon": "./assets/notification-icon.png",
        "color": "#156064"
      }
    ]
  ],
  "extra": {
    "eas": {
      "projectId": "4087ef4e-a903-468d-b293-d9652dc925a1"
    },
    "router": {}
  },
  "sdkVersion": "55.0.0",
  "platforms": [
    "ios",
    "android"
  ]
}
Resolve build configuration

9s


The field "cli.appVersionSource" is not set, but it will be required in the future. Learn more: https://docs.expo.dev/build-reference/app-versions/
Resolved "preview" environment for the build. Learn more: https://docs.expo.dev/eas/environment-variables/#setting-the-environment-for-your-builds
No environment variables with visibility "Plain text" and "Sensitive" found for the "preview" environment on EAS.
The field "cli.appVersionSource" is not set, but it will be required in the future. Learn more: https://docs.expo.dev/build-reference/app-versions/
✔ Using remote Android credentials (Expo server)
✔ Using Keystore from configuration: Build Credentials UyRQ-OyZ3L (default)
- Computing project fingerprint
✔ Computed project fingerprint
Run expo doctor

4s


Running "expo doctor"
Running 17 checks on your project...
17/17 checks passed. No issues detected!
Prebuild

4s


- Creating native directory (./android)
✔ Created native directory
- Updating package.json
✔ Updated package.json
- Running prebuild
» android: userInterfaceStyle: Install expo-system-ui in your project to enable this feature.
- Running prebuild
✔ Finished prebuild
Running "npm install --include=dev" in /home/expo/workingdir/build directory
up to date, audited 767 packages in 1s
74 packages are looking for funding
  run `npm fund` for details
found 0 vulnerabilities
Restore cache

1s


Restoring cache key: android-ccache-09056065a2f8f915f804105ca725cde121a38f2afd9c7cf64c64c1ff8540c4e7
Matched cache key: android-ccache-b17643cfc6e93a3c4bc910bb9781b55c32880ae825e8161d15aaf182c2632f7a. Downloading...
Cache restored successfully (prefix match)
Prepare credentials

4ms


Writing secrets to the project's directory
Injecting signing config into build.gradle
Signing config injected
Bundle JavaScript

25s


Starting Metro Bundler
Android node_modules/expo-router/entry.js ▓▓▓░░░░░░░░░░░░░ 21.8% ( 88/259)
Android node_modules/expo-router/entry.js ▓▓▓▓▓▓░░░░░░░░░░ 41.3% (460/716)
Android node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓░░░░░░ 68.6% ( 857/1035)
Android node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓▓▓░░░░ 80.0% (1212/1370)
Android node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░ 86.8% (1506/1618)
Android Bundled 19569ms node_modules/expo-router/entry.js (1795 modules)
Writing bundle output to: /tmp/wqi6i9uah2a/index.js
Copying 33 asset files
Done writing bundle output
Run gradlew

15m 22s


Running 'gradlew :app:assembleRelease' in /home/expo/workingdir/build/android
Welcome to Gradle 9.0.0!
Here are the highlights of this release:
 - Configuration Cache is the recommended execution mode
 - Gradle requires JVM 17 or higher to run
- Build scripts use Kotlin 2.2 and Groovy 4.0
 - Improved Kotlin DSL script compilation avoidance
For more details see https://docs.gradle.org/9.0.0/release-notes.html
To honour the JVM settings for this build a single-use Daemon process will be forked. For more on this, please refer to https://docs.gradle.org/9.0.0/userguide/gradle_daemon.html#sec:disabling_the_daemon in the Gradle documentation.
Daemon will be stopped at the end of the build
> Task :gradle-plugin:settings-plugin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-gradle-plugin:expo-autolinking-plugin-shared:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :gradle-plugin:shared:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:pluginDescriptors
> Task :gradle-plugin:settings-plugin:pluginDescriptors
> Task :gradle-plugin:settings-plugin:processResources
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:processResources
> Task :gradle-plugin:shared:processResources NO-SOURCE
> Task :expo-gradle-plugin:expo-autolinking-plugin-shared:processResources NO-SOURCE
> Task :gradle-plugin:shared:compileKotlin
> Task :gradle-plugin:shared:compileJava NO-SOURCE
> Task :gradle-plugin:shared:classes UP-TO-DATE
> Task :gradle-plugin:shared:jar
> Task :expo-gradle-plugin:expo-autolinking-plugin-shared:compileKotlin
> Task :expo-gradle-plugin:expo-autolinking-plugin-shared:compileJava NO-SOURCE
> Task :expo-gradle-plugin:expo-autolinking-plugin-shared:classes UP-TO-DATE
> Task :expo-gradle-plugin:expo-autolinking-plugin-shared:jar
> Task :gradle-plugin:settings-plugin:compileKotlin
> Task :gradle-plugin:settings-plugin:compileJava NO-SOURCE
> Task :gradle-plugin:settings-plugin:classes
> Task :gradle-plugin:settings-plugin:jar
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:compileKotlin
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:compileJava NO-SOURCE
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:classes
> Task :expo-gradle-plugin:expo-autolinking-settings-plugin:jar
> Task :expo-gradle-plugin:expo-max-sdk-override-plugin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-module-gradle-plugin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-gradle-plugin:expo-autolinking-plugin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :gradle-plugin:react-native-gradle-plugin:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-module-gradle-plugin:pluginDescriptors
> Task :expo-module-gradle-plugin:processResources
> Task :expo-gradle-plugin:expo-autolinking-plugin:pluginDescriptors
> Task :expo-gradle-plugin:expo-max-sdk-override-plugin:pluginDescriptors
> Task :expo-gradle-plugin:expo-autolinking-plugin:processResources
> Task :expo-gradle-plugin:expo-max-sdk-override-plugin:processResources
> Task :gradle-plugin:react-native-gradle-plugin:pluginDescriptors
> Task :gradle-plugin:react-native-gradle-plugin:processResources
> Task :expo-gradle-plugin:expo-max-sdk-override-plugin:compileKotlin
> Task :expo-gradle-plugin:expo-max-sdk-override-plugin:compileJava NO-SOURCE
> Task :expo-gradle-plugin:expo-max-sdk-override-plugin:classes
> Task :expo-gradle-plugin:expo-max-sdk-override-plugin:jar
> Task :expo-gradle-plugin:expo-autolinking-plugin:compileKotlin
> Task :expo-gradle-plugin:expo-autolinking-plugin:compileJava NO-SOURCE
> Task :expo-gradle-plugin:expo-autolinking-plugin:classes
> Task :expo-gradle-plugin:expo-autolinking-plugin:jar
> Task :gradle-plugin:react-native-gradle-plugin:compileKotlin
> Task :gradle-plugin:react-native-gradle-plugin:compileJava NO-SOURCE
> Task :gradle-plugin:react-native-gradle-plugin:classes
> Task :gradle-plugin:react-native-gradle-plugin:jar
> Task :expo-module-gradle-plugin:compileKotlin
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/expo-module-gradle-plugin/src/main/kotlin/expo/modules/plugin/android/AndroidLibraryExtension.kt:9:24 'var targetSdk: Int?' is deprecated. Will be removed from library DSL in v9.0. Use testOptions.targetSdk or/and lint.targetSdk instead.
> Task :expo-module-gradle-plugin:compileJava NO-SOURCE
> Task :expo-module-gradle-plugin:classes
> Task :expo-module-gradle-plugin:jar
> Configure project :
[ExpoRootProject] Using the following versions:
- buildTools:  36.0.0
- minSdk:      24
- compileSdk:  36
- targetSdk:   36
  - ndk:         27.1.12297006
  - kotlin:      2.1.20
  - ksp:         2.1.20-2.0.1
> Configure project :app
ℹ️  Applying gradle plugin 'expo-max-sdk-override-plugin'
  [expo-max-sdk-override-plugin] This plugin will find all permissions declared with `android:maxSdkVersion`. If there exists a declaration with the `android:maxSdkVersion` annotation and another one without, the plugin will remove the annotation from the final merged manifest. In order to see a log with the changes run a clean build of the app.
> Configure project :expo
Using expo modules
  - expo-log-box (55.0.7)
  - expo-constants (55.0.9)
> Configure project :expo-modules-core
Linking react-native-worklets native libs into expo-modules-core build tasks
task ':react-native-worklets:mergeDebugNativeLibs'
task ':react-native-worklets:mergeReleaseNativeLibs'
> Configure project :expo
  - expo-modules-core (55.0.16)
  - [📦] expo-dom-webview (55.0.3)
  - [📦] expo-application (55.0.10)
  - [📦] expo-asset (55.0.9)
  - [📦] expo-camera (55.0.10)
  - [📦] expo-file-system (55.0.11)
  - [📦] expo-font (55.0.4)
  - [📦] expo-image (55.0.6)
  - [📦] expo-image-loader (55.0.0)
  - [📦] expo-image-picker (55.0.13)
  - [📦] expo-keep-awake (55.0.4)
  - [📦] expo-linking (55.0.8)
  - [📦] expo-notifications (55.0.13)
  - [📦] expo-print (55.0.9)
  - [📦] expo-router (55.0.7)
  - [📦] expo-sharing (55.0.14)
> Task :expo-log-box:preBuild UP-TO-DATE
> Task :expo-modules-core:preBuild UP-TO-DATE
> Task :expo:generatePackagesList
> Task :expo:preBuild
> Task :app:generateAutolinkingNewArchitectureFiles
> Task :app:generateAutolinkingPackageList
> Task :app:generateCodegenSchemaFromJavaScript SKIPPED
> Task :app:generateCodegenArtifactsFromSchema SKIPPED
> Task :app:generateReactNativeEntryPoint
> Task :react-native-reanimated:assertMinimalReactNativeVersionTask
> Task :react-native-reanimated:assertNewArchitectureEnabledTask SKIPPED
> Task :react-native-reanimated:assertWorkletsVersionTask
> Task :react-native-gesture-handler:generateCodegenSchemaFromJavaScript
> Task :expo-constants:createExpoConfig
> Task :expo-constants:preBuild
> Task :react-native-async-storage_async-storage:generateCodegenSchemaFromJavaScript
The NODE_ENV environment variable is required but was not specified. Ensure the project is bundled with Expo CLI or NODE_ENV is set. Using only .env.local and .env
> Task :react-native-reanimated:generateCodegenSchemaFromJavaScript
> Task :react-native-safe-area-context:generateCodegenSchemaFromJavaScript
> Task :react-native-gesture-handler:generateCodegenArtifactsFromSchema
> Task :react-native-gesture-handler:preBuild
> Task :react-native-async-storage_async-storage:generateCodegenArtifactsFromSchema
> Task :react-native-async-storage_async-storage:preBuild
> Task :react-native-reanimated:generateCodegenArtifactsFromSchema
> Task :react-native-reanimated:prepareReanimatedHeadersForPrefabs
> Task :react-native-reanimated:preBuild
> Task :react-native-safe-area-context:generateCodegenArtifactsFromSchema
> Task :react-native-safe-area-context:preBuild
> Task :react-native-reanimated:preReleaseBuild
> Task :expo:preReleaseBuild
> Task :react-native-screens:generateCodegenSchemaFromJavaScript
> Task :react-native-svg:generateCodegenSchemaFromJavaScript
> Task :react-native-worklets:assertMinimalReactNativeVersionTask
> Task :react-native-worklets:assertNewArchitectureEnabledTask SKIPPED
> Task :expo:mergeReleaseJniLibFolders
> Task :expo:mergeReleaseNativeLibs NO-SOURCE
> Task :expo:copyReleaseJniLibsProjectOnly
> Task :expo-constants:preReleaseBuild
> Task :expo-constants:mergeReleaseJniLibFolders
> Task :expo-constants:mergeReleaseNativeLibs NO-SOURCE
> Task :expo-constants:copyReleaseJniLibsProjectOnly
> Task :expo-log-box:preReleaseBuild UP-TO-DATE
> Task :expo-log-box:mergeReleaseJniLibFolders
> Task :expo-log-box:mergeReleaseNativeLibs NO-SOURCE
> Task :expo-log-box:copyReleaseJniLibsProjectOnly
> Task :expo-modules-core:preReleaseBuild UP-TO-DATE
> Task :expo-modules-core:mergeReleaseJniLibFolders
> Task :react-native-async-storage_async-storage:preReleaseBuild
> Task :react-native-async-storage_async-storage:mergeReleaseJniLibFolders
> Task :react-native-async-storage_async-storage:mergeReleaseNativeLibs NO-SOURCE
> Task :react-native-async-storage_async-storage:copyReleaseJniLibsProjectOnly
> Task :react-native-gesture-handler:preReleaseBuild
> Task :react-native-gesture-handler:mergeReleaseJniLibFolders
> Task :react-native-worklets:generateCodegenSchemaFromJavaScript
> Task :react-native-reanimated:mergeReleaseJniLibFolders
> Task :react-native-safe-area-context:preReleaseBuild
> Task :react-native-safe-area-context:mergeReleaseJniLibFolders
> Task :react-native-safe-area-context:mergeReleaseNativeLibs NO-SOURCE
> Task :react-native-screens:generateCodegenArtifactsFromSchema
> Task :react-native-screens:preBuild
> Task :react-native-screens:preReleaseBuild
> Task :react-native-safe-area-context:copyReleaseJniLibsProjectOnly
> Task :react-native-gesture-handler:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-svg:generateCodegenArtifactsFromSchema
> Task :react-native-svg:preBuild
> Task :react-native-svg:preReleaseBuild
> Task :react-native-gesture-handler:generateReleaseBuildConfig
> Task :react-native-svg:mergeReleaseJniLibFolders
> Task :react-native-svg:mergeReleaseNativeLibs
NO-SOURCE
> Task :react-native-gesture-handler:generateReleaseResValues
> Task :react-native-svg:copyReleaseJniLibsProjectOnly
> Task :react-native-gesture-handler:generateReleaseResources
> Task :react-native-reanimated:generateReleaseBuildConfig
> Task :react-native-reanimated:generateReleaseResValues
> Task :react-native-reanimated:generateReleaseResources
> Task :react-native-gesture-handler:packageReleaseResources
> Task :react-native-reanimated:packageReleaseResources
> Task :react-native-worklets:generateCodegenArtifactsFromSchema
> Task :react-native-worklets:prepareWorkletsHeadersForPrefabs
> Task :react-native-worklets:preBuild
> Task :app:preBuild
> Task :app:preReleaseBuild
> Task :react-native-worklets:preReleaseBuild
> Task :react-native-gesture-handler:parseReleaseLocalResources
> Task :react-native-reanimated:parseReleaseLocalResources
> Task :app:mergeReleaseJniLibFolders
> Task :react-native-gesture-handler:generateReleaseRFile
> Task :react-native-reanimated:generateReleaseRFile
> Task :react-native-svg:generateReleaseBuildConfig
> Task :react-native-svg:generateReleaseResValues
> Task :react-native-reanimated:javaPreCompileRelease
> Task :react-native-svg:generateReleaseResources
> Task :react-native-gesture-handler:javaPreCompileRelease
> Task :react-native-safe-area-context:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-safe-area-context:generateReleaseBuildConfig
> Task :react-native-svg:packageReleaseResources
> Task :react-native-safe-area-context:generateReleaseResValues
> Task :react-native-svg:javaPreCompileRelease
> Task :react-native-safe-area-context:generateReleaseResources
> Task :react-native-svg:parseReleaseLocalResources
> Task :react-native-safe-area-context:packageReleaseResources
> Task :react-native-svg:generateReleaseRFile
> Task :react-native-safe-area-context:parseReleaseLocalResources
> Task :react-native-safe-area-context:generateReleaseRFile
> Task :react-native-screens:configureCMakeRelWithDebInfo[arm64-v8a]
Checking the license for package CMake 3.22.1 in /home/expo/Android/Sdk/licenses
License for package CMake 3.22.1 accepted.
Preparing "Install CMake 3.22.1 v.3.22.1".
"Install CMake 3.22.1 v.3.22.1" ready.
Installing CMake 3.22.1 in /home/expo/Android/Sdk/cmake/3.22.1
"Install CMake 3.22.1 v.3.22.1" complete.
"Install CMake 3.22.1 v.3.22.1" finished.
> Task :react-native-safe-area-context:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaView.kt:9:8 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaView.kt:50:54 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaView.kt:59:23 'val uiImplementation: UIImplementation!' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaViewShadowNode.kt:9:32 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-safe-area-context/android/src/main/java/com/th3rdwave/safeareacontext/SafeAreaViewShadowNode.kt:110:61 'class NativeViewHierarchyOptimizer : Any' is deprecated. Deprecated in Java.
> Task :react-native-svg:compileReleaseJavaWithJavac
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
> Task :react-native-safe-area-context:javaPreCompileRelease
> Task :react-native-svg:bundleLibCompileToJarRelease
> Task :react-native-async-storage_async-storage:generateReleaseBuildConfig
> Task :react-native-async-storage_async-storage:generateReleaseResValues
> Task :react-native-async-storage_async-storage:generateReleaseResources
> Task :react-native-async-storage_async-storage:packageReleaseResources
> Task :react-native-async-storage_async-storage:parseReleaseLocalResources
> Task :react-native-async-storage_async-storage:generateReleaseRFile
> Task :react-native-async-storage_async-storage:javaPreCompileRelease
> Task :react-native-safe-area-context:compileReleaseJavaWithJavac
> Task :react-native-safe-area-context:bundleLibRuntimeToDirRelease
> Task :react-native-async-storage_async-storage:compileReleaseJavaWithJavac
> Task :react-native-async-storage_async-storage:bundleLibRuntimeToDirRelease
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: /home/expo/workingdir/build/node_modules/@react-native-async-storage/async-storage/android/src/javaPackage/java/com/reactnativecommunity/asyncstorage/AsyncStoragePackage.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
> Task :react-native-worklets:configureCMakeRelWithDebInfo[arm64-v8a]
> Task :expo:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo:generateReleaseBuildConfig
> Task :expo:generateReleaseResValues
> Task :expo:generateReleaseResources
> Task :expo-constants:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-constants:generateReleaseBuildConfig
> Task :expo-constants:generateReleaseResValues
> Task :expo:packageReleaseResources
> Task :expo-constants:generateReleaseResources
> Task :expo:parseReleaseLocalResources
> Task :expo-constants:packageReleaseResources
> Task :expo-constants:parseReleaseLocalResources
> Task :expo:generateReleaseRFile
> Task :expo-modules-core:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-modules-core:generateReleaseBuildConfig
> Task :expo-modules-core:generateReleaseResValues
> Task :expo-constants:generateReleaseRFile
> Task :expo-modules-core:generateReleaseResources
> Task :expo-constants:javaPreCompileRelease
> Task :expo-log-box:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :expo-log-box:generateReleaseBuildConfig
> Task :expo-log-box:generateReleaseResValues
> Task :expo-log-box:generateReleaseResources
> Task :expo-modules-core:packageReleaseResources
> Task :expo-modules-core:parseReleaseLocalResources
> Task :expo-log-box:packageReleaseResources
> Task :expo-modules-core:javaPreCompileRelease
> Task :expo-log-box:parseReleaseLocalResources
> Task :expo-modules-core:generateReleaseRFile
> Task :expo-log-box:javaPreCompileRelease
> Task :expo-log-box:generateReleaseRFile
> Task :expo:javaPreCompileRelease
> Task :react-native-svg:bundleLibRuntimeToDirRelease
> Task :app:checkReleaseDuplicateClasses
> Task :app:buildKotlinToolingMetadata
> Task :app:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :app:generateReleaseBuildConfig
> Task :expo:writeReleaseAarMetadata
> Task :expo-constants:writeReleaseAarMetadata
> Task :expo-log-box:writeReleaseAarMetadata
> Task :expo-modules-core:writeReleaseAarMetadata
> Task :react-native-async-storage_async-storage:writeReleaseAarMetadata
> Task :react-native-gesture-handler:writeReleaseAarMetadata
> Task :react-native-reanimated:writeReleaseAarMetadata
> Task :react-native-safe-area-context:writeReleaseAarMetadata
> Task :react-native-svg:writeReleaseAarMetadata
> Task :app:createBundleReleaseJsAndAssets
Starting Metro Bundler
> Task :react-native-screens:buildCMakeRelWithDebInfo[arm64-v8a]
> Task :expo:extractDeepLinksRelease
> Task :expo:processReleaseManifest
> Task :expo-constants:extractDeepLinksRelease
> Task :expo-constants:processReleaseManifest
> Task :expo-log-box:extractDeepLinksRelease
> Task :expo-log-box:processReleaseManifest
> Task :expo-modules-core:extractDeepLinksRelease
> Task :expo-modules-core:processReleaseManifest
/home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/AndroidManifest.xml:8:9-11:45 Warning:
	meta-data#com.facebook.soloader.enabled@android:value was tagged at AndroidManifest.xml:8 to replace other declarations but no other declaration present
> Task :react-native-async-storage_async-storage:extractDeepLinksRelease
> Task :react-native-async-storage_async-storage:processReleaseManifest
package="com.reactnativecommunity.asyncstorage" found in source AndroidManifest.xml: /home/expo/workingdir/build/node_modules/@react-native-async-storage/async-storage/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.reactnativecommunity.asyncstorage" from the source AndroidManifest.xml: /home/expo/workingdir/build/node_modules/@react-native-async-storage/async-storage/android/src/main/AndroidManifest.xml.
> Task :react-native-gesture-handler:extractDeepLinksRelease
> Task :react-native-gesture-handler:processReleaseManifest
> Task :react-native-reanimated:extractDeepLinksRelease
> Task :react-native-reanimated:processReleaseManifest
> Task :react-native-safe-area-context:extractDeepLinksRelease
> Task :react-native-safe-area-context:processReleaseManifest
package="com.th3rdwave.safeareacontext" found in source AndroidManifest.xml: /home/expo/workingdir/build/node_modules/react-native-safe-area-context/android/src/main/AndroidManifest.xml.
Setting the namespace via the package attribute in the source AndroidManifest.xml is no longer supported, and the value is ignored.
Recommendation: remove package="com.th3rdwave.safeareacontext" from the source AndroidManifest.xml: /home/expo/workingdir/build/node_modules/react-native-safe-area-context/android/src/main/AndroidManifest.xml.
> Task :react-native-svg:extractDeepLinksRelease
> Task :react-native-svg:processReleaseManifest
> Task :expo:compileReleaseLibraryResources
> Task :expo-constants:compileReleaseLibraryResources
> Task :expo-log-box:compileReleaseLibraryResources
> Task :expo-modules-core:compileReleaseLibraryResources
> Task :react-native-async-storage_async-storage:compileReleaseLibraryResources
> Task :react-native-gesture-handler:compileReleaseLibraryResources
> Task :react-native-reanimated:compileReleaseLibraryResources
> Task :react-native-safe-area-context:compileReleaseLibraryResources
> Task :react-native-svg:compileReleaseLibraryResources
> Task :react-native-async-storage_async-storage:bundleLibCompileToJarRelease
> Task :react-native-safe-area-context:bundleLibCompileToJarRelease
> Task :expo:prepareReleaseArtProfile
> Task :expo-constants:prepareReleaseArtProfile
> Task :expo-log-box:prepareReleaseArtProfile
> Task :expo-modules-core:prepareReleaseArtProfile
> Task :react-native-async-storage_async-storage:prepareReleaseArtProfile
> Task :react-native-gesture-handler:prepareReleaseArtProfile
> Task :react-native-reanimated:prepareReleaseArtProfile
> Task :react-native-safe-area-context:prepareReleaseArtProfile
> Task :react-native-svg:prepareReleaseArtProfile
> Task :react-native-safe-area-context:bundleLibRuntimeToJarRelease
> Task :app:createBundleReleaseJsAndAssets
Android node_modules/expo-router/entry.js ░░░░░░░░░░░░░░░░  0.0% (0/1)
> Task :react-native-async-storage_async-storage:bundleLibRuntimeToJarRelease
> Task :react-native-screens:configureCMakeRelWithDebInfo[armeabi-v7a]
> Task :react-native-svg:bundleLibRuntimeToJarRelease
> Task :app:createBundleReleaseJsAndAssets
Android node_modules/expo-router/entry.js ▓░░░░░░░░░░░░░░░  9.8% ( 5/16)
Android node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓░░░░░░░░ 55.1% ( 761/1064)
> Task :react-native-worklets:buildCMakeRelWithDebInfo[arm64-v8a][worklets]
> Task :expo:mergeReleaseShaders
> Task :expo:compileReleaseShaders NO-SOURCE
> Task :expo:generateReleaseAssets UP-TO-DATE
> Task :expo:mergeReleaseAssets
> Task :expo-constants:mergeReleaseShaders
> Task :expo-constants:compileReleaseShaders NO-SOURCE
> Task :expo-constants:generateReleaseAssets UP-TO-DATE
> Task :expo-constants:mergeReleaseAssets
> Task :expo-log-box:mergeReleaseShaders
> Task :expo-log-box:compileReleaseShaders NO-SOURCE
> Task :expo-log-box:generateReleaseAssets UP-TO-DATE
> Task :expo-log-box:mergeReleaseAssets
> Task :expo-modules-core:mergeReleaseShaders
> Task :expo-modules-core:compileReleaseShaders NO-SOURCE
> Task :expo-modules-core:generateReleaseAssets UP-TO-DATE
> Task :expo-modules-core:mergeReleaseAssets
> Task :react-native-async-storage_async-storage:mergeReleaseShaders
> Task :react-native-async-storage_async-storage:compileReleaseShaders NO-SOURCE
> Task :react-native-async-storage_async-storage:generateReleaseAssets UP-TO-DATE
> Task :react-native-async-storage_async-storage:mergeReleaseAssets
> Task :react-native-gesture-handler:mergeReleaseShaders
> Task :react-native-gesture-handler:compileReleaseShaders NO-SOURCE
> Task :react-native-gesture-handler:generateReleaseAssets UP-TO-DATE
> Task :react-native-gesture-handler:mergeReleaseAssets
> Task :react-native-reanimated:mergeReleaseShaders
> Task :react-native-reanimated:compileReleaseShaders NO-SOURCE
> Task :react-native-reanimated:generateReleaseAssets UP-TO-DATE
> Task :react-native-reanimated:mergeReleaseAssets
> Task :react-native-safe-area-context:mergeReleaseShaders
> Task :react-native-safe-area-context:compileReleaseShaders NO-SOURCE
> Task :react-native-safe-area-context:generateReleaseAssets UP-TO-DATE
> Task :react-native-safe-area-context:mergeReleaseAssets
> Task :react-native-svg:mergeReleaseShaders
> Task :react-native-svg:compileReleaseShaders NO-SOURCE
> Task :react-native-svg:generateReleaseAssets UP-TO-DATE
> Task :react-native-svg:mergeReleaseAssets
> Task :expo:extractProguardFiles
> Task :expo-constants:extractProguardFiles
> Task :expo-modules-core:extractProguardFiles
> Task :expo-modules-core:prepareLintJarForPublish
> Task :expo-constants:prepareLintJarForPublish
> Task :expo-log-box:extractProguardFiles
> Task :expo-log-box:prepareLintJarForPublish
> Task :expo:prepareLintJarForPublish
> Task :react-native-async-storage_async-storage:processReleaseJavaRes NO-SOURCE
> Task :react-native-async-storage_async-storage:createFullJarRelease
> Task :react-native-async-storage_async-storage:extractProguardFiles
> Task :app:createBundleReleaseJsAndAssets
Android node_modules/expo-router/entry.js ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ 99.9% (1795/1795)
Android Bundled 13037ms node_modules/expo-router/entry.js (1795 modules)
Writing bundle output to: /home/expo/workingdir/build/android/app/build/generated/assets/react/release/index.android.bundle
Writing sourcemap output to: /home/expo/workingdir/build/android/app/build/intermediates/sourcemaps/react/release/index.android.bundle.packager.map
Copying 33 asset files
Done writing bundle output
Done writing sourcemap output
> Task :react-native-screens:buildCMakeRelWithDebInfo[armeabi-v7a]
> Task :react-native-screens:configureCMakeRelWithDebInfo[x86]
> Task :react-native-async-storage_async-storage:generateReleaseLintModel
> Task :react-native-async-storage_async-storage:prepareLintJarForPublish
> Task :react-native-gesture-handler:extractProguardFiles
> Task :react-native-reanimated:processReleaseJavaRes NO-SOURCE
> Task :react-native-reanimated:extractProguardFiles
> Task :react-native-reanimated:prepareLintJarForPublish
> Task :react-native-svg:processReleaseJavaRes NO-SOURCE
> Task :react-native-svg:createFullJarRelease
> Task :react-native-svg:extractProguardFiles
> Task :react-native-svg:generateReleaseLintModel
> Task :react-native-svg:prepareLintJarForPublish
> Task :react-native-gesture-handler:prepareLintJarForPublish
> Task :react-native-safe-area-context:processReleaseJavaRes
> Task :react-native-safe-area-context:createFullJarRelease
> Task :react-native-safe-area-context:extractProguardFiles
> Task :react-native-safe-area-context:generateReleaseLintModel
> Task :react-native-safe-area-context:prepareLintJarForPublish
> Task :react-native-gesture-handler:extractDeepLinksForAarRelease
> Task :react-native-safe-area-context:stripReleaseDebugSymbols NO-SOURCE
> Task :react-native-safe-area-context:copyReleaseJniLibsProjectAndLocalJars
> Task :react-native-safe-area-context:extractDeepLinksForAarRelease
> Task :react-native-safe-area-context:extractReleaseAnnotations
> Task :react-native-safe-area-context:mergeReleaseGeneratedProguardFiles
> Task :react-native-safe-area-context:mergeReleaseConsumerProguardFiles
> Task :react-native-safe-area-context:mergeReleaseJavaResource
> Task :react-native-screens:buildCMakeRelWithDebInfo[x86]
> Task :react-native-safe-area-context:syncReleaseLibJars
> Task :react-native-safe-area-context:bundleReleaseLocalLintAar
> Task :react-native-async-storage_async-storage:stripReleaseDebugSymbols NO-SOURCE
> Task :react-native-async-storage_async-storage:copyReleaseJniLibsProjectAndLocalJars
> Task :react-native-async-storage_async-storage:extractDeepLinksForAarRelease
> Task :react-native-async-storage_async-storage:extractReleaseAnnotations
> Task :react-native-async-storage_async-storage:mergeReleaseGeneratedProguardFiles
> Task :react-native-async-storage_async-storage:mergeReleaseConsumerProguardFiles
> Task :react-native-async-storage_async-storage:mergeReleaseJavaResource
> Task :react-native-async-storage_async-storage:syncReleaseLibJars
> Task :react-native-async-storage_async-storage:bundleReleaseLocalLintAar
> Task :expo:stripReleaseDebugSymbols NO-SOURCE
> Task :expo:copyReleaseJniLibsProjectAndLocalJars
> Task :expo:extractDeepLinksForAarRelease
> Task :react-native-reanimated:extractDeepLinksForAarRelease
> Task :react-native-reanimated:mergeReleaseJavaResource
> Task :react-native-svg:stripReleaseDebugSymbols NO-SOURCE
> Task :react-native-svg:copyReleaseJniLibsProjectAndLocalJars
> Task :react-native-svg:extractDeepLinksForAarRelease
> Task :react-native-svg:extractReleaseAnnotations
> Task :react-native-svg:mergeReleaseGeneratedProguardFiles
> Task :react-native-svg:mergeReleaseConsumerProguardFiles
> Task :react-native-svg:mergeReleaseJavaResource
> Task :react-native-svg:syncReleaseLibJars
> Task :react-native-svg:bundleReleaseLocalLintAar
> Task :expo-modules-core:extractDeepLinksForAarRelease
> Task :expo-log-box:stripReleaseDebugSymbols NO-SOURCE
> Task :expo-log-box:copyReleaseJniLibsProjectAndLocalJars
> Task :expo-log-box:extractDeepLinksForAarRelease
> Task :expo-constants:stripReleaseDebugSymbols NO-SOURCE
> Task :expo-constants:copyReleaseJniLibsProjectAndLocalJars
> Task :expo-constants:extractDeepLinksForAarRelease
> Task :expo-constants:writeReleaseLintModelMetadata
> Task :expo-log-box:writeReleaseLintModelMetadata
> Task :expo-modules-core:writeReleaseLintModelMetadata
> Task :expo:writeReleaseLintModelMetadata
> Task :react-native-screens:configureCMakeRelWithDebInfo[x86_64]
> Task :react-native-worklets:configureCMakeRelWithDebInfo[armeabi-v7a]
> Task :app:generateReleaseResValues
> Task :app:generateReleaseResources
> Task :app:packageReleaseResources
> Task :app:parseReleaseLocalResources
> Task :app:createReleaseCompatibleScreenManifests
> Task :app:extractDeepLinksRelease
> Task :app:javaPreCompileRelease
> Task :app:desugarReleaseFileDependencies
> Task :app:mergeReleaseStartupProfile
> Task :react-native-screens:buildCMakeRelWithDebInfo[x86_64]
> Task :react-native-screens:mergeReleaseJniLibFolders
> Task :react-native-async-storage_async-storage:lintVitalAnalyzeRelease
> Task :react-native-screens:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :react-native-screens:generateReleaseBuildConfig
> Task :react-native-screens:generateReleaseResValues
> Task :react-native-screens:generateReleaseResources
> Task :react-native-screens:packageReleaseResources
> Task :react-native-worklets:buildCMakeRelWithDebInfo[armeabi-v7a][worklets]
> Task :app:mergeExtDexRelease
> Task :react-native-screens:mergeReleaseNativeLibs
> Task :react-native-worklets:configureCMakeRelWithDebInfo[x86]
> Task :react-native-screens:parseReleaseLocalResources
> Task :react-native-worklets:buildCMakeRelWithDebInfo[x86][worklets]
> Task :react-native-worklets:configureCMakeRelWithDebInfo[x86_64]
> Task :react-native-screens:copyReleaseJniLibsProjectOnly
> Task :react-native-screens:generateReleaseRFile
> Task :react-native-screens:javaPreCompileRelease
> Task :react-native-async-storage_async-storage:writeReleaseLintModelMetadata
> Task :react-native-reanimated:writeReleaseLintModelMetadata
> Task :react-native-svg:writeReleaseLintModelMetadata
> Task :react-native-gesture-handler:writeReleaseLintModelMetadata
> Task :react-native-worklets:buildCMakeRelWithDebInfo[x86_64][worklets]
> Task :react-native-screens:writeReleaseAarMetadata
> Task :react-native-screens:extractDeepLinksRelease
> Task :react-native-screens:processReleaseManifest
> Task :react-native-screens:compileReleaseLibraryResources
> Task :react-native-screens:prepareReleaseArtProfile
> Task :app:mergeReleaseShaders
> Task :app:compileReleaseShaders NO-SOURCE
> Task :app:generateReleaseAssets UP-TO-DATE
> Task :react-native-screens:mergeReleaseShaders
> Task :react-native-screens:compileReleaseShaders NO-SOURCE
> Task :react-native-screens:generateReleaseAssets UP-TO-DATE
> Task :react-native-screens:mergeReleaseAssets
> Task :app:extractReleaseVersionControlInfo
> Task :app:extractProguardFiles
> Task :react-native-screens:extractProguardFiles
> Task :react-native-screens:prepareLintJarForPublish
> Task :react-native-screens:stripReleaseDebugSymbols
> Task :react-native-screens:copyReleaseJniLibsProjectAndLocalJars
> Task :react-native-screens:extractDeepLinksForAarRelease
> Task :react-native-safe-area-context:writeReleaseLintModelMetadata
> Task :react-native-screens:writeReleaseLintModelMetadata
> Task :react-native-screens:compileReleaseKotlin
> Task :react-native-safe-area-context:lintVitalAnalyzeRelease
> Task :react-native-svg:lintVitalAnalyzeRelease
> Task :react-native-async-storage_async-storage:generateReleaseLintVitalModel
> Task :react-native-safe-area-context:generateReleaseLintVitalModel
> Task :react-native-svg:generateReleaseLintVitalModel
> Task :app:collectReleaseDependencies
> Task :app:sdkReleaseDependencyData
> Task :app:validateSigningRelease
> Task :app:writeReleaseAppMetadata
> Task :app:writeReleaseSigningConfigVersions
> Task :react-native-screens:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/RNScreensPackage.kt:62:9 The corresponding parameter in the supertype 'BaseReactPackage' is named 'name'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/RNScreensPackage.kt:63:9 The corresponding parameter in the supertype 'BaseReactPackage' is named 'reactContext'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/RNScreensPackage.kt:76:17 'constructor(name: String, className: String, canOverrideExistingModule: Boolean, needsEagerInit: Boolean, hasConstants: Boolean, isCxxModule: Boolean, isTurboModule: Boolean): ReactModuleInfo' is deprecated. This constructor is deprecated and will be removed in the future. Use ReactModuleInfo(String, String, boolean, boolean, boolean, boolean)].
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/Screen.kt:24:8 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/Screen.kt:54:77 Unchecked cast of '(CoordinatorLayout.Behavior<View!>?..CoordinatorLayout.Behavior<*>?)' to 'BottomSheetBehavior<Screen>'.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/Screen.kt:426:42 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenContainerViewManager.kt:6:8 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenContainerViewManager.kt:56:78 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:222:31 'var targetElevation: Float' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:225:13 'fun setHasOptionsMenu(p0: Boolean): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:404:18 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:411:22 'fun onPrepareOptionsMenu(p0: Menu): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:414:18 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackFragment.kt:419:22 'fun onCreateOptionsMenu(p0: Menu, p1: MenuInflater): Unit' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfig.kt:441:22 'val reactNativeHost: ReactNativeHost' is deprecated. You should not use ReactNativeHost directly in the New Architecture. Use ReactHost instead.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigShadowNode.kt:4:8 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigShadowNode.kt:10:5 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigViewManager.kt:9:8 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigViewManager.kt:37:78 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackViewManager.kt:6:8 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenStackViewManager.kt:65:78 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:48:42 'fun replaceSystemWindowInsets(p0: Int, p1: Int, p2: Int, p3: Int): WindowInsetsCompat' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:49:39 'val systemWindowInsetLeft: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:51:39 'val systemWindowInsetRight: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreenWindowTraits.kt:52:39 'val systemWindowInsetBottom: Int' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:4:8 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:5:8 'class NativeViewHierarchyManager : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:6:8 'class NativeViewHierarchyOptimizer : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:7:8 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:11:5 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:12:63 'class NativeViewHierarchyOptimizer : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:14:34 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/ScreensShadowNode.kt:14:106 'class NativeViewHierarchyManager : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:7:8 'object ReactFeatureFlags : Any' is deprecated. Use com.facebook.react.internal.featureflags.ReactNativeFeatureFlags instead.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:25:13 'object ReactFeatureFlags : Any' is deprecated. Use com.facebook.react.internal.featureflags.ReactNativeFeatureFlags instead.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:32:9 The corresponding parameter in the supertype 'ReactViewGroup' is named 'left'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:33:9 The corresponding parameter in the supertype 'ReactViewGroup' is named 'top'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:34:9 The corresponding parameter in the supertype 'ReactViewGroup' is named 'right'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:35:9 The corresponding parameter in the supertype 'ReactViewGroup' is named 'bottom'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:71:9 The corresponding parameter in the supertype 'RootView' is named 'childView'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:72:9 The corresponding parameter in the supertype 'RootView' is named 'ev'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:79:46 The corresponding parameter in the supertype 'RootView' is named 'ev'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:83:9 The corresponding parameter in the supertype 'RootView' is named 'childView'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:84:9 The corresponding parameter in the supertype 'RootView' is named 'ev'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/BottomSheetDialogRootView.kt:95:34 The corresponding parameter in the supertype 'RootView' is named 't'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/DimmingView.kt:63:9 The corresponding parameter in the supertype 'ReactCompoundView' is named 'touchX'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/DimmingView.kt:64:9 The corresponding parameter in the supertype 'ReactCompoundView' is named 'touchY'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/DimmingView.kt:68:9 The corresponding parameter in the supertype 'ReactCompoundViewGroup' is named 'touchX'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/bottomsheet/DimmingView.kt:69:9 The corresponding parameter in the supertype 'ReactCompoundViewGroup' is named 'touchY'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/gamma/tabs/TabsHostViewManager.kt:37:9 The corresponding parameter in the supertype 'TabsHostViewManager' is named 'view'. This may cause problems when calling this function with named arguments.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/SafeAreaView.kt:19:8 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/SafeAreaView.kt:153:45 'fun consumeDisplayCutout(): WindowInsetsCompat' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/SafeAreaView.kt:194:58 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/SafeAreaView.kt:201:31 'val uiImplementation: UIImplementation!' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/paper/SafeAreaViewShadowNode.kt:7:8 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/paper/SafeAreaViewShadowNode.kt:8:8 'class NativeViewHierarchyOptimizer : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/paper/SafeAreaViewShadowNode.kt:14:32 'class LayoutShadowNode : ReactShadowNodeImpl' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-screens/android/src/main/java/com/swmansion/rnscreens/safearea/paper/SafeAreaViewShadowNode.kt:83:63 'class NativeViewHierarchyOptimizer : Any' is deprecated. Deprecated in Java.
> Task :react-native-worklets:externalNativeBuildRelease
> Task :react-native-worklets:generateJsonModelRelease
> Task :react-native-worklets:prefabReleaseConfigurePackage
> Task :react-native-worklets:prefabReleasePackage
> Task :react-native-worklets:mergeReleaseJniLibFolders
> Task :react-native-worklets:mergeReleaseNativeLibs
> Task :react-native-worklets:copyReleaseJniLibsProjectOnly
> Task :react-native-worklets:generateReleaseBuildConfig
> Task :react-native-worklets:generateReleaseResValues
> Task :react-native-worklets:generateReleaseResources
> Task :react-native-worklets:packageReleaseResources
> Task :react-native-worklets:parseReleaseLocalResources
> Task :react-native-worklets:generateReleaseRFile
> Task :react-native-worklets:javaPreCompileRelease
> Task :react-native-reanimated:configureCMakeRelWithDebInfo[arm64-v8a]
> Task :expo-modules-core:configureCMakeRelWithDebInfo[arm64-v8a]
> Task :react-native-worklets:compileReleaseJavaWithJavac
> Task :react-native-worklets:bundleLibCompileToJarRelease
Note: /home/expo/workingdir/build/node_modules/react-native-worklets/android/src/main/java/com/swmansion/worklets/WorkletsMessageQueueThreadBase.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: /home/expo/workingdir/build/node_modules/react-native-worklets/android/src/main/java/com/swmansion/worklets/WorkletsPackage.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
> Task :react-native-worklets:bundleLibRuntimeToDirRelease
> Task :react-native-screens:compileReleaseJavaWithJavac
> Task :react-native-worklets:writeReleaseAarMetadata
> Task :react-native-screens:bundleLibRuntimeToDirRelease
> Task :react-native-reanimated:configureCMakeRelWithDebInfo[armeabi-v7a]
> Task :react-native-worklets:extractDeepLinksRelease
> Task :react-native-reanimated:configureCMakeRelWithDebInfo[x86]
> Task :react-native-worklets:processReleaseManifest
> Task :react-native-worklets:compileReleaseLibraryResources
> Task :react-native-screens:bundleLibCompileToJarRelease
> Task :app:checkReleaseAarMetadata
> Task :react-native-worklets:prepareReleaseArtProfile
> Task :app:mapReleaseSourceSetPaths
> Task :react-native-screens:bundleLibRuntimeToJarRelease
> Task :react-native-reanimated:configureCMakeRelWithDebInfo[x86_64]
> Task :react-native-reanimated:generateJsonModelRelease
> Task :react-native-reanimated:prefabReleaseConfigurePackage
> Task :app:mergeReleaseResources
> Task :expo-modules-core:buildCMakeRelWithDebInfo[arm64-v8a]
> Task :react-native-reanimated:buildCMakeRelWithDebInfo[arm64-v8a][reanimated]
> Task :react-native-gesture-handler:configureCMakeRelWithDebInfo[arm64-v8a]
> Task :app:configureCMakeRelWithDebInfo[arm64-v8a]
> Task :expo-modules-core:configureCMakeRelWithDebInfo[armeabi-v7a]
> Task :expo-modules-core:buildCMakeRelWithDebInfo[armeabi-v7a]
> Task :expo-modules-core:configureCMakeRelWithDebInfo[x86]
> Task :expo-modules-core:buildCMakeRelWithDebInfo[x86]
> Task :expo-modules-core:configureCMakeRelWithDebInfo[x86_64]
> Task :expo-modules-core:buildCMakeRelWithDebInfo[x86_64]
> Task :expo-modules-core:mergeReleaseNativeLibs
> Task :expo-modules-core:copyReleaseJniLibsProjectOnly
> Task :expo-modules-core:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/apploader/AppLoaderProvider.kt:34:52 Unchecked cast of 'Class<*>!' to 'Class<out HeadlessAppLoader>'.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/AppContext.kt:13:8 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/AppContext.kt:21:8 'typealias ErrorManagerModule = JSLoggerModule' is deprecated. Use JSLoggerModule instead.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/AppContext.kt:59:13 'val hostingRuntimeContext: MainRuntime' is deprecated. Use AppContext.runtimeContext instead.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/AppContext.kt:257:21 'typealias ErrorManagerModule = JSLoggerModule' is deprecated. Use JSLoggerModule instead.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/AppContext.kt:366:21 'val DEFAULT: Int' is deprecated. UIManagerType.DEFAULT will be deleted in the next release of React Native. Use [LEGACY] instead.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/AppContext.kt:367:10 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/defaultmodules/NativeModulesProxyModule.kt:16:5 'fun Constants(legacyConstantsProvider: () -> Map<String, Any?>): Unit' is deprecated. Use `Constant` or `Property` instead.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/views/ViewDefinitionBuilder.kt:464:16 'val errorManager: JSLoggerModule?' is deprecated. Use AppContext.jsLogger instead.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/views/ViewDefinitionBuilder.kt:464:30 'fun reportExceptionToLogBox(codedException: CodedException): Unit' is deprecated. Use appContext.jsLogger.error(...) instead.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/views/ViewManagerDefinition.kt:41:16 'val errorManager: JSLoggerModule?' is deprecated. Use AppContext.jsLogger instead.
w: file:///home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/kotlin/views/ViewManagerDefinition.kt:41:30 'fun reportExceptionToLogBox(codedException: CodedException): Unit' is deprecated. Use appContext.jsLogger.error(...) instead.
> Task :expo-modules-core:compileReleaseJavaWithJavac
Note: /home/expo/workingdir/build/node_modules/expo-modules-core/android/src/main/java/expo/modules/adapters/react/ModuleRegistryAdapter.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
> Task :expo-modules-core:bundleLibCompileToJarRelease
> Task :expo-constants:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/expo-constants/android/src/main/java/expo/modules/constants/ConstantsModule.kt:13:5 'fun Constants(legacyConstantsProvider: () -> Map<String, Any?>): Unit' is deprecated. Use `Constant` or `Property` instead.
> Task :expo-constants:compileReleaseJavaWithJavac
> Task :expo-constants:bundleLibCompileToJarRelease
> Task :expo-log-box:compileReleaseKotlin
> Task :expo-log-box:compileReleaseJavaWithJavac
> Task :expo-log-box:bundleLibCompileToJarRelease
> Task :expo:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ExpoModulesPackage.kt:34:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactActivityDelegateWrapper.kt:22:8 'class ReactInstanceManager : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactActivityDelegateWrapper.kt:102:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactActivityDelegateWrapper.kt:102:43 'class ReactInstanceManager : Any' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/ReactActivityDelegateWrapper.kt:103:21 'val reactInstanceManager: ReactInstanceManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/fetch/ExpoFetchModule.kt:31:39 'constructor(reactContext: ReactContext): ForwardingCookieHandler' is deprecated. Use the default constructor.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/fetch/NativeResponse.kt:42:16 This declaration overrides a deprecated member but is not marked as deprecated itself. Add the '@Deprecated' annotation or suppress the diagnostic.
w: file:///home/expo/workingdir/build/node_modules/expo/android/src/main/java/expo/modules/fetch/NativeResponse.kt:44:11 'fun deallocate(): Unit' is deprecated. Use sharedObjectDidRelease() instead.
> Task :expo:compileReleaseJavaWithJavac
> Task :expo:bundleLibRuntimeToDirRelease
> Task :expo-modules-core:bundleLibRuntimeToDirRelease
> Task :react-native-reanimated:buildCMakeRelWithDebInfo[armeabi-v7a][reanimated]
> Task :expo-log-box:bundleLibRuntimeToDirRelease
> Task :expo-constants:bundleLibRuntimeToDirRelease
> Task :expo:bundleLibCompileToJarRelease
> Task :expo:bundleLibRuntimeToJarRelease
> Task :expo-modules-core:bundleLibRuntimeToJarRelease
> Task :react-native-worklets:bundleLibRuntimeToJarRelease
> Task :expo-log-box:bundleLibRuntimeToJarRelease
> Task :expo-constants:bundleLibRuntimeToJarRelease
> Task :react-native-worklets:mergeReleaseShaders
> Task :react-native-worklets:compileReleaseShaders NO-SOURCE
> Task :react-native-worklets:generateReleaseAssets UP-TO-DATE
> Task :react-native-worklets:mergeReleaseAssets
> Task :expo:processReleaseJavaRes
> Task :expo:createFullJarRelease
> Task :expo-constants:processReleaseJavaRes
> Task :expo-constants:createFullJarRelease
> Task :expo-modules-core:processReleaseJavaRes
> Task :expo-modules-core:createFullJarRelease
> Task :react-native-worklets:processReleaseJavaRes NO-SOURCE
> Task :react-native-worklets:createFullJarRelease
> Task :react-native-worklets:extractProguardFiles
> Task :react-native-worklets:generateReleaseLintModel
> Task :react-native-worklets:prepareLintJarForPublish
> Task :expo-modules-core:generateReleaseLintModel
> Task :expo-constants:generateReleaseLintModel
> Task :expo-log-box:processReleaseJavaRes
> Task :expo-log-box:createFullJarRelease
> Task :expo-log-box:generateReleaseLintModel
> Task :expo:generateReleaseLintModel
> Task :react-native-screens:processReleaseJavaRes
> Task :react-native-screens:createFullJarRelease
> Task :react-native-screens:generateReleaseLintModel
> Task :react-native-screens:extractReleaseAnnotations
> Task :react-native-screens:mergeReleaseGeneratedProguardFiles
> Task :react-native-screens:mergeReleaseConsumerProguardFiles
> Task :react-native-screens:mergeReleaseJavaResource
> Task :react-native-screens:syncReleaseLibJars
> Task :react-native-screens:bundleReleaseLocalLintAar
> Task :expo:extractReleaseAnnotations
> Task :expo:mergeReleaseGeneratedProguardFiles
> Task :expo:mergeReleaseConsumerProguardFiles
> Task :expo:mergeReleaseJavaResource
> Task :expo:syncReleaseLibJars
> Task :expo:bundleReleaseLocalLintAar
> Task :expo-modules-core:stripReleaseDebugSymbols
> Task :expo-modules-core:copyReleaseJniLibsProjectAndLocalJars
> Task :expo-modules-core:extractReleaseAnnotations
> Task :expo-modules-core:mergeReleaseGeneratedProguardFiles
> Task :expo-modules-core:mergeReleaseConsumerProguardFiles
> Task :expo-modules-core:mergeReleaseJavaResource
> Task :expo-modules-core:syncReleaseLibJars
> Task :expo-modules-core:bundleReleaseLocalLintAar
> Task :react-native-worklets:stripReleaseDebugSymbols
> Task :react-native-worklets:copyReleaseJniLibsProjectAndLocalJars
> Task :react-native-worklets:extractDeepLinksForAarRelease
> Task :react-native-worklets:extractReleaseAnnotations
> Task :react-native-worklets:mergeReleaseGeneratedProguardFiles
> Task :react-native-worklets:mergeReleaseConsumerProguardFiles
> Task :react-native-worklets:mergeReleaseJavaResource
> Task :react-native-worklets:syncReleaseLibJars
> Task :react-native-worklets:bundleReleaseLocalLintAar
> Task :expo-log-box:extractReleaseAnnotations
> Task :expo-log-box:mergeReleaseGeneratedProguardFiles
> Task :expo-log-box:mergeReleaseConsumerProguardFiles
> Task :expo-log-box:mergeReleaseJavaResource
> Task :expo-log-box:syncReleaseLibJars
> Task :expo-log-box:bundleReleaseLocalLintAar
> Task :expo-constants:extractReleaseAnnotations
> Task :expo-constants:mergeReleaseGeneratedProguardFiles
> Task :expo-constants:mergeReleaseConsumerProguardFiles
> Task :expo-constants:mergeReleaseJavaResource
> Task :expo-constants:syncReleaseLibJars
> Task :expo-constants:bundleReleaseLocalLintAar
> Task :react-native-worklets:writeReleaseLintModelMetadata
> Task :expo:lintVitalAnalyzeRelease
> Task :expo-constants:lintVitalAnalyzeRelease
> Task :expo-log-box:lintVitalAnalyzeRelease
> Task :expo-modules-core:lintVitalAnalyzeRelease
> Task :react-native-screens:lintVitalAnalyzeRelease
> Task :react-native-worklets:lintVitalAnalyzeRelease
> Task :expo:generateReleaseLintVitalModel
> Task :expo-constants:generateReleaseLintVitalModel
> Task :expo-log-box:generateReleaseLintVitalModel
> Task :expo-modules-core:generateReleaseLintVitalModel
> Task :react-native-screens:generateReleaseLintVitalModel
> Task :react-native-worklets:generateReleaseLintVitalModel
> Task :react-native-gesture-handler:configureCMakeRelWithDebInfo[armeabi-v7a]
> Task :app:configureCMakeRelWithDebInfo[armeabi-v7a]
> Task :react-native-gesture-handler:configureCMakeRelWithDebInfo[x86]
> Task :app:configureCMakeRelWithDebInfo[x86]
> Task :react-native-gesture-handler:configureCMakeRelWithDebInfo[x86_64]
> Task :app:configureCMakeRelWithDebInfo[x86_64]
> Task :app:processReleaseMainManifest
/home/expo/workingdir/build/android/app/src/main/AndroidManifest.xml Warning:
	provider#expo.modules.filesystem.FileSystemFileProvider@android:authorities was tagged at AndroidManifest.xml:0 to replace other declarations but no other declaration present
/home/expo/workingdir/build/android/app/src/main/AndroidManifest.xml Warning:
	activity#expo.modules.imagepicker.ExpoCropImageActivity@android:exported was tagged at AndroidManifest.xml:0 to replace other declarations but no other declaration present
> Task :app:expoReleaseOverrideMaxSdkConflicts
---------- Expo Max Sdk Override Plugin ----------
>>> No 'android:maxSdkVersion' conflicts found
--------------------------------------------------
> Task :app:processReleaseManifest
> Task :app:processReleaseManifestForPackage
> Task :app:mergeReleaseArtProfile
> Task :app:mergeReleaseAssets
> Task :app:compressReleaseAssets
> Task :app:processReleaseResources
> Task :app:optimizeReleaseResources
> Task :react-native-reanimated:buildCMakeRelWithDebInfo[x86][reanimated]
> Task :react-native-reanimated:buildCMakeRelWithDebInfo[x86_64][reanimated]
> Task :react-native-reanimated:externalNativeBuildRelease
> Task :react-native-reanimated:prefabReleasePackage
> Task :react-native-reanimated:compileReleaseJavaWithJavac
> Task :react-native-reanimated:bundleLibCompileToJarRelease
> Task :react-native-reanimated:bundleLibRuntimeToDirRelease
Note: Some input files use or override a deprecated API.
Note: Recompile with -Xlint:deprecation for details.
Note: Some input files use unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
> Task :app:buildCMakeRelWithDebInfo[arm64-v8a]
> Task :react-native-reanimated:mergeReleaseNativeLibs
> Task :react-native-reanimated:bundleLibRuntimeToJarRelease
> Task :react-native-reanimated:createFullJarRelease
> Task :react-native-reanimated:generateReleaseLintModel
> Task :react-native-reanimated:copyReleaseJniLibsProjectOnly
> Task :react-native-reanimated:extractReleaseAnnotations
> Task :react-native-reanimated:mergeReleaseGeneratedProguardFiles
> Task :react-native-reanimated:mergeReleaseConsumerProguardFiles
> Task :react-native-reanimated:syncReleaseLibJars
> Task :react-native-reanimated:stripReleaseDebugSymbols
> Task :app:buildCMakeRelWithDebInfo[armeabi-v7a]
> Task :react-native-reanimated:copyReleaseJniLibsProjectAndLocalJars
> Task :react-native-reanimated:lintVitalAnalyzeRelease
> Task :react-native-gesture-handler:buildCMakeRelWithDebInfo[arm64-v8a]
> Task :react-native-reanimated:bundleReleaseLocalLintAar
> Task :react-native-gesture-handler:buildCMakeRelWithDebInfo[armeabi-v7a]
> Task :react-native-reanimated:generateReleaseLintVitalModel
> Task :app:buildCMakeRelWithDebInfo[x86]
> Task :react-native-gesture-handler:buildCMakeRelWithDebInfo[x86]
> Task :app:buildCMakeRelWithDebInfo[x86_64]
> Task :react-native-gesture-handler:buildCMakeRelWithDebInfo[x86_64]
> Task :react-native-gesture-handler:mergeReleaseNativeLibs
> Task :react-native-gesture-handler:copyReleaseJniLibsProjectOnly
> Task :react-native-gesture-handler:stripReleaseDebugSymbols
> Task :react-native-gesture-handler:copyReleaseJniLibsProjectAndLocalJars
> Task :app:mergeReleaseNativeLibs
> Task :react-native-gesture-handler:compileReleaseKotlin
w: file:///home/expo/workingdir/build/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/Extensions.kt:8:8 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/Extensions.kt:13:29 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/Extensions.kt:14:32 'class UIManagerModule : ReactContextBaseJavaModule, OnBatchCompleteListener, LifecycleEventListener, UIManager' is deprecated. Deprecated in Java.
w: file:///home/expo/workingdir/build/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/react/RNGestureHandlerModule.kt:173:53 This synthetic property is based on the getter function 'fun getRootViewTag(): Int' from Kotlin. In the future, synthetic properties will be available only if the base getter function came from Java. Consider replacing this property access with a 'getRootViewTag()' function call.
> Task :app:stripReleaseDebugSymbols
> Task :react-native-gesture-handler:compileReleaseJavaWithJavac
> Task :react-native-gesture-handler:bundleLibCompileToJarRelease
> Task :react-native-gesture-handler:bundleLibRuntimeToJarRelease
> Task :react-native-gesture-handler:bundleLibRuntimeToDirRelease
> Task :react-native-gesture-handler:processReleaseJavaRes
> Task :react-native-gesture-handler:createFullJarRelease
> Task :app:extractReleaseNativeSymbolTables
> Task :react-native-gesture-handler:generateReleaseLintModel
> Task :react-native-gesture-handler:extractReleaseAnnotations
> Task :react-native-gesture-handler:mergeReleaseGeneratedProguardFiles
> Task :react-native-gesture-handler:mergeReleaseConsumerProguardFiles
> Task :react-native-gesture-handler:mergeReleaseJavaResource
> Task :react-native-gesture-handler:syncReleaseLibJars
> Task :react-native-gesture-handler:bundleReleaseLocalLintAar
> Task :react-native-gesture-handler:generateReleaseLintVitalModel
> Task :app:compileReleaseKotlin
> Task :app:compileReleaseJavaWithJavac
> Task :app:dexBuilderRelease
> Task :app:mergeReleaseGlobalSynthetics
> Task :app:mergeReleaseNativeDebugMetadata
> Task :app:generateReleaseLintVitalReportModel
> Task :app:processReleaseJavaRes
> Task :react-native-gesture-handler:lintVitalAnalyzeRelease
> Task :app:lintVitalAnalyzeRelease
> Task :app:lintVitalReportRelease
> Task :app:lintVitalRelease
> Task :app:mergeDexRelease
> Task :app:compileReleaseArtProfile
> Task :app:mergeReleaseJavaResource
> Task :app:packageRelease
> Task :app:createReleaseApkListingFileRedirect
> Task :app:assembleRelease
[Incubating] Problems report is available at: file:///home/expo/workingdir/build/android/build/reports/problems/problems-report.html
Deprecated Gradle features were used in this build, making it incompatible with Gradle 10.
You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.
For more on this, please refer to https://docs.gradle.org/9.0.0/userguide/command_line_interface.html#sec:command_line_warnings in the Gradle documentation.
BUILD SUCCESSFUL in 15m 21s
568 actionable tasks: 568 executed
Upload application archive

4s


Application archives:
  - /home/expo/workingdir/build/android/app/build/outputs/apk/release/app-release.apk (113 MB)
Uploading application archive...
Save cache

2s


Saving cache key: android-ccache-09056065a2f8f915f804105ca725cde121a38f2afd9c7cf64c64c1ff8540c4e7
Pruning cache...
Preparing cache archive...
Uploading cache...
Uploaded cache archive to /tmp/save-cache-9J5Ryf/cache.tar.gz (53.2 MB).
Cache stats

82ms


Cache directory:      /home/expo/.cache/ccache
Config file:          /home/expo/.config/ccache/ccache.conf
System config file:   /etc/ccache.conf
Stats updated:        Sun Mar 22 05:20:21 2026
Cacheable calls:       780 / 828 (94.20%)
  Hits:                520 / 780 (66.67%)
    Direct:            520 / 520 (100.0%)
    Preprocessed:        0 / 520 ( 0.00%)
  Misses:              260 / 780 (33.33%)
Uncacheable calls:      48 / 828 ( 5.80%)
  Called for linking:   48 /  48 (100.0%)
Successful lookups:
  Direct:              520 / 780 (66.67%)
  Preprocessed:          0 / 260 ( 0.00%)
Local storage:
  Cache size (GiB):    0.1 / 5.0 ( 1.06%)
  Files:               520
  Hits:                520 / 780 (66.67%)
  Misses:              260 / 780 (33.33%)
  Reads:              1560
  Writes:              520
Build Details — df32b116-d7db-4684-8d0b-dbf471c4e094 — @saikigroup/apick — Expo
