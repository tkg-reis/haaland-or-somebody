'use client'
import Image from "next/image";
import Haaland01 from "../../public/images/haaland01.webp";
import { useState } from "react";
import randomInteger from "random-int";
import RadioButtonGroup from "./components/RadioButtonGroup";

export default function Home() {

  const [size, setSize] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Haaland");
  const options = ["Haaland", "Cucurella","Mbappe"];

  const optionChangeHandler = (e: any) => {
    setSelectedOption(e.target.value)
  }

  const clickHandler = () => {
    setSize(s => !s);
    console.log(randomInteger(0,9));
  }
  return (
    <>
      <h1 className="text-center m-6">{selectedOption} or somebody</h1>
      <div>
        <RadioButtonGroup 
        options={options} 
        onChange={optionChangeHandler} 
        selectedOptions={selectedOption}
        />
      </div>
      <div className="w-full mx-auto max-w-52 overflow-hidden">
        {/* image comp のmin-w-*関連を答えあわせするときに解除する */}
        <Image src={Haaland01} alt="" className={`${size ? 'scale-[1]' : 'scale-[3] min-w-96'} max-h-96 origin-top-right`} />
      </div>
      <div className="m-6 flex justify-center items-center gap-4">
        <button className="bg-zinc-800 text-slate-300 px-4 py-2 rounded-lg" onClick={() => clickHandler()}>haaland</button>
        <button className="bg-zinc-800 text-slate-300 px-4 py-2 rounded-lg" onClick={() => clickHandler()}>somebody</button>
      </div>
    </>
  );
}
