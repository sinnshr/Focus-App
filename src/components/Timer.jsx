import Window from './Window';
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { useState, useRef, useEffect } from "react";
// import {toast} from "react-toastify";

function Timer() {
  // Stopwatch state
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [activeSection, setActiveSection] = useState('pomodoro');

  // Pomodoro state
  const [pomodoroSettings, setPomodoroSettings] = useState({
    study: 25,
    shortBreak: 5,
    longBreak: 15,
  });
  const [pomodoroMode, setPomodoroMode] = useState('study'); // 'study', 'shortBreak', 'longBreak'
  const [pomodoroTimeLeft, setPomodoroTimeLeft] = useState(pomodoroSettings.study * 60);
  const [pomodoroRunning, setPomodoroRunning] = useState(false);
  const [pomodoroCycle, setPomodoroCycle] = useState(0); // 0-3, after 4th study, do long break
  const pomodoroIntervalRef = useRef(null);

  // Update pomodoroTimeLeft when settings or mode changes
  useEffect(() => {
    if (pomodoroMode === 'study') {
      setPomodoroTimeLeft(pomodoroSettings.study * 60);
    } else if (pomodoroMode === 'shortBreak') {
      setPomodoroTimeLeft(pomodoroSettings.shortBreak * 60);
    } else if (pomodoroMode === 'longBreak') {
      setPomodoroTimeLeft(pomodoroSettings.longBreak * 60);
    }
    // eslint-disable-next-line
  }, [pomodoroSettings, pomodoroMode]);

  // Pomodoro timer logic
  useEffect(() => {
    if (pomodoroRunning) {
      if (pomodoroIntervalRef.current) clearInterval(pomodoroIntervalRef.current);
      pomodoroIntervalRef.current = setInterval(() => {
        setPomodoroTimeLeft(prev => {
          if (prev > 0) {
            return prev - 1;
          } else {
            handlePomodoroEnd();
            return 0;
          }
        });
      }, 1000);
    } else {
      if (pomodoroIntervalRef.current) {
        clearInterval(pomodoroIntervalRef.current);
        pomodoroIntervalRef.current = null;
      }
    }
    return () => {
      if (pomodoroIntervalRef.current) {
        clearInterval(pomodoroIntervalRef.current);
        pomodoroIntervalRef.current = null;
      }
    };
    // eslint-disable-next-line
  }, [pomodoroRunning]);

  // When switching section, stop pomodoro timer
  useEffect(() => {
    if (activeSection !== 'pomodoro') {
      setPomodoroRunning(false);
      if (pomodoroIntervalRef.current) {
        clearInterval(pomodoroIntervalRef.current);
        pomodoroIntervalRef.current = null;
      }
    }
    // eslint-disable-next-line
  }, [activeSection]);

  function getPomodoroDuration() {
    if (pomodoroMode === 'study') return pomodoroSettings.study * 60;
    if (pomodoroMode === 'shortBreak') return pomodoroSettings.shortBreak * 60;
    if (pomodoroMode === 'longBreak') return pomodoroSettings.longBreak * 60;
    return 0;
  }

  function startPomodoro() {
    if (pomodoroTimeLeft === 0) {
      setPomodoroTimeLeft(getPomodoroDuration());
    }
    setPomodoroRunning(true);
  }

  function pausePomodoro() {
    setPomodoroRunning(false);
  }

  function resetPomodoro() {
    setPomodoroRunning(false);
    setPomodoroTimeLeft(getPomodoroDuration());
    if (pomodoroIntervalRef.current) {
      clearInterval(pomodoroIntervalRef.current);
      pomodoroIntervalRef.current = null;
    }
  }

  function handlePomodoroEnd() {
    setPomodoroRunning(false);
    if (pomodoroIntervalRef.current) {
      clearInterval(pomodoroIntervalRef.current);
      pomodoroIntervalRef.current = null;
    }
    // show notification

    if (pomodoroMode === 'study') {
      if (pomodoroCycle < 3) {
        setPomodoroMode('shortBreak');
      } else {
        setPomodoroMode('longBreak');
      }
    } else if (pomodoroMode === 'shortBreak') {
      setPomodoroMode('study');
      setPomodoroCycle(cycle => cycle + 1);
    } else if (pomodoroMode === 'longBreak') {
      setPomodoroMode('study');
      setPomodoroCycle(0);
    }
  }

  // Stopwatch logic
  function startTimer() {
    if (!isRunning) {
      setIsRunning(true);
      const id = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds >= 59) {
            setMinutes(prevMinutes => prevMinutes + 1);
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
      setIntervalId(id);
    }
  }

  function stopTimer() {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsRunning(false);
    }
  }

  function clearTimer() {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setSeconds(0);
    setMinutes(0);
    setIntervalId(null);
    setIsRunning(false);
  }

  return (
    <Window title="Timer" >

      {/* Switch Tabs Buttons */}
      <div className='flex justify-center items-center py-5 text-lg text-[#1f291f] relative pl-3'>
        <div className='flex items-center relative'>
          <button
            onClick={() => setActiveSection('pomodoro')}
            className='px-3 py-1 transition-colors duration-500 hover:text-[#819267]'
          >
            Pomodoro
          </button>

          <hr className='border h-5 mx-2'></hr>

          <button
            onClick={() => setActiveSection('stopwatch')}
            className='px-3 py-1 transition-colors duration-500 hover:text-[#819267]'
          >
            StopWatch
          </button>
          {/* Sliding Active Line */}
          <div
            className={`absolute bottom-0 h-0.5 bg-amber-700 transition-all duration-300 ease-in-out ${activeSection === 'pomodoro'
              ? 'left-[9px] w-[94px]'
              : 'left-[140px] w-[108px]'
              }`}
          ></div>
        </div>
      </div>

      {/* StopWatch */}
      {activeSection === 'stopwatch' && (
        <div name="stopwatch" className="flex flex-col h-[80%] items-center">
          {/* Timer Display */}
          <h3
            id="timerDisplay"
            className="flex justify-center items-end h-[50%] text-8xl w-full cursor-default pb-4.5 font-mono text-[#1f291f] select-none"
          >
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </h3>

          {/* Control Buttons */}
          <div className="flex flex-col items-center justify-start w-full h-[50%]">
            <div className="flex gap-4">
              {isRunning ? (
                <button
                  onClick={stopTimer}
                  className="text-2xl px-5 py-2 text-white border-3 border-amber-700 rounded-3xl p-1 bg-amber-700 shadow-[inset_2px_2px_8px_#a86b2a,3px_3px_1px_0_#250f0f,0_2px_8px_0_#fff7e0] active:translate-y-1 active:shadow-[0_1px_2px_0_#250f0f] transition-all"
                >
                  Stop
                </button>
              ) : (
                <button
                  onClick={startTimer}
                  className="text-2xl px-5 py-2 text-white border-3 border-amber-700 rounded-3xl p-1 bg-amber-700 shadow-[inset_2px_2px_8px_#a86b2a,3px_3px_1px_0_#250f0f,0_2px_8px_0_#fff7e0] active:translate-y-1 active:shadow-[0_1px_2px_0_#250f0f] transition-all"
                >
                  Start
                </button>
              )}

              <button
                onClick={clearTimer}
                className="text-2xl px-5 py-2 text-white border-3 border-amber-700 rounded-3xl p-1 bg-amber-700 shadow-[inset_2px_2px_8px_#a86b2a,3px_3px_1px_0_#250f0f,0_2px_8px_0_#fff7e0] active:translate-y-1 active:shadow-[0_1px_2px_0_#250f0f] transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pomodoro */}
      {activeSection === 'pomodoro' && (
        <div name="pomodoro" className="flex flex-col h-[80%] items-center w-full">

          <div className="flex flex-col items-center justify-end h-[50%] w-full">
            <span className='mb-1 flex flex-col items-center'>
              {/* Mode Display */}
              <span className="text-lg text-[#1f291f]">
                {pomodoroMode === 'study' ? 'Study' : pomodoroMode === 'shortBreak' ? 'Short Break' : 'Long Break'}
              </span>
              {/* Cycle Count */}
              <span className="text-base text-[#819267]">Cycle: {pomodoroCycle + 1} / 4</span>
            </span>
            {/* Main Timer Display */}
            <span className="text-8xl font-mono text-[#1f291f] select-none pb-4.5">
              {String(Math.floor(pomodoroTimeLeft / 60)).padStart(2, '0')}:{String(pomodoroTimeLeft % 60).padStart(2, '0')}
            </span>
          </div>

          <div className="flex flex-col items-center justify-start h-[50%] w-full">
            {/* Control Buttons */}
            <div className="flex gap-4 mb-4">
              {pomodoroRunning ? (
                <button
                  onClick={pausePomodoro}
                  className="text-2xl px-5 py-2 text-white border-3 border-amber-700 rounded-3xl bg-amber-700 shadow-[inset_2px_2px_8px_#a86b2a,3px_3px_1px_0_#250f0f,0_2px_8px_0_#fff7e0] active:translate-y-1 active:shadow-[0_1px_2px_0_#250f0f] transition-all"
                >
                  Pause
                </button>
              ) : (
                <button
                  onClick={startPomodoro}
                  className="text-2xl px-5 py-2 text-white border-3 border-amber-700 rounded-3xl bg-amber-700 shadow-[inset_2px_2px_8px_#a86b2a,3px_3px_1px_0_#250f0f,0_2px_8px_0_#fff7e0] active:translate-y-1 active:shadow-[0_1px_2px_0_#250f0f] transition-all"
                >
                  {pomodoroTimeLeft === getPomodoroDuration() ? 'Start' : 'Resume'}
                </button>
              )}
              <button
                onClick={resetPomodoro}
                className="text-2xl px-5 py-2 text-white border-3 border-amber-700 rounded-3xl bg-amber-700 shadow-[inset_2px_2px_8px_#a86b2a,3px_3px_1px_0_#250f0f,0_2px_8px_0_#fff7e0] active:translate-y-1 active:shadow-[0_1px_2px_0_#250f0f] transition-all"
              >
                Reset
              </button>
            </div>

            {/* Settings */}
            <div className="flex flex-col sm:flex-row gap-4 items-center mt-3">
              {/* Study */}
              <div className="flex flex-col items-center">
                <span className="text-[#1f291f] text-base mb-1">Study</span>
                <div className="relative flex items-stretch border-2 border-amber-700 rounded-2xl bg-[#fff8dc] shadow-[3px_3px_1px_0_#250f0f,0_2px_8px_0_#fff7e0]">
                  <div className="flex items-center px-3">
                    <button
                      type="button"
                      aria-label="decrease study minutes"
                      disabled={pomodoroRunning}
                      onClick={() => setPomodoroSettings(s => ({ ...s, study: Math.max(1, s.study - 1) }))}
                      className="w-5 h-5 text-lg leading-none text-white bg-amber-700 rounded-full disabled:opacity-60 flex justify-center items-center"
                    ><CgMathMinus /></button>

                    <input
                      id="studyLength"
                      type="number"
                      min="1"
                      max="120"
                      value={pomodoroSettings.study}
                      onChange={e => {
                        const next = Math.max(1, Math.min(120, Number(e.target.value)));
                        setPomodoroSettings(s => ({ ...s, study: next }));
                      }}
                      disabled={pomodoroRunning}
                      className="w-10 h-10 text-2xl font-bold text-center font-mono outline-none"
                    />

                    <button
                      type="button"
                      aria-label="increase study minutes"
                      disabled={pomodoroRunning}
                      onClick={() => setPomodoroSettings(s => ({ ...s, study: Math.min(120, s.study + 1) }))}
                      className="w-5 h-5 text-lg leading-none text-white bg-amber-700 rounded-full disabled:opacity-60 flex justify-center items-center"
                    ><CgMathPlus /></button>

                    <span className="ml-2 text-sm text-[#1f291f] select-none">minutes</span>
                  </div>
                </div>
              </div>

              {/* Short Break */}
              <div className="flex flex-col items-center">
                <span className="text-[#1f291f] text-base mb-1">Short Break</span>
                <div className="relative flex items-stretch border-2 border-amber-700 rounded-2xl bg-[#fff8dc] shadow-[3px_3px_1px_0_#250f0f,0_2px_8px_0_#fff7e0]">
                  <div className="flex items-center px-3">

                    <button
                      type="button"
                      aria-label="decrease short break minutes"
                      disabled={pomodoroRunning}
                      onClick={() => setPomodoroSettings(s => ({ ...s, shortBreak: Math.max(1, s.shortBreak - 1) }))}
                      className="w-5 h-5 text-lg leading-none text-white bg-amber-700 rounded-full disabled:opacity-60 flex justify-center items-center"
                    ><CgMathMinus /></button>


                    <input
                      id="shortBreak"
                      type="number"
                      min="1"
                      max="60"
                      value={pomodoroSettings.shortBreak}
                      onChange={e => {
                        const next = Math.max(1, Math.min(60, Number(e.target.value)));
                        setPomodoroSettings(s => ({ ...s, shortBreak: next }));
                      }}
                      disabled={pomodoroRunning}
                      className="w-10 h-10 text-2xl font-bold text-center font-mono outline-none"
                    />

                    <button
                      type="button"
                      aria-label="increase short break minutes"
                      disabled={pomodoroRunning}
                      onClick={() => setPomodoroSettings(s => ({ ...s, shortBreak: Math.min(60, s.shortBreak + 1) }))}
                      className="w-5 h-5 text-lg leading-none text-white bg-amber-700 rounded-full disabled:opacity-60 flex justify-center items-center"
                    ><CgMathPlus /></button>

                    <span className="ml-2 text-sm text-[#1f291f] select-none">minutes</span>
                  </div>
                </div>
              </div>

              {/* Long Break */}
              <div className="flex flex-col items-center">
                <span className="text-[#1f291f] text-base mb-1">Long Break</span>
                <div className="relative flex items-stretch border-2 border-amber-700 rounded-2xl bg-[#fff8dc] shadow-[3px_3px_1px_0_#250f0f,0_2px_8px_0_#fff7e0]">
                  <div className="flex items-center px-3">
                    <button
                      type="button"
                      aria-label="decrease long break minutes"
                      disabled={pomodoroRunning}
                      onClick={() => setPomodoroSettings(s => ({ ...s, longBreak: Math.max(1, s.longBreak - 1) }))}
                      className="w-5 h-5 text-lg leading-none text-white bg-amber-700 rounded-full disabled:opacity-60 flex justify-center items-center"
                    ><CgMathMinus /></button>

                    <input
                      id="longBreak"
                      type="number"
                      min="1"
                      max="120"
                      value={pomodoroSettings.longBreak}
                      onChange={e => {
                        const next = Math.max(1, Math.min(120, Number(e.target.value)));
                        setPomodoroSettings(s => ({ ...s, longBreak: next }));
                      }}
                      disabled={pomodoroRunning}
                      className="w-10 h-10 text-2xl font-bold text-center font-mono outline-none"
                    />
                    <button
                      type="button"
                      aria-label="increase long break minutes"
                      disabled={pomodoroRunning}
                      onClick={() => setPomodoroSettings(s => ({ ...s, longBreak: Math.min(120, s.longBreak + 1) }))}
                      className="w-5 h-5 text-lg leading-none text-white bg-amber-700 rounded-full disabled:opacity-60 flex justify-center items-center"
                    ><CgMathPlus /></button>

                    <span className="ml-2 text-sm text-[#1f291f] select-none">minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </Window>
  )
}

export default Timer