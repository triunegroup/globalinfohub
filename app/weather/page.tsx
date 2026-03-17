'use client'
import { useState, useEffect, useCallback } from 'react'
import {
  Search, MapPin, Wind, Droplets, Thermometer, Globe,
  Sun, Cloud, CloudRain, CloudSnow, CloudLightning,
  CloudDrizzle, CloudFog,
} from 'lucide-react'

type GeoResult = { name: string; country: string; latitude: number; longitude: number }

type WeatherData = {
  current: {
    temperature_2m: number
    apparent_temperature: number
    relative_humidity_2m: number
    wind_speed_10m: number
    weather_code: number
    precipitation: number
  }
  current_units: { temperature_2m: string; wind_speed_10m: string }
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    weather_code: number[]
  }
}

type CitySnap = { name: string; lat: number; lon: number; temp: number | null; code: number | null; unit: string }

const WORLD_CITIES = [
  { name: 'New York',   lat: 40.7128,  lon: -74.006  },
  { name: 'London',     lat: 51.5074,  lon: -0.1278  },
  { name: 'Tokyo',      lat: 35.6762,  lon: 139.6503 },
  { name: 'Dubai',      lat: 25.2048,  lon: 55.2708  },
  { name: 'Sydney',     lat: -33.8688, lon: 151.2093 },
  { name: 'Paris',      lat: 48.8566,  lon: 2.3522   },
  { name: 'Mumbai',     lat: 19.076,   lon: 72.8777  },
  { name: 'Sao Paulo',  lat: -23.5505, lon: -46.6333 },
]

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function weatherDesc(code: number) {
  if (code === 0) return 'Clear sky'
  if (code <= 2) return 'Mainly clear'
  if (code === 3) return 'Overcast'
  if (code <= 48) return 'Foggy'
  if (code <= 57) return 'Drizzle'
  if (code <= 67) return 'Rain'
  if (code <= 77) return 'Snow'
  if (code <= 82) return 'Rain showers'
  if (code <= 86) return 'Snow showers'
  return 'Thunderstorm'
}

function weatherColor(code: number) {
  if (code === 0 || code === 1) return 'text-yellow-400'
  if (code <= 3) return 'text-slate-300'
  if (code <= 48) return 'text-slate-400'
  if (code <= 57) return 'text-blue-300'
  if (code <= 82) return 'text-blue-400'
  if (code <= 86) return 'text-cyan-300'
  return 'text-purple-400'
}

function WeatherIcon({ code, size = 20, className = '' }: { code: number; size?: number; className?: string }) {
  const p = { size, className }
  if (code === 0 || code === 1) return <Sun {...p} />
  if (code <= 3)  return <Cloud {...p} />
  if (code <= 48) return <CloudFog {...p} />
  if (code <= 57) return <CloudDrizzle {...p} />
  if (code <= 67) return <CloudRain {...p} />
  if (code <= 77) return <CloudSnow {...p} />
  if (code <= 82) return <CloudRain {...p} />
  if (code <= 86) return <CloudSnow {...p} />
  return <CloudLightning {...p} />
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div>
        <div className="text-xs text-slate-500">{label}</div>
        <div className="text-sm text-white">{value}</div>
      </div>
    </div>
  )
}

