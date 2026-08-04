"use client";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TbArrowAutofitLeftFilled } from "react-icons/tb";
import { IoIosSave } from "react-icons/io";
import { HiMiniCog8Tooth } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";
import { MdOutlineDataSaverOff } from "react-icons/md";
import CustomEditor from "@/components/custom-editor";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, useWatch } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UploadButton } from "@/utils/uploadthing";

interface EditorPageProps {
  params: Promise<{
    id: string;
  }>;
}

const blogPostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required."),
  slug: z.string().min(1, "Slug is required."),
  coverImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
  excerpt: z.string().min(1, "Excerpt is required."),
  content: z.string().optional(),
  isPublished: z.boolean(),
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

function BlogPostEditor({ params }: EditorPageProps) {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resolvedParams = use(params);
  const isNewBlogPost = resolvedParams.id === "new";
  const blogPostId = isNewBlogPost ? null : resolvedParams.id;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      id: "",
      title: "",
      slug: "",
      coverImage: "",
      tags: [],
      excerpt: "",
      content: "",
      isPublished: false,
    },
  });

  useEffect(() => {
    if (isNewBlogPost) return; // if new blog post, dont fetch anything

    const fetchBlogPostData = async () => {
      setIsLoading(true);
      try {
        // fetch data from express api
        const response = await axios.get(
          `http://localhost:4000/api/blog/${blogPostId}`,
        );
        const existingData = response.data;

        reset({
          id: existingData.id,
          title: existingData.title,
          slug: existingData.slug,
          coverImage: existingData.coverImage || "",
          tags: existingData.tags || [],
          excerpt: existingData.excerpt || "",
          content: existingData.content || "",
          isPublished: existingData.isPublished,
        });
      } catch (error) {
        console.error("Failed to load blog post:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };
    fetchBlogPostData();
  }, [isNewBlogPost, blogPostId, setValue, reset]);

  const watchedTitle = useWatch({
    control,
    name: "title",
  });

  const watchedTags = useWatch({
    control,
    name: "tags",
  });

  const title = watchedTitle || "Draft: Untitled";
  const currentTags = watchedTags || [];

  const onTagClose = (tag: string) => {
    const newTags = currentTags.filter((t) => t !== tag);
    setValue("tags", newTags, { shouldValidate: true, shouldDirty: true });
  };

  const onTagEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const inputElement = event.currentTarget;
      const newTag = inputElement.value.trim();

      const existingTags = getValues("tags") || []; // what the form currently has, does not re-render

      // only add tag if it does not exist in the arr and not empty
      if (newTag !== "" && !existingTags.includes(newTag)) {
        setValue("tags", [...existingTags, newTag], {
          shouldValidate: true,
          shouldDirty: true,
        });
        inputElement.value = "";
      }
    }
  };

  const onSubmit = async (data: BlogPostFormValues) => {
    try {
      console.log("Submitting this data to the database:", data);
      if (isNewBlogPost) {
        const { id, ...creationData } = data;

        console.log("Sending POST request to create:", data);
        const response = await axios.post(
          "http://localhost:4000/api/blog",
          creationData,
        );
        if (response.data && response.data.id) {
          router.replace(`/admin/bea/blog-posts/${response.data.id}`); // recalculate the params
        }
      } else {
        console.log(
          `Sending PUT request to update blog post ${blogPostId}:`,
          data,
        );
        await axios.patch(`http://localhost:4000/api/blog/${blogPostId}`, data);
      }

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="cursor-pointer hover:text-gray-500"
        >
          <FaArrowLeftLong size={20} />
        </button>
        <h6 className="text-small">{title}</h6>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="hover:text-gray-500 cursor-pointer"
          >
            {isSubmitting ? (
              <MdOutlineDataSaverOff
                size={20}
                className="animate-spin text-violet-500"
              />
            ) : (
              <IoIosSave size={20} />
            )}
          </button>
          <button>
            <HiMiniCog8Tooth size={20} />
          </button>
          <Sheet>
            <SheetTrigger className="hover:text-gray-500 cursor-pointer">
              <TbArrowAutofitLeftFilled size={20} />
            </SheetTrigger>
            <SheetContent className="w-100 sm:w-135">
              <SheetHeader>
                <SheetTitle>Blog Post Details</SheetTitle>
                <SheetDescription>
                  Update the metadata, slug, and excerpt for this blog post.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4 mx-5">
                <div className="flex flex-col">
                  <label>Title</label>
                  <input
                    type="text"
                    {...register("title")}
                    className="border rounded-md px-3 py-2"
                  />
                  {errors.title && (
                    <span className="text-red-500 text-xsmall">
                      {errors.title.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label>Slug</label>
                  <input
                    type="text"
                    {...register("slug")}
                    className="border rounded-md px-3 py-2"
                  />
                  {errors.slug && (
                    <span className="text-red-500 text-xsmall">
                      {errors.slug.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label>Excerpt</label>
                  <input
                    type="text"
                    {...register("excerpt")}
                    className="border rounded-md px-3 py-2"
                  />
                  {errors.excerpt && (
                    <span className="text-red-500 text-xsmall">
                      {errors.excerpt.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label>Tags</label>
                  <div className="border rounded-md px-3 py-2">
                    <input
                      type="text"
                      onKeyDown={(event) => onTagEnter(event)}
                      className="border-none mb-4 w-full outline-none"
                    />
                    <div className="flex items-center gap-2 overflow-y-auto">
                      {currentTags.map((tag) => (
                        <Badge
                          variant="outline"
                          key={tag}
                          className="!pl-2 !pr-0 !py-1 rounded-md bg-gray-100"
                        >
                          {tag}
                          <button
                            onClick={(e) => {
                              e.preventDefault(); // prevents accidental form submission when deleting
                              onTagClose(tag);
                            }}
                            className="ml-1 cursor-pointer hover:text-gray-500"
                          >
                            <IoIosClose size={18} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    {errors.tags && (
                      <span className="text-red-500 text-xsmall">
                        {errors.tags.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label>Cover Image</label>
                  {/* <input
                    type="file"
                    {...register("thumbnail")}
                    className="block w-full mt-3 text-small file:mr-4  file:border-0 file:px-4  file:text file:text-small file:font-semibold hover:file:text-gray-500 file:border-r-2"
                  /> */}

                  <UploadButton
                    endpoint="blogPostCoverImage" // matches the name in core.ts
                    appearance={{
                      // Style the button to match your sleek black-and-white theme
                      button:
                        "bg-black text-white hover:bg-gray-800 transition-colors rounded-md px-4 py-2 text-sm font-medium focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black outline-none",
                      // Wrap it tightly so it doesn't take up the whole screen width
                      container: "w-max flex-col items-start",
                      // Mute the helper text
                      allowedContent: "text-gray-400 text-xs mt-1",
                    }}
                    onClientUploadComplete={(res) => {
                      // res[0].url is the permanent string you save to your database
                      setValue("coverImage", res[0].ufsUrl, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                  {errors.coverImage && (
                    <span className="text-red-500 text-xsmall">
                      {errors.coverImage.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col mt-4">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Controller
                      name="isPublished"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          id="published"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <label
                      htmlFor="published"
                      className="font-semibold cursor-pointer select-none"
                    >
                      Publish
                    </label>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-100">
          <MdOutlineDataSaverOff
            size={30}
            className="animate-spin text-violet-500"
          />
        </div>
      ) : (
        <CustomEditor
          initialValue={getValues("content")}
          onChange={(markdownString) => {
            setValue("content", markdownString, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />
      )}

      {showToast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl text-small font-medium animate-in fade-in zoom-in duration-200">
            ✨ Blog post saved successfully!
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogPostEditor;
