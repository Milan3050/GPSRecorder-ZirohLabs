# GPS Recorder

## Overview

GPS Recorder is a React Native application that allows users to record and manage their GPS coordinates. Users can easily add their current GPS location, view a list of recorded coordinates, and delete any coordinates they no longer want. The app utilizes local storage to persist data, ensuring coordinates are available even after the app is closed and reopened.

## Features

- **Add GPS Coordinate:** Tap the floating action button to add the current GPS coordinates (latitude and longitude) to the list.
- **Delete Coordinate:** Remove any coordinate from the list using the associated delete button.
- **Persistent Data:** Recorded coordinates are saved locally, so they persist even after closing the app.
- **Bonus Feature:** Tapping a coordinate opens a popup showing the corresponding address.

## Screenshots

![Initial State](link_to_screenshot) ![Coordinate List](link_to_screenshot)

## Tech Stack

- **Framework:** React Native
- **State Management:** Redux Toolkit
- **Routing:** React Navigation
- **Storage:** AsyncStorage
- **Geolocation:** React Native Community Geolocation
- **Maps:** React Native Maps
- **Permissions:** React Native Permissions

## Installation

To run this application, ensure you have [Node.js](https://nodejs.org/) installed. You can clone this repository and install the dependencies using Yarn:

```bash
git clone https://github.com/your_username/GPSRecorder.git
cd GPSRecorder
yarn install
```
