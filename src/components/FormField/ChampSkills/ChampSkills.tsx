import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { ChampionModel } from '../../../models';
import classes from './ChampSkills.module.scss';

type Props = {
  champion: ChampionModel;
  QLvl: number;
  WLvl: number;
  ELvl: number;
  RLvl: number;
  champLvl: number;
  setQLvl: Dispatch<SetStateAction<number>>;
  setWLvl: Dispatch<SetStateAction<number>>;
  setELvl: Dispatch<SetStateAction<number>>;
  setRLvl: Dispatch<SetStateAction<number>>;
};
const ChampSkills: FC<Props> = (props) => {
  const { champion, QLvl, WLvl, ELvl, RLvl, setQLvl, setWLvl, setELvl, setRLvl, champLvl } = props;
  const { spells } = champion;

  const [skillPoints, setSkillPoints] = useState(0);
  const [visibleQ, setVisibleQ] = useState(true);
  const [visibleW, setVisibleW] = useState(true);
  const [visibleE, setVisibleE] = useState(true);
  const [visibleR, setVisibleR] = useState(false);

  const skillsArray = [{
    name: QLvl,
    setSkill: setVisibleQ
  },
  {
    name: WLvl,
    setSkill: setVisibleW
  },
  {
    name: ELvl,
    setSkill: setVisibleE
  }];

  const handleClick = (spelllvl:number, setSpellLvl:(value: SetStateAction<number>) => void, setSpellVisible:(value: SetStateAction<boolean>) => void) => {
    if (spelllvl + 1 === 5) {
      setSpellVisible(false);
    }
    if (skillPoints) {
      setSkillPoints((prev) => prev - 1);
      setSpellLvl(spelllvl + 1);
    }
  };

  useEffect(() => {
    if (skillPoints && champLvl >= 6 && RLvl === 0) {
      setVisibleR(true);
    } else if (skillPoints && champLvl >= 11 && RLvl === 1) {
      setVisibleR(true);
    } else if (skillPoints && champLvl >= 16 && RLvl === 2) {
      setVisibleR(true);
    } else {
      setVisibleR(false);
    }

    skillsArray.forEach(skill => {
      if ( (skillPoints && skill.name < 2) ||
      (skillPoints && skill.name === 2 && champLvl >= 5) ||
      (skillPoints && skill.name === 3 && champLvl >= 7) ||
      (skillPoints && skill.name === 4 && champLvl >= 9)
      ) {
        skill.setSkill(true);
      } else {
        skill.setSkill(false);
      }
    });

  }, [skillPoints]);

  useEffect(() => {
    setSkillPoints(champLvl - QLvl - WLvl - ELvl - RLvl);
  }, [champLvl]);
  const handleEClick = () => {
    handleClick(ELvl,setELvl,setVisibleE);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.spellWrapper}>
        <div className={classes.spellButton}>
          {visibleQ && (
            <button data-testid='QLvlUp'
              onClick={() => handleClick(QLvl,setQLvl,setVisibleQ)}>
              +
            </button>
          )}
        </div>
        <div className={classes.spell}>
          <p data-testid='QLvl'>{QLvl}</p>
          <img alt={champion.name + spells[0].name}
            src={spells[0].img} />
        </div>
      </div>
      <div className={classes.spellWrapper}>
        <div className={classes.spellButton}>
          {visibleW && (
            <button data-testid='WLvlUp'
              onClick={() => handleClick(WLvl,setWLvl,setVisibleW)}>
              +
            </button>
          )}
        </div>
        <div className={classes.spell}>
          <p data-testid='WLvl'>{WLvl}</p>
          <img alt={champion.name + spells[1].name}
            src={spells[1].img} />
        </div>
      </div>
      <div className={classes.spellWrapper}>
        <div className={classes.spellButton}>
          {visibleE && (
            <button data-testid='ELvlUp'
              onClick={handleEClick}>
              +
            </button>
          )}
        </div>
        <div className={classes.spell}>
          <p data-testid='ELvl'>{ELvl}</p>
          <img alt={champion.name + spells[2].name}
            src={spells[2].img} />
        </div>
      </div>
      <div className={classes.spellWrapper}>
        <div className={classes.spellButton}>
          {visibleR && (
            <button data-testid='RLvlUp'
              onClick={() => handleClick(RLvl,setRLvl,setVisibleR)}>
              +
            </button>
          )}
        </div>
        <div className={classes.spell}>
          <p data-testid='RLvl'>{RLvl}</p>
          <img alt={champion.name + spells[3].name}
            src={spells[3].img} />
        </div>
      </div>
    </div>
  );
};

export default ChampSkills;