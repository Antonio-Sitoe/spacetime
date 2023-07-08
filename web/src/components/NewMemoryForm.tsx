"use client";

import { Camera } from "lucide-react";
import { MediaPicker } from "./MediaPicker";
import { FormEvent } from "react";
import { api } from "@/lib/api";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";

export function NewMemoryForm() {
  const { token } = parseCookies();
  const router = useRouter();

  async function handleSubmitMemories(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const fileToUploud = formData.get("coverUrl");
    let coverUrl;

    if (fileToUploud) {
      const uploadFormData = new FormData();

      uploadFormData.set("file", fileToUploud);
      const { data } = await api.post("/upload", uploadFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      coverUrl = data.fileUrl;
    }

    // await api.post(
    //   "/memories",
    //   {
    //     coverUrl,
    //     current: formData.get("content"),
    //     isPublic: formData.get("isPublic"),
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );

    // router.push("/");
  }
  return (
    <form
      onSubmit={handleSubmitMemories}
      className="flex flex-col gap-2 flex-1"
    >
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          Anexar Media
          <Camera className="w-4 h-4" />
        </label>
        <label
          htmlFor="isPublic"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            className="h-4 w-4 border-gray-400 bg-gray-700 rounded"
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
          />
          Tornar memoria publicas
        </label>
      </div>
      <MediaPicker />

      <textarea
        spellCheck={false}
        className="focus:ring-0 w-full text-gray-100 flex-1 resize-none leading-relaxed rounded border-0 bg-transparent p-0 text-lg placeholder:text-gray-400"
        name="content"
        placeholder=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores quam modi repellendus in beatae eum reprehenderit.."
      />
      <button
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
        type="submit"
      >
        Salvar
      </button>
    </form>
  );
}
