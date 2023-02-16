import styles from './Stats.module.css';
import { capitalize } from '../../utils/text';

const Stats = ({ stats }) => {
  const colorsMap = {
    hp: '#EE6B2F',
    attack: '#4DAD5B',
    defense: '#30A7D7',
    'special-attack': '#855AC9',
    'special-defense': '#1B53BA',
    speed: '#D5A100',
  };

  const getStatColor = (statName) => {
    return colorsMap[statName];
  };

  const calculateBaseStat = (baseStat) => {
    return (baseStat * 100) / 300;
  };

  const getStyle = (statName, baseStat) => {
    const calculatedStat = calculateBaseStat(baseStat);

    return {
      height: '4px',
      width: `${calculatedStat}%`,
      backgroundColor: getStatColor(statName),
      borderRadius: 40,
      textAlign: 'right',
    };
  };

  return (
    <div className={styles.stat_card}>
      {stats?.map((stat) => {
        return (
          <div key={stat.stat.name}>
            <span className={styles.stat_name}>
              {capitalize(stat.stat.name)} - {stat.base_stat}
            </span>
            <div className={styles.statbar}>
              <div style={getStyle(stat.stat.name, stat.base_stat)}>
                <div className={styles.progress} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { Stats };
