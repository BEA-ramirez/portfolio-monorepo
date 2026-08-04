import { createUploadthing, type FileRouter } from "uploadthing/express";

const f = createUploadthing();

export const uploadRouter = {
  // route for thumbnails
  projectThumbnail: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete((data) => {
    // logs on express server when
    console.log("Upload completed. URL:", data.file.ufsUrl);
  }),
  blogPostCoverImage: f({
    // route for blog post cover images
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete((data) => {
    // logs on express server when
    console.log("Upload completed. URL:", data.file.ufsUrl);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
