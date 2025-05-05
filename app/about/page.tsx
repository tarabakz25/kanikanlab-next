import Image from "next/image"
import * as Icon from "@/components/icons/index"

export default function About() {
  return (
    <div className="flex flex-col pt-50 pb-20 text-black dark:text-white bg-white dark:bg-black">
      <div className="flex flex-col mx-auto px-4 py-4 text-center gap-20">
        <h1 className="text-5xl font-[krok] tracking-wider">About</h1>
        <div className="flex justify-center items-center gap-10">
          <Image src="/about.png" alt="about" width={1000} height={1000} className="rounded-4xl w-64 h-auto" />
          <div className="text-left">
            <h2 className="text-5xl font-[krok] tracking-wider">Kizuki Aiki</h2>
            <div className="gap-2">
              <p className="text-1xl">相木絆煌</p>
              <p className="text-2xl">神山まるごと高専の一期生</p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-[krok] tracking-wider">Skills</h1>
          <div>
            <h3>Languages</h3>
              {Object.entries(Icon.Icons).map(([key, IconComponent]) => (
                <div key={key}>
                  <IconComponent />
                  <p>{key}</p>
                </div>
              ))}
          </div>
          <div>
            <h3>Frameworks</h3>
          </div>
        </div>
      </div>
    </div>
  )
}