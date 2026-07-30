import { generateUploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@api/controller/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>({
  // tell the frontend where your Express server is running
  url: "http://localhost:3001/api/uploadthing",
});
