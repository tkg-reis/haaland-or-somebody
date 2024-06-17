'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import randomInteger from "random-int";
import Haaland01 from "../../public/images/haaland01.webp";
import Haaland02 from "../../public/images/haaland02.webp";
import Haaland03 from "../../public/images/haaland03.jpg";
import Haaland04 from "../../public/images/haaland04.jpg";
import Haaland05 from "../../public/images/haaland05.jpg";
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Home() {
  const haaland = [Haaland01, Haaland02, Haaland03, Haaland04, Haaland05];
  const randomOrigin = ["center", "top", "top-right", "right", "bottom-right", "bottom-left", "bottom", "left", "top-left", "center"]
  const [size, setSize] = useState(false);
  const [number, setNumber] = useState(0);
  const [data, setData] = useState("");
  const timeout = 3000;
  const ENDPOINT = "/api/imgdata";

  useEffect(() => {
    let isMounted = true;
    const getData = async() => {
      try {
        const res = await fetch(ENDPOINT).then((res) => res.json());
        
        if(isMounted) {
          setData(res.hits[randomInteger(0,19)].largeImageURL)
        }
      } catch (error) {
        console.error(error);
      }
    }
    setNumber(randomInteger(0,19));
    getData();

    return () => {
      isMounted = false;
    };
  },[])


  const clickHandler = () => {
    setSize(prev => !prev);
    const getData = async() => {
      try {
        const res = await fetch(ENDPOINT).then((res) => res.json());
        setData(res.hits[randomInteger(0,19)].largeImageURL);
      } catch (error) {
        console.error(error);
      }
    }
    
    const timer = setTimeout(() => {
      setSize(prev => !prev);
      setNumber(randomInteger(0,19));
      getData();
    }, timeout);

    return () => clearTimeout(timer)
  }
  
  return (
    <>
      <h1 className="text-center m-4 text-lg">Haaland or somebody</h1>
      <div className="w-full flex mx-auto max-w-52 overflow-hidden">
        {(number % 2 == 0) ? (<Image src={haaland[number % 5]} alt="" className={`${ size ? 'scale-[1] h-[384px] w-[330px]' : 'scale-[3] min-w-96'} max-h-96 origin-${randomOrigin[Math.trunc(number % 2)]}`} width={220} height={384}/>) : (<Image src={data} alt="" width={220} height={384} className={`${ size ? 'scale-[1] h-[384px] w-[330px]' : 'scale-[3] min-w-96'} max-h-96 origin-${randomOrigin[Math.trunc(number % 2)]}`}/>)
        }
      </div>
      <div className="m-6 flex justify-center items-center gap-4">
        <button className="bg-zinc-800 text-slate-300 px-4 py-2 rounded-lg" onClick={() => clickHandler()}>Haaland</button>
        <button className="bg-zinc-800 text-slate-300 px-4 py-2 rounded-lg" onClick={() => clickHandler()}>somebody</button>
      </div>
      <div className="max-w-[220px] mx-auto text-lg  text-center">
        <a href="https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%BC%E3%83%AA%E3%83%B3%E3%82%B0%E3%83%BB%E3%83%8F%E3%83%BC%E3%83%A9%E3%83%B3%E3%83%89" target="_blank" className="hover:underline">Do you know Haaland???</a>
        <a href="https://github.com/tkg-reis/haaland-or-somebody" target="_blank">
          <GitHubIcon className="text-3xl"/>
        </a>
      </div>
      
    </>
  );
}
