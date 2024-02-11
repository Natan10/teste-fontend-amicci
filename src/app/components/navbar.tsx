import { Dispatch, SetStateAction } from "react";
import { FaMapMarker, FaSearch } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

import { AnimationCloud } from "@/app/components/animation-cloud";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  city: string | null;
  isLoading: boolean;
  setCity: Dispatch<SetStateAction<string | null>>;
  getUserLocation: () => Promise<void>;
}

export function Navbar({city, setCity, isLoading, getUserLocation}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  function handleSearch() {
    router.replace(`${pathname}?city=${city}`);
  }

  return(
    <nav className="py-6 container flex items-center justify-between">
    <div className="flex items-center">
      {/* <CiCloudSun size={32} color="#003554" className="hidden md:block" /> */}
      <AnimationCloud />
      <span className="font-bold text-sm md:text-lg text-titleSecondary">
        Check weather
      </span>
    </div>
    <div className="max-w-md flex items-center gap-3">
      <Input placeholder="Digite o nome da cidade" 
        value={city || ''}
        onChange={v => setCity(v.target.value)}
      />
      <Button 
        size={'sm'} 
        variant={'outline'} 
        onClick={() => handleSearch()} 
        disabled={isLoading}
      >
        <FaSearch size={16} />
      </Button>
      <Button 
        size={'sm'} 
        variant={'default'} 
        onClick={getUserLocation} 
        disabled={isLoading}
      >
        <FaMapMarker />
      </Button>
    </div>
  </nav>
  )
}