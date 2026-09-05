import { useState, useEffect } from 'react';
import { ShieldAlert, Activity, Navigation, Wifi, Watch } from 'lucide-react';

export default function ZahaHUD() {
  const [telemetry, setTelemetry] = useState({
    speed: 28.5,
    cadence: 88,
    heartRate: 142,
    power: 185,
    distanceTurn: 3.2,
  });

  const [hazard, setHazard] = useState({
    active: false,
    threatLevel: 'CRITICAL',
    distanceMeters: 0,
    speedDeltaKmh: 0,
    direction: 'REAR_CENTER',
  });

  const [bleConnected, setBleConnected] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/hazard');
        const data = await res.json();
        setHazard(data);
      } catch (err) {
        console.error('Hazard sync error', err);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const connectBluetooth = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['heart_rate'] }],
      });
      await device.gatt.connect();
      setBleConnected(true);
    } catch (err) {
      console.warn('Bluetooth connection cancelled');
    }
  };

  return (
    {/* Road Black Background & Mist Text */}
    <div className={`relative w-screen h-screen overflow-hidden font-[Helvetica,Arial,sans-serif] transition-colors duration-300 ${
      hazard.active ? 'bg-[#FF9A70]/20' : 'bg-[#071011]'
    } text-[#D9E5E1]`}>
      
      <div className="flex items-center justify-between px-8 py-5 border-b border-[#D9E5E1]/10">
        <div className="flex items-center space-x-3">
          {/* Signal Lime & Alert Peach Logic */}
          <div className={`w-2.5 h-2.5 rounded-full ${hazard.active ? 'bg-[#FF9A70] animate-ping' : 'bg-[#C9FF45]'}`} />
          <span className="text-xs font-bold tracking-[0.2em] text-[#D9E5E1]/70 uppercase">
            {hazard.active ? 'RIDE GUARD: PRIORITY' : 'ZAHA VISION ONLINE'}
          </span>
        </div>

        <div className="flex items-center space-x-5">
          <button 
            onClick={connectBluetooth}
            className={`flex items-center space-x-2 text-xs font-bold px-3 py-1.5 rounded-full border transition ${
              bleConnected 
                ? 'border-[#C9FF45]/30 text-[#C9FF45] bg-[#C9FF45]/10' 
                : 'border-[#D9E5E1]/20 text-[#D9E5E1]/50 hover:border-[#D9E5E1]/40'
            }`}
          >
            <Watch className="w-3.5 h-3.5" />
            <span>{bleConnected ? 'WATCH ULTRA 2 LINKED' : 'PAIR WATCH'}</span>
          </button>
          <Wifi className="w-4 h-4 text-[#C9FF45]" />
        </div>
      </div>

      {hazard.active ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] px-8 text-center">
          {/* Alert Peach applied to critical warnings */}
          <ShieldAlert className="w-24 h-24 text-[#FF9A70] mb-6 stroke-[1.5] animate-pulse" />
          <h1 className="text-6xl font-bold text-[#FF9A70] tracking-tight mb-3">
            VEHICLE APPROACHING
          </h1>
          <p className="text-2xl text-[#D9E5E1]/90 mb-10 font-normal">
            {hazard.direction.replace('_', ' ')} / CLOSING +{hazard.speedDeltaKmh} KM/H
          </p>

          <div className="grid grid-cols-2 gap-px bg-[#FF9A70]/20 w-full max-w-lg rounded-2xl overflow-hidden border border-[#FF9A70]/30">
            <div className="bg-[#071011] p-6">
              <div className="text-sm font-bold text-[#D9E5E1]/70 tracking-widest mb-1">PROXIMITY</div>
              <div className="text-5xl font-bold text-[#D9E5E1]">{hazard.distanceMeters} <span className="text-2xl">M</span></div>
            </div>
            <div className="bg-[#071011] p-6">
              <div className="text-sm font-bold text-[#D9E5E1]/70 tracking-widest mb-1">SEVERITY</div>
              <div className="text-5xl font-bold text-[#FF9A70]">{hazard.threatLevel}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center h-[calc(100vh-80px)] px-12">
          <div className="grid grid-cols-2 gap-16 items-center">
            
            <div className="flex flex-col space-y-2">
              {/* Route Cyan used strictly for route navigation */}
              <div className="flex items-center space-x-3 text-[#47E8FF] mb-2">
                <Navigation className="w-6 h-6" />
                <span className="text-sm font-bold tracking-[0.2em] uppercase">Route Sense</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-8xl font-bold tracking-tighter text-[#D9E5E1]">
                  {telemetry.distanceTurn}
                </span>
                <span className="text-3xl text-[#D9E5E1]/50 font-normal">km</span>
              </div>
              <div className="text-3xl font-normal text-[#D9E5E1]/90 mt-2 border-t border-[#D9E5E1]/10 pt-4 w-3/4">
                NEXT TURN
              </div>
            </div>

            <div className="flex flex-col space-y-10 border-l border-[#D9E5E1]/10 pl-16">
              <div>
                {/* Signal Lime used for live performance/decisions */}
                <div className="flex items-center space-x-3 text-[#C9FF45] mb-2">
                  <Activity className="w-5 h-5" />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase">Pace Coach</span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-6xl font-bold tracking-tight text-[#D9E5E1]">{telemetry.power}</span>
                  <span className="text-xl text-[#D9E5E1]/50">W</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-[#D9E5E1]/50 uppercase mb-2 block">Heart Rate</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-5xl font-bold tracking-tight text-[#D9E5E1]">{telemetry.heartRate}</span>
                  <span className="text-xl text-[#D9E5E1]/50">BPM</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
