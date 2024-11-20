import app from './app';
// import config from "./app/config";
import mongoose from 'mongoose';
import config from './app/config';
// import config from "./app/config"

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Server is running on ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
