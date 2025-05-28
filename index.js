const fse = require("fs-extra");
const path = require("path");
const simpleGit = require("simple-git");

// Use the correct Windows path format for your parent folder
const parentFolder = "D:\\andaihub_ai_voice_builder";
const childFolder = "voice_agent"; // Replace with your actual child folder name

// Create a unique name with formatted date
const now = new Date();
const dateString = `${now.getFullYear()}-${(now.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}_${now
  .getHours()
  .toString()
  .padStart(2, "0")}-${now.getMinutes().toString().padStart(2, "0")}-${now
  .getSeconds()
  .toString()
  .padStart(2, "0")}`;
const copiedChildFolder = `${childFolder}_${dateString}`;

const sourcePath = path.join(parentFolder, childFolder);
const destinationPath = path.join(parentFolder, copiedChildFolder);

console.log("Source path:", sourcePath);
console.log("Destination path:", destinationPath);

try {
  // Copy the folder
  fse.copySync(sourcePath, destinationPath);
  console.log(`Folder copied successfully as: ${copiedChildFolder}`);

  // Modify the Dockerfile port
  modifyDockerfilePort(destinationPath, 9077, 9051);

  // Initialize git in the new folder
  const git = simpleGit(destinationPath);

  // Push to GitHub
  pushToGitHub(git, copiedChildFolder);
} catch (error) {
  console.error("Error in operation:", error);
}

function modifyDockerfilePort(folderPath, oldPort, newPort) {
  const dockerfilePath = path.join(folderPath, "Dockerfile");
  
  try {
    // Check if Dockerfile exists
    if (!fse.existsSync(dockerfilePath)) {
      console.log("Dockerfile not found, skipping port modification");
      return;
    }

    // Read the Dockerfile content
    let dockerfileContent = fse.readFileSync(dockerfilePath, "utf8");
    
    // Replace the EXPOSE port
    const oldExposePattern = new RegExp(`EXPOSE\\s+${oldPort}`, "g");
    const newExposeStatement = `EXPOSE ${newPort}`;
    
    if (dockerfileContent.match(oldExposePattern)) {
      dockerfileContent = dockerfileContent.replace(oldExposePattern, newExposeStatement);
      
      // Write the modified content back to the file
      fse.writeFileSync(dockerfilePath, dockerfileContent, "utf8");
      console.log(`Successfully changed EXPOSE port from ${oldPort} to ${newPort} in Dockerfile`);
    } else {
      console.log(`Port ${oldPort} not found in Dockerfile EXPOSE statement`);
    }
    
  } catch (error) {
    console.error("Error modifying Dockerfile:", error);
  }
}

async function pushToGitHub(git, folderName) {
  try {
    // Check if git is already initialized (if .git exists)
    const isRepo = await git.checkIsRepo();

    console.log("Is this a git repository?", isRepo);

    // if (!isRepo) {
    //   // Initialize git repository if it doesn't exist
    //   console.log("Initializing git repository...");
    //   await git.init();

    //   // Configure remote origin (replace with your repository URL)
    //   console.log("Adding remote origin...");
    //   await git.addRemote(
    //     "origin",
    //     "https://github.com/vivekChenna/voice_agents.git"
    //   );
    // }

    // Add all files
    console.log("Adding files to git...");
    await git.add(".");

    // Commit changes
    console.log("Committing changes...");
    await git.commit(`Add ${folderName} with port updated to 9078`);

    // Push to remote repository
    console.log("Pushing to GitHub...");
    await git.push("origin", "master"); // or 'main' depending on your default branch

    console.log("Successfully pushed to GitHub!");
  } catch (error) {
    console.error("Error pushing to GitHub:", error);
  }
}