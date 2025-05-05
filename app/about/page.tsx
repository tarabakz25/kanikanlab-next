import Image from "next/image";
import { FaTwitter, FaGithub } from "react-icons/fa";

const skills = {
  languages: ["c", "cpp", "js", "ts", "py", "html", "css"],
  frameworks: ["nextjs", "react", "nodejs", "express", "flask", "astro"],
  tools: ["git", "notion", "supabase", "vercel", "github"],
};

const histories = {
  "Apr 2023": "神山まるごと高専入学",
  "Oct 2023": "高専プログラミングコンテスト第34回福井大会 自由部門出場",
  "Aug 2024": "TwoGate DevCamp 2024 Summer TwoGate賞",
  "Oct 2024": "高専プログラミングコンテスト第35回奈良大会 競技部門出場",
  "Jan 2025": "神山まるごと高専学内ハッカソン 特別賞",
  "Mar 2025": "KanikanLab設立",
};

export default function About() {
  return (
    <div className="flex flex-col gap-30 bg-white pt-50 pb-20 text-black dark:bg-black dark:text-white">
      <div className="mx-auto flex flex-col gap-20 px-4 py-4 text-center">
        <h1 className="font-[krok] text-5xl tracking-wider">About</h1>
        <div className="flex items-center justify-center gap-10">
          <Image
            src="/about.png"
            alt="about"
            width={1000}
            height={1000}
            className="h-auto w-64 rounded-4xl"
          />
          <div className="text-left">
            <h2 className="font-[krok] text-5xl tracking-wider">Kizuki Aiki</h2>
            <div className="gap-2">
              <p className="text-1xl">相木絆煌</p>
              <p className="text-2xl">神山まるごと高専の一期生</p>
            </div>
            <div className="flex pt-10 items-center justify-center gap-10 text-3xl">
              <a
                href="https://github.com/tarabakz25"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="transition-all hover:scale-110" />
              </a>
              <a
                href="https://twitter.com/kz25_kmc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="transition-all hover:scale-110" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-10">
        <h1 className="font-[krok] text-5xl tracking-wider">Skills</h1>
        <div className="flex flex-col items-center gap-2">
          <h3>Languages</h3>
          <div className="flex gap-10">
            {skills.languages.map((language) => (
              <img
                src={`https://skillicons.dev/icons?i=${language}&theme=dark`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3>Frameworks</h3>
          <div className="flex gap-10">
            {skills.frameworks.map((framework) => (
              <img
                src={`https://skillicons.dev/icons?i=${framework}&theme=dark`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3>Tools</h3>
          <div className="flex gap-10">
            {skills.tools.map((tool) => (
              <img src={`https://skillicons.dev/icons?i=${tool}&theme=dark`} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-10">
        <h1 className="font-[krok] text-5xl tracking-wider">History</h1>
        <div className="flex flex-col items-start gap-5">
          {Object.entries(histories).map(([date, history]) => (
            <div className="flex flex-col items-start gap-1">
              <p className="text-sm">{date}</p>
              <p className="text-2xl">{history}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-10">
        <h1 className="font-[krok] text-5xl tracking-wider">Products</h1>
        <p className="text-2xl">Coming Soon...</p>
      </div>
    </div>
  );
}
