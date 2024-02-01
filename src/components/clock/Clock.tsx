import { useState, useEffect, useMemo } from 'react';
import './Clock.css'

interface props {
    timeZone: string;
    dominant: boolean;
    selectedDuration: number;
}

export default function Clock({ timeZone, dominant, selectedDuration }: props) {

    const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { timeZone }));
    const [alertMsg, setAlertMsg] = useState('')

    useEffect(() => {
        const timeIntervalId = setInterval(() => {
            const newTime = new Date().toLocaleTimeString('en-US', { timeZone });
            setTime(newTime);
            const [hours, minutes, seconds] = (newTime.split(/:| /));
            if (Number(hours) % selectedDuration === 0 && minutes == '00' && seconds == '00') {
                setAlertMsg(`${hours} ${newTime.split(' ')[1]}`)
                setTimeout(() => setAlertMsg(''), 15000)
            }
        }, 1000);

        return () => clearInterval(timeIntervalId);
    }, [timeZone, setAlertMsg, setTime]);

    const [hour, minute, second] = time.split(/:| /);

    const hourStyle = useMemo(() => { return { transform: `rotate(${(parseInt(hour) % 12 / 12 + parseInt(minute) / 60 / 12) * 360}deg)` } }, [hour, minute]);

    const minuteStyle = useMemo(() => { return { transform: `rotate(${(parseInt(minute) / 60) * 360}deg)` } }, [minute])

    const secondStyle = useMemo(() => { return { transform: `rotate(${(parseInt(second) / 60) * 360}deg)` } }, [second])

    const getDayAndDate = (timezone: string) => {
        const now = new Date();
        const options: any = { timeZone: timezone, weekday: "short", day: 'numeric', month: 'short' };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const formattedDate = formatter.format(now);
        return formattedDate;
    }

    const [weekDay, date] = getDayAndDate(timeZone).split(',')
    const [month, day] = date.trim().split(' ')

    return <div className={`dial ${alertMsg && 'dial-alert'} ${dominant && 'dial-dominant'} ${dominant && alertMsg && 'dial-alert-dominant'}`}>
        <div className={`inner-dial-circle ${dominant && 'inner-dial-circle-dominant'}`}></div>
        <div className={`hour-numbers ${dominant && 'hour-numbers-dominant'}`}>
            {Array.from({ length: 12 }).map((_, index) => (
                <span key={index} className={`hour-${index + 1}`}>
                    {index + 1}
                </span>
            ))}
        </div>
        <label className={`clock-lable ${dominant && 'clock-lable-dominant'}`}>{timeZone}</label>
        <div className={`hour-hand ${dominant && 'hour-hand-dominant'}`} style={hourStyle}></div>
        <div className={`minute-hand ${dominant && 'minute-hand-dominant'}`} style={minuteStyle}></div>
        <div className='second-hand' style={secondStyle}></div>
        <div className={`center-dot ${dominant && 'center-dot-dominant'}`}></div>
        <div className={`inner-circle day ${dominant && 'day-dominant'}`}>{weekDay}</div>
        <div className={`inner-circle date ${dominant && 'date-dominant'}`}>
            <span>{day}</span> {month}
        </div>
        <div className=' inner-circle am-pm'>{time.split(' ')[1]}</div>
        {alertMsg && (
            <div className={`alert ${dominant && 'alert-dominant'}`}>
                Hi ! It's <span>{alertMsg}</span>
            </div>
        )}
    </div>

}