export default function WeatherPage() {
  const [query, setQuery]       = useState('')
  const [units, setUnits]       = useState<'fahrenheit' | 'celsius'>('fahrenheit')
  const [location, setLocation] = useState<GeoResult | null>(null)
  const [weather, setWeather]   = useState<WeatherData | null>(null)
  const [citySnaps, setCitySnaps] = useState<CitySnap[]>(
    WORLD_CITIES.map(c => ({ ...c, temp: null, code: null, unit: '' }))
  )
  const [loading, setLoading]       = useState(false)
  const [snapLoading, setSnapLoading] = useState(true)
  const [error, setError]           = useState<string | null>(null)
  const [mounted, setMounted]       = useState(false)

  const fetchWeather = useCallback(async (geo: GeoResult, u: 'fahrenheit' | 'celsius') => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/weather?lat=${geo.latitude}&lon=${geo.longitude}&units=${u}`)
      const data: WeatherData = await res.json()
      if ('error' in data) throw new Error((data as { error: string }).error)
      setWeather(data)
      setLocation(geo)
      localStorage.setItem('weather_city', JSON.stringify(geo))
    } catch {
      setError('Failed to load weather data.')
    } finally {
      setLoading(false)
    }
  }, [])

  // On mount: read localStorage then fetch
  useEffect(() => {
    const savedUnits = (localStorage.getItem('weather_units') as 'fahrenheit' | 'celsius') || 'fahrenheit'
    setUnits(savedUnits)

    const saved = localStorage.getItem('weather_city')
    const geo: GeoResult = saved
      ? JSON.parse(saved)
      : { name: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.006 }

    fetchWeather(geo, savedUnits)
    setMounted(true)
  }, [fetchWeather])

  // World cities — re-fetch when units change
  useEffect(() => {
    if (!mounted) return
    setSnapLoading(true)
    Promise.all(
      WORLD_CITIES.map(async c => {
        try {
          const res = await fetch(`/api/weather?lat=${c.lat}&lon=${c.lon}&units=${units}`)
          const data: WeatherData = await res.json()
          return { ...c, temp: Math.round(data.current.temperature_2m), code: data.current.weather_code, unit: data.current_units.temperature_2m }
        } catch {
          return { ...c, temp: null, code: null, unit: '' }
        }
      })
    ).then(results => {
      setCitySnaps(results)
      setSnapLoading(false)
    })
  }, [mounted, units])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/geocode?city=${encodeURIComponent(query.trim())}`)
      const geo = await res.json()
      if (geo.error) throw new Error(geo.error)
      await fetchWeather({ name: geo.name, country: geo.country, latitude: geo.latitude, longitude: geo.longitude }, units)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'City not found')
      setLoading(false)
    }
  }

  const toggleUnits = () => {
    const u = units === 'fahrenheit' ? 'celsius' : 'fahrenheit'
    setUnits(u)
    localStorage.setItem('weather_units', u)
    if (location) fetchWeather(location, u)
  }

  const unitSym = units === 'fahrenheit' ? '°F' : '°C'

  return (
    <div className="space-y-5 max-w-6xl">

      {/* Header + search */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <h1 className="text-lg font-semibold text-white flex items-center gap-2">
          <Globe size={18} className="text-blue-400" /> Global Weather
        </h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <form onSubmit={handleSearch} className="flex gap-2 flex-1">
            <div className="relative flex-1 sm:w-64">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search any city..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm rounded-lg transition-colors"
            >
              Search
            </button>
          </form>
          <button
            onClick={toggleUnits}
            className="px-3 py-2 text-sm rounded-lg text-slate-300 hover:text-white transition-colors shrink-0"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            {units === 'fahrenheit' ? '°C' : '°F'}
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {/* Current conditions + 7-day forecast */}
      {loading && !weather ? (
        <div className="card flex items-center justify-center h-44 text-slate-500 text-sm">Loading...</div>
      ) : weather && location ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Current */}
          <div className="card flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-2">
                  <MapPin size={12} /> {location.name}, {location.country}
                </div>
                <div className="text-6xl font-light text-white leading-none">
                  {Math.round(weather.current.temperature_2m)}
                  <span className="text-2xl">{unitSym}</span>
                </div>
                <div className="text-slate-400 text-sm mt-2">{weatherDesc(weather.current.weather_code)}</div>
              </div>
              <WeatherIcon
                code={weather.current.weather_code}
                size={52}
                className={weatherColor(weather.current.weather_code)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
              <Stat
                icon={<Thermometer size={13} className="text-orange-400" />}
                label="Feels like"
                value={`${Math.round(weather.current.apparent_temperature)}${unitSym}`}
              />
              <Stat
                icon={<Droplets size={13} className="text-blue-400" />}
                label="Humidity"
                value={`${weather.current.relative_humidity_2m}%`}
              />
              <Stat
                icon={<Wind size={13} className="text-teal-400" />}
                label="Wind"
                value={`${Math.round(weather.current.wind_speed_10m)} ${weather.current_units.wind_speed_10m}`}
              />
              <Stat
                icon={<CloudRain size={13} className="text-slate-400" />}
                label="Precip."
                value={`${weather.current.precipitation} mm`}
              />
            </div>
          </div>

          {/* 7-day forecast */}
          <div className="card lg:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-4">7-Day Forecast</h3>
            <div className="grid grid-cols-7 gap-1.5">
              {weather.daily.time.map((d, i) => {
                const day = i === 0 ? 'Today' : DAYS[new Date(d + 'T12:00:00').getDay()]
                const code = weather.daily.weather_code[i]
                return (
                  <div
                    key={d}
                    className="flex flex-col items-center gap-2 p-2 rounded-lg"
                    style={{ backgroundColor: 'var(--bg-primary)' }}
                  >
                    <span className="text-xs text-slate-500">{day}</span>
                    <WeatherIcon code={code} size={16} className={weatherColor(code)} />
                    <span className="text-xs font-medium text-white">
                      {Math.round(weather.daily.temperature_2m_max[i])}{unitSym}
                    </span>
                    <span className="text-xs text-slate-500">
                      {Math.round(weather.daily.temperature_2m_min[i])}{unitSym}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ) : null}

      {/* World cities */}
      <div>
        <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Globe size={14} className="text-blue-400" /> Major Cities
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {citySnaps.map(snap => (
            <button
              key={snap.name}
              onClick={() => fetchWeather({ name: snap.name, country: '', latitude: snap.lat, longitude: snap.lon }, units)}
              className="card flex flex-col items-center gap-1.5 py-3 hover:border-blue-500/40 transition-all text-center"
            >
              <span className="text-xs text-slate-400">{snap.name}</span>
              {snapLoading || snap.code === null ? (
                <div className="h-4 w-12 bg-slate-700 rounded animate-pulse" />
              ) : (
                <>
                  <WeatherIcon code={snap.code} size={16} className={weatherColor(snap.code)} />
                  <span className="text-sm font-medium text-white">{snap.temp}{snap.unit}</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}
