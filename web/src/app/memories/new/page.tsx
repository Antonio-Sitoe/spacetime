import { Camera, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewMemory() {
  return (
    <div className="flex flex-1 flex-col gap-4 ">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar a timeline
      </Link>

      <form action="" className="flex flex-col gap-2 flex-1">
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
        <input type="file" id="media" className="invisible h-0 w-0" />
        <textarea
          spellCheck={false}
          className="focus:ring-0 w-full text-gray-100 flex-1 resize-none leading-relaxed rounded border-0 bg-transparent p-0 text-lg placeholder:text-gray-400"
          name="content"
          placeholder=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores quam modi repellendus in beatae eum reprehenderit.."
        />
      </form>
    </div>
  );
}
