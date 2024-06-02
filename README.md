# Vintage Adventure: Create Nostalgic Videos from Street Views

## 1. Project Overview

Vintage Adventure is a web application that lets you transform ordinary street view photos into captivating short videos with a vintage aesthetic. By narrating your own stories, you can create unique and nostalgic memories.

**Here's how it works:**

1. **Choose a location:** Select a street view location using Google Maps.
2. **Capture a snapshot:** Take a screenshot of the street view scene.
3. **Tell your story:** Record your voice narration describing the scene and the story you want to convey.
4. **Generate a vintage video:** The app uses AI to enhance your image with a vintage style and combines it with your audio narration to create a short video.

## 2. Technical Architecture

Vintage Adventure utilizes a combination of powerful technologies:

| Component       | Technology Used        | Description                                                        |
| --------------- | ---------------------- | ------------------------------------------------------------------ |
| Frontend        | React + Ionic          | Provides the user interface and interactive elements.              |
| Speech-to-Text  | (Backend API)          | Converts your voice narration into text.                           |
| AI Image Gen    | (Backend API)          | Enhances your street view image with a vintage aesthetic.          |
| Video Synthesis | (Backend API)          | Combines the enhanced image and audio narration to create a video. |
| Street View     | Google Street View     | Provides the street view imagery.                                  |
| Location Search | Google Maps Places API | Allows you to search for locations and retrieve their coordinates. |

## 3. Getting Started

### 3.1 Prerequisites

Before you can run Vintage Adventure, you'll need:

- **API Keys:**
  - A Google Maps API Key for accessing street view and location search.
- **Backend API:** You'll need a backend API that handles speech-to-text, AI image generation, and video synthesis. The frontend communicates with this API.
- **Bun:** Make sure you have Bun installed on your system. You can install it using `curl -fsSL https://bun.sh/install | bash`.

### 3.2 Setup

1. **Clone the repository:** `git clone <repository-url>`
2. **Install dependencies:** `bun install`
3. **Set environment variables:**
   - Create a `.env` file in the project's root directory.
   - Add the following lines, replacing the placeholders with your actual API keys and backend API URL:
     ```
     VITE_API_URL=YOUR_BACKEND_API_URL
     VITE_GMAPS_KEY=YOUR_GOOGLE_MAPS_API_KEY
     ```

### 3.3 Start Development Server

```bash
bun run dev
```

## 4. Project Maintenance

### 4.1 Code Style

- We use ESLint to maintain consistent code style.
- Run `bun run lint` to check for any style violations.

### 4.2 Update Dependencies

To update project dependencies, run:

```bash
bun upgrade
```

### 4.3 Deployment

Vintage Adventure can be deployed to platforms like Vercel. Refer to the platform's documentation for specific deployment instructions. You might need to configure your deployment settings to use Bun instead of Node.js.

## 5. Project Modification & Enhancement

### 5.1 Adding Features

- **More AI Models:** Integrate additional AI image generation models or video synthesis tools for more diverse styles (requires backend changes).
- **Alternative Map Services:** Explore using other map services or location search APIs.
- **Social Sharing:** Implement features to allow users to easily share their vintage videos on social media.

### 5.2 Modifying the Interface

- **Customize Styles:** Adjust the styles of Ionic components to create a unique visual experience.
- **Enhanced Interactions:** Add more interactive elements to improve user engagement.

### 5.3 Optimizing Performance

- **Image Compression:** Reduce image file sizes to improve loading times (can be handled on the backend).
- **Caching:** Implement caching mechanisms to minimize API requests and enhance performance (can be implemented on both frontend and backend).

## 6. Important Notes

- **Terms of Service:** Ensure you comply with the terms of service of Google Maps and any other services used by your backend API.
- **API Key Security:** Never expose your API keys publicly or commit them to version control. Store them securely in environment variables or a secrets management system.
- **Backups:** Regularly back up your project code and data.

## 7. Contribution

We welcome contributions! Feel free to submit issues or pull requests to help improve Vintage Adventure.

## 8. License

This project is licensed under the MIT License.
