/************************************************
 * 1 Day , 1 challenge , until urgh... I get gf?*
 * by Syafiqlim                                 *
 * date : 23rd January 2024                     *
 *                  Day 16 :                    *
 * CLI File Organizer (Documents , Images ,     *
 * Sounds , Videos) [Node.js , JavaScript]      *
 ************************************************
 */

const fs = require('fs').promises;
const path = require('path');

const sourceDirectory = 'S:/1Day-1Challenge/Day16/files'; // Replace with your source directory

const organizeFiles = async () => {
  try {
    const files = await fs.readdir(sourceDirectory);

    for (const file of files) {
      const filePath = path.join(sourceDirectory, file);

      // Check if it's a file
      const isFile = (await fs.stat(filePath)).isFile();

      if (isFile) {
        const fileExtension = path.extname(file).toLowerCase();
        const destinationDirectory = getDestinationDirectory(fileExtension);

        // Create destination directory if it doesn't exist
        await fs.mkdir(destinationDirectory, { recursive: true });

        // Move the file to the destination directory
        await fs.rename(filePath, path.join(destinationDirectory, file));

        console.log(`Moved ${file} to ${destinationDirectory}`);
      }
    }

    console.log('Files organized successfully.');
  } catch (error) {
    console.error('Error organizing files:', error);
  }
};

const getDestinationDirectory = (fileExtension) => {
  switch (fileExtension) {
    case '.jpg':
    case '.png':
    case '.gif':
      return path.join(sourceDirectory, 'Images');
    case '.pdf':
    case '.doc':
    case '.docx':
      return path.join(sourceDirectory, 'Documents');
    case '.mp4':
    case '.avi':
    case '.mkv':
      return path.join(sourceDirectory, 'Videos');
    case '.mp3':
    case '.wav':
      return path.join(sourceDirectory, 'Sounds');
    default:
      return path.join(sourceDirectory, 'Other');
  }
};

// Run the file organization
organizeFiles();
