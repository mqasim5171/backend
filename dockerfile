# Step 1: Use a Node.js base image
FROM node:18

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Step 4: Copy the rest of the app
COPY . .

# Step 5: Expose the backend port and define the start command
EXPOSE 5000
CMD ["npm", "start"]
