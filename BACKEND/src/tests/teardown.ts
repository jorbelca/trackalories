import mongoose from "mongoose";

afterAll((done) => {
  mongoose
    .disconnect()
    .then(() => {
      console.log("Disconnected from database");
      done();
    })
    .catch((error) => {
      console.error("Error during teardown:", error);
      done(error);
    });
}, 10000);
