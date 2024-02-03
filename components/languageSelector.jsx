import { LANGUAGE_VERSIONS } from "@/app/constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

export default function LanguageSelector({ language, onSelect }) {
  return (
    <div className="my-3 flex items-center gap-3">
      <label className=" font-bold text-lg block opacity-80">Language:</label>
      <select
        id="countries"
        className="border-2  text-sm rounded-md max-w-60 block w-full p-2 font-bold shadow bg-slate-950 border-gray-600 placeholder-gray-400 text-white "
        onClick={(e) => {
          onSelect(e.target.value);
          console.log(e.target.value);
        }}
      >
        {languages.map(([lang, version]) => (
          <option value={lang} className="p-3 langOption " key={lang}>
            {lang}
            &nbsp;
            <p>({version})</p>
          </option>
        ))}
      </select>
    </div>
  );
}
