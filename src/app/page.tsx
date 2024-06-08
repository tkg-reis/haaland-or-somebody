'use client'
import Image from "next/image";
import Haaland01 from "../../public/images/haaland01.webp";
import Haaland02 from "../../public/images/haaland02.webp";
import Haaland03 from "../../public/images/haaland03.jpg";
import Haaland04 from "../../public/images/haaland04.jpg";
import Haaland05 from "../../public/images/haaland05.jpg";
import { useEffect, useState } from "react";
import randomInteger from "random-int";
import axios from "axios";
import env from "dotenv";
env.config();

export default function Home() {
  const haaland = [Haaland01, Haaland02, Haaland03, Haaland04, Haaland05];
  const randomOrigin = ["center", "top", "top-right", "right", "bottom-right", "bottom-left", "bottom", "left", "top-left", "center"]
  const [size, setSize] = useState(false);
  const [send, setSend] = useState(false);
  const [number, setNumber] = useState(0);
  const [data, setData] = useState("");
  const timeout = 3000;
  // 拡張部分
  // const [selectedOption, setSelectedOption] = useState("Haaland");
  // const [selectedPBOption, setSelectedPBOption] = useState("金髪");
  // const options = ["Haaland", "Cucurella","Mbappe"];
  // const personChangeHandler = ( so : string ) => {
  //   if(so == "Haaland") {
  //     setSelectedPBOption("金髪")
  //   } else if(so == "Cucurella") {
  //     setSelectedPBOption("ドレットヘアー");
  //   } else if(so == "Mbappe"){
  //     setSelectedPBOption("アフリカ人");
  //   }
  // }
  // const optionChangeHandler = (e: any) => {
  //   setSelectedOption(e.target.value)
  // }
  // useEffect(() => {
  //   personChangeHandler(selectedOption);
  // },[selectedOption])

  let url = `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_APIKEY}&q=金髪`;

  useEffect(() => {
    const getData = async() => {
      try {
        const res = await axios.get(url);
        setData(res.data.hits[randomInteger(0,19)].largeImageURL)
      } catch (error) {
        console.error(error);
      }
    }
    setNumber(randomInteger(0,19));
    getData();
  },[])


  const clickHandler = () => {
    setSize(prev => !prev)
    const timer = setTimeout(() => {
      setSend(prev => !prev)
    }, timeout);
    return () => clearTimeout(timer)
  }

  useEffect(() => {
    setSize(prev => !prev)
    const getData = async() => {
      try {
        const res = await axios.get(url);
        setData(res.data.hits[randomInteger(0,19)].largeImageURL)
      } catch (error) {
        console.error(error);
      }
    }
    setNumber(randomInteger(0,19));
    getData();
  },[send])
  
  return (
    <>
      <h1 className="text-center m-6 text-lg">Haaland or somebody</h1>
      {/* ↓拡張部 */}
      {/* <div>
        <RadioButtonGroup 
        options={options} 
        // 関数渡しも可能
        onChange={optionChangeHandler} 
        selectedOptions={selectedOption}
        />
      </div> */}
      <div className="w-full flex mx-auto max-w-52 overflow-hidden">
        {/* image comp のmin-w-*関連を答えあわせするときに解除する */}
        {(number % 2 == 0) ? (<Image src={haaland[number % 5]} alt="" className={`${ size ? 'scale-[1] h-[384px] w-[250px]' : 'scale-[3] min-w-96'} max-h-96 origin-${randomOrigin[Math.trunc(number / 2)]}`} width={196} height={384}/>) : (<Image src={data} alt="" width={96} height={384} className={`${ size ? 'scale-[1] h-[384px] w-[250px]' : 'scale-[3] min-w-96'} max-h-96 origin-${randomOrigin[Math.trunc(number / 2)]}`}/>)
        }
      </div>
      <div className="m-6 flex justify-center items-center gap-4">
        <button className="bg-zinc-800 text-slate-300 px-4 py-2 rounded-lg" onClick={() => clickHandler()}>Haaland</button>
        <button className="bg-zinc-800 text-slate-300 px-4 py-2 rounded-lg" onClick={() => clickHandler()}>somebody</button>
      </div>
      <div className="max-w-[220px] mx-auto text-lg hover:underline">
        <a href="https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%BC%E3%83%AA%E3%83%B3%E3%82%B0%E3%83%BB%E3%83%8F%E3%83%BC%E3%83%A9%E3%83%B3%E3%83%89" target="_blank">Do you know Haaland???</a>
      </div>
    </>
  );
}
