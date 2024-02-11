import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherInfo } from "@/domain/weather";
import { Label } from '@/components/ui/label';

type Props = {
  data: WeatherInfo & {city: string};
}

export function WeatherCard({data}: Props) {
  
  function getIconUrl(data: WeatherInfo['weather']) {
    if(!data.length) return '';
    const url = `https://openweathermap.org/img/wn/${data[0].icon}@2x.png`;
    return url;
  }

  function getDescription(data: WeatherInfo['weather']){
    if(!data.length) return 'Sem descrição';
    return weatherDescriptions[data[0].description as keyof typeof weatherDescriptions] || 'Descrição indisponível';
  }

  const url = getIconUrl(data.weather);

  return(
    <Card className='max-w-sm md:max-w-lg shadow-md animate-show-up'>
      <CardHeader>
        <CardTitle>
          <Image 
            src={url}
            alt='weather icon'
            width={40}
            height={40}
          />
        </CardTitle>
        <CardDescription className='font-rmono text-sm'>
          {getDescription(data.weather)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          <div>
            <Label className='font-serrat font-bold text-[10px] text-muted-foreground'>
              Cidade
            </Label>
            <p className='font-rmono text-sm text-title'>{data.city}</p>
          </div>
          <div className='grid grid-cols-2'>
            <div>
              <Label className='font-serrat font-bold text-[10px] text-muted-foreground'>
                Humidade
              </Label>
              <p className='font-rmono text-sm text-title'>{data.main.humidity}</p>
            </div>
            <div>
              <Label className='font-serrat font-bold text-[10px] text-muted-foreground'>
                Pressão
              </Label>
              <p className='font-rmono text-sm text-title'>{data.main.humidity}</p>
            </div>
          </div>
          <div className='grid grid-cols-3'>
            <div>
              <Label className='font-serrat font-bold text-[10px] text-muted-foreground'>Temperatura</Label>
              <p className='font-rmono text-sm text-title'>{data.main.temp}</p>
            </div>
            <div>
              <Label className='font-serrat font-bold text-[10px] text-muted-foreground'>Temperatura Min</Label>
              <p className='font-rmono text-sm text-title'>{data.main.temp_min}</p>
            </div>
            <div>
              <Label className='font-serrat font-bold text-[10px] text-muted-foreground'>Temperatura Max</Label>
              <p className='font-rmono text-sm text-title'>{data.main.temp_max}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const weatherDescriptions = {
  'clear sky': 'céu limpo',
  'few clouds': 'poucas nuvens',
  'scattered clouds': 'nuvens dispersas',
  'broken clouds': 'nuvens quebradas',
  'shower rain': 'pingos de chuva',
  'rain': 'chuva',
  'thunderstorm': 'tempestade',
  'snow': 'neve',
  'mist': 'névoa',
  'light rain': 'chuva leve', 
  'moderate rain': 'chuva moderada', 
  'heavy intensity rain': 'chuva de forte intensidade', 
  'very heavy rain': 'chuva muito forte', 
  'extreme rain': 'chuva extrema', 
  'freezing rain': 'chuva congelante', 
  'light intensity shower rain': 'intensidade de luz chuveiro chuva', 
  'heavy intensity shower rain': 'chuva forte', 
  'ragged shower rain': 'chuva irregular', 
  'thunderstorm with light rain': 'trovoada com chuva fraca',
  'thunderstorm with rain': 'trovoada com chuva',
  'thunderstorm with heavy rain': 'trovoada com chuva forte',
  'light thunderstorm': 'tempestade leve',
  'heavy thunderstorm': 'forte tempestade',
  'ragged thunderstorm': 'tempestade irregular',
  'thunderstorm with light drizzle': 'trovoada com leve garoa',
  'thunderstorm with drizzle': 'trovoada com garoa',
  'thunderstorm with heavy drizzle': 'trovoada com forte garoa',
  'light intensity drizzle': 'chuvisco de intensidade luminosa',
  'drizzle': 'chuvisco',
  'heavy intensity drizzle': 'chuvisco de forte intensidade',
  'light intensity drizzle rain': 'intensidade luminosa chuvisco chuva',
  'drizzle rain': 'chuva torrencial',
  'heavy intensity drizzle rain': 'chuva forte com garoa',
  'shower rain and drizzle': 'chuva e garoa',
  'heavy shower rain and drizzle': 'chuva forte e garoa',
  'shower drizzle': 'chuvisco do chuveiro',
  'light snow': 'neve fraca',
  'heavy snow': 'neve intensa',
  'sleet': 'aguaceiro com neve',
  'light shower sleet': 'aguaceiro leve com neve',
  'shower sleet': 'aguaceiro com neve',
  'light rain and snow': 'chuva fraca e neve',
  'rain and snow': 'chuva e neve',
  'light shower snow': 'aguaceiro leve de neve',
  'shower snow': 'aguaceiro de neve',
  'heavy shower snow': 'aguaceiro intenso de neve',
  'overcast clouds': 'nuvens nubladas',
} as const;

  