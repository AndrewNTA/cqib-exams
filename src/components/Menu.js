import React from 'react';
import IconHome from '../icons/icon-home.png';
import IconNote from '../icons/icon-note.png';
import IconHeart from '../icons/icon-heart.png';
import IconLabel from '../icons/icon-label.png';
import { HOME_TAB, INTERESTED_TAB, PRACTICE_TAB, REMEMBERED_TAB } from '../App';

export function Menu({ onChange }) {
  return (
    <div className="adr-menu">
      <img
        src={IconHome}
        className="adr-menu-icon"
        alt="home"
        onClick={() => onChange(HOME_TAB)}
      />
      <img
        src={IconNote}
        className="adr-menu-icon"
        alt="practice"
        onClick={() => onChange(PRACTICE_TAB)}
      />
      <img
        src={IconHeart}
        className="adr-menu-icon"
        alt="remembered"
        onClick={() => onChange(REMEMBERED_TAB)}
      />
      <img
        src={IconLabel}
        className="adr-menu-icon"
        alt="interested"
        onClick={() => onChange(INTERESTED_TAB)}
      />
    </div>
  );
}
