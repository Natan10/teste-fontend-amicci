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
    return weatherDescriptions[data[0].description as keyof typeof weatherDescriptions];
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
  'mist': 'névoa'
} as const;