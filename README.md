# rtsp2hls
## Package Name: rtsp2hls

### Description:
rtsp2hls is a Node.js package that provides functionality to convert rtsp to web  video streaming using FFmpeg. It allows users to start and stop FFmpeg processes for streaming video feeds, as well as manage the associated data.

### Installation:
```
npm install rtsp2hls
```

### Usage:
```javascript
const { startFfmpeg, stopFfmpeg, getAllfeeds } = require('rtsp2hls');

// Starting FFmpeg process for video streaming
startFfmpeg(name, inputSource)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

// Stopping FFmpeg process for video streaming
stopFfmpeg(name)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

// Retrieving all active video feeds
const feeds = getAllfeeds();
console.log(feeds);
```

### Functions:

#### `startFfmpeg(name, inputSource)`
- Description: Starts an FFmpeg process for streaming a video feed.
- Parameters:
  - `name` (string): The name of the video feed.
  - `inputSource` (string): The input source (e.g., RTSP stream URL) for the video feed.
- Returns: A promise that resolves to an object containing the status and message.

#### `stopFfmpeg(name)`
- Description: Stops the FFmpeg process associated with a video feed.
- Parameters:
  - `name` (string): The name of the video feed.
- Returns: A promise that resolves to an object containing the status and message.

#### `getAllfeeds()`
- Description: Retrieves all active video feeds.
- Returns: An array of objects representing the active video feeds, including their names, input sources, and associated FFmpeg processes.

Note: The `startFfmpeg` and `stopFfmpeg` functions are asynchronous and return promises to handle the process execution and result.

### Example:
```javascript
const { startFfmpeg, stopFfmpeg, getAllfeeds } = require('rtsp2hls');

// Start FFmpeg process for a video feed
startFfmpeg('feed1', 'rtsp://example.com/stream1')
  .then((result) => {
    console.log(result); // { status: true, message: 'Feed Added' }
  })
  .catch((error) => {
    console.error(error);
  });

// Stop FFmpeg process for a video feed
stopFfmpeg('feed1')
  .then((result) => {
    console.log(result); // { status: true, message: 'Feed Deleted' }
  })
  .catch((error) => {
    console.error(error);
  });

// Get all active video feeds
const feeds = getAllfeeds();
console.log(feeds);
```

For more details and usage examples, please refer to the package documentation.