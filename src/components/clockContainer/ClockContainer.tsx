import { useState } from "react";
import Clock from "../clock/Clock"
import './ClockContainer.css'
import { TIMEZONES } from "../../constants";

interface props {
    id: number;
    usedTimezones: Record<number, string>;
    onTimezoneChange: (timezone: Record<number, string>) => void;
    selectedDuration: number;
}

export default function ClockContainer({ id, usedTimezones, onTimezoneChange, selectedDuration }: props) {

    const [selectedTimezone, setSelectedTimeZone] = useState(usedTimezones[id])
    const filteredOptions = TIMEZONES.filter(timeZone => !Object.values(usedTimezones).filter((_, key) => key != id).includes(timeZone))

    const handleTimezoneChange = (timezone: string) => {
        setSelectedTimeZone(timezone)
        onTimezoneChange({ ...usedTimezones, [id]: timezone })
    }

    return <div className="container">
        <Clock
            timeZone={selectedTimezone}
            dominant={selectedTimezone === 'Europe/London'}
            selectedDuration={selectedDuration}
        />
        {selectedTimezone !== 'Europe/London' && <select
            className="drop-down"
            value={usedTimezones[id]}
            onChange={(e) => handleTimezoneChange(e.target.value)}
        >
            {filteredOptions.map(timezone => <option value={timezone}>{timezone}</option>)}
        </select>}
    </div>
}