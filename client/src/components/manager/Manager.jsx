
import React, { useState } from 'react';
import { getAllMembers } from '../httpController';
const Manager = () => {
    const [members, setMembers] = useState('')
    const [howManyMembera, setHowManyMembera] = useState(false)

    return (
        <>
            <h3>אתה המנהל </h3>
            <button onClick={() => {getAllMembers(setMembers); setHowManyMembera(true)}} >כמות מתנדבים ומבקשי סיוע הם:</button>
            {howManyMembera && <h3>{members.nonManagerUserCount}</h3>}
        
        </>
    );
};

export default Manager;
