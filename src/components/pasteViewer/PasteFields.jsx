import { LANGUAGES } from "../../utils/Languages";
import Input from "../common/Input";
import Label from "../common/Label";
import Select from "../common/Select";

export default function PasteFields({
  isEditing,
  title,
  setTitle,
  language,
  setLanguage,
}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Title */}
        <div className="mb-4 w-full sm:w-1/2">
          <Label>Title</Label>

          {isEditing ? (
            <Input
              value={title}
              onChange={setTitle}
              className="bg-slate-900 border border-slate-700 rounded-lg"
            />
          ) : (
            <div className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white">
              {title}
            </div>
          )}
        </div>

        {/* Language */}
        <div className="mb-4 w-full sm:w-1/2">
          <Label>Language</Label>

          {isEditing ? (
            <Select
              value={language}
              onChange={setLanguage}
              options={LANGUAGES}
              className="w-full"
            />
          ) : (
            <div className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white">
              {LANGUAGES.find((l) => l.value === language)?.label}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
