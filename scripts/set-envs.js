require("dotenv").config();

const { writeFileSync, mkdirSync } = require("fs");

const targetPath = `./src/environments/environment.ts`;

const envFileContent = `
export const environment = {
  production: ${process.env.PRODUCTION},
  apiUrl: '${process.env.API_URL}',
  mapBoxToken: '${process.env.MAP_BOX_TOKEN}',
};
`;

mkdirSync("./src/environments", { recursive: true });

writeFileSync(targetPath, envFileContent);
