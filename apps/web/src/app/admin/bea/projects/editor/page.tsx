"use client";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TbArrowAutofitLeftFilled } from "react-icons/tb";
import { IoIosSave } from "react-icons/io";
import { HiMiniCog8Tooth } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";
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
import { useState } from "react";

function ProjectEditor() {
  const [tags, setTags] = useState(["Next.js", "Prisma"]);

  const onTagClose = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const onTagEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const inputElement = event.currentTarget;
      const newTag = inputElement.value.trim();

      // only add tag if it does not exist in the arr and not empty
      if (newTag !== "" && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        inputElement.value = "";
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button>
          <FaArrowLeftLong size={20} />
        </button>
        <h6 className="text-small">Draft: Untitled</h6>
        <div className="flex items-center gap-3">
          <button>
            <IoIosSave size={20} />
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
                <SheetTitle>Project Details</SheetTitle>
                <SheetDescription>
                  Update the metadata, slug, and live URLs for this project.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4 mx-5">
                <div className="flex flex-col">
                  <label>Title</label>
                  <input type="text" className="border rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col">
                  <label>Slug</label>
                  <input type="text" className="border rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col">
                  <label>Thumbnail</label>
                  <input type="text" className="border rounded-md px-3 py-2" />
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
                      {tags.map((tag) => (
                        <Badge
                          variant="outline"
                          key={tag}
                          className="!pl-2 !pr-0 !py-1 rounded-md bg-gray-100"
                        >
                          {tag}
                          <button
                            onClick={() => onTagClose(tag)}
                            className="ml-1 cursor-pointer hover:text-gray-500"
                          >
                            <IoIosClose size={18} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label>Github URL</label>
                  <input type="text" className="border rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col">
                  <label>Live URL</label>
                  <input type="text" className="border rounded-md px-3 py-2" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Switch id="published" />
                    <p>Publish</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <CustomEditor />
    </div>
  );
}

export default ProjectEditor;
