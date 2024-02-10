import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserWeatherByCity } from "@/services/get-user-weather-by-city";
import { Dispatch, SetStateAction } from "react";
import { CiCloudSun } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";

type Props = {
  city: string | null;
  setCity: Dispatch<SetStateAction<string | null>>;
  search: () => Promise<void>;
}

export function Navbar({city, setCity, search}: Props) {

  return(
    <nav className="py-6 container flex items-center justify-between">
    <div className="flex items-center">
      <CiCloudSun size={32} color="#003554" className="hidden md:block" />
      <span className="font-bold text-sm md:text-lg text-titleSecondary">
        Check weather
      </span>
    </div>
    <div className="max-w-md flex items-center gap-3">
      <Input placeholder="Digite o nome da cidade" 
        value={city || ''}
        onChange={v => setCity(v.target.value)}
      />
      <Button size={'sm'} variant={'outline'} onClick={search} disabled={!city}>
        <FaSearch size={16} />
      </Button>
    </div>
  </nav>
  )
}