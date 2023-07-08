"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null);
  function onMediaSeleted({ target }: ChangeEvent<HTMLInputElement>) {
    const { files } = target;
    console.log(files);
    if (!files) {
      return;
    }
    const previewUrl = URL.createObjectURL(files[0]);
    setPreview(previewUrl);
  }
  return (
    <>
      <input
        onChange={onMediaSeleted}
        type="file"
        id="media"
        name="coverUrl"
        accept="image/*"
        className="invisible h-0 w-0"
      />

      {preview && (
        <Image
          src={preview}
          alt=""
          width="100"
          height="100"
          className="w-full aspect-video rounded-lg object-cover"
        />
      )}
    </>
  );
}
