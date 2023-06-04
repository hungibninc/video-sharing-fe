<div align="center">
<h1><a href="https://video-sharing-be-production-7451.up.railway.app/" target="_blank" rel="noopener noreferrer">Funny Movie</a></h1>
</div>

<div align="center">
    <img src="https://img.shields.io/badge/-React-39a8e8?logo=react&logoColor=white">
    <img src="https://img.shields.io/badge/-Typescript-0075c5?logo=typescript&logoColor=white">
</div>

<br>

## Introduction

Funny Movie is used to share your favorite Youtube videos

### Features
- authenticate user
- create new user
- create video
- show all videoes
- real-time notification about the newly shared video

## Prerequisites

- Node v18.10.0

## Installation & Configuration

To get a local copy up and running, follow these simple example steps.

#### Get files
1. Open your terminal or command prompt.
2. If you do not have git installed in your system, skip this step and go to step 3; otherwise, go to the directory where you want to copy the project files and clone it by copying this text into your command prompt/terminal:
   
```
  git clone git@github.com:hungibninc/video-sharing-fe.git
```
  <br>

1. Download the program files by clicking on the green button that says “**Code**” on the upper right side of the project frame.
2. You will see a dropdown menu. Click on “**Download ZIP**.”
3. Go to the directory where you downloaded the **ZIP file** and open it. Extract its contents to any directory you want in your system.

### Local deploy

#### Install Dependencies
1. If you are not in your system terminal/command prompt already, please open it and go to the directory where you cloned the remote repository or extracted the project files.
2. While in the project root directory, type
   
```
yarn
```

This command will install all the necessary dependencies in your system.

## Running the app

**Note:** _Funny Movie API backend must start first_. The [repo for the back-end is here](https://github.com/hungibninc/video-sharing-be)

#### development mode
```bash
$ yarn run dev
```

## Test

#### unit tests

```bash
$ yarn run test
```

#### e2e tests
```bash
$ yarn run test:e2e
```

#### test coverage
```bash
$ yarn run coverage
```

## Usage

Follow these steps.

Open Chrome browser
- create users
- share a Youtube video

Open Firefox browser or any other browser
- create users
- share a Youtube video

Once a user in Chrome shares a video, a real-time notification notifies the user in Firefox as a top banner