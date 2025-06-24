const HeroPage = ({ hero, onBack }) => {
  const [selectedAbility, setSelectedAbility] = React.useState(null);

  React.useEffect(() => {
    if (hero.abilities && hero.abilities.length > 0) {
      setSelectedAbility(hero.abilities[0]);
    }
  }, [hero]);

  return (
    <div>
      <div className="hero_information_navbar">
        <p className="flex items-center text-[30px] font-medium font-['Orbitron','Rajdhani','Exo_2',monospace] uppercase tracking-[2px] mb-[10px] text-white">
          <img src={hero.type_image} alt={hero.type} className="hero_type_image" />
          {hero.type}
        </p>
        <p className="text-[72px] font-bold font-['Orbitron','Rajdhani','Exo_2',monospace] uppercase tracking-[4px] mb-[20px] leading-[0.9]">
          {hero.name}
        </p>
        <p className="text-[18px] font-medium uppercase tracking-[1px] mb-[30px] max-w-[600px]">
          {hero.lore.short}
        </p>

        <p className="flex items-center text-[25px] font-medium mb-[15px]">
          Тип атаки: <img className="hero_attack_image" src={hero.type_attack} alt="attack" />
        </p>
        <p className="flex items-center text-[25px] font-medium mb-[15px]">
          Складність: <img className="hero_difficulty_image" src={hero.complexity_image} alt={hero.complexity} />
        </p>

        <img src={hero.image_big} alt={hero.name} className="hero_big" />

        <div className="abilities_navbar">
          <p className="gap-[10px] text-[24px] font-bold uppercase tracking-[2px] mb-[20px] mr-0">
            Здібності
          </p>
          <div
            className="ability_container"
            onClick={() =>
              setSelectedAbility({
                name: 'Дерево талантів',
                description: 'Система прокачки додаткових здібностей',
                video: '',
              })
            }
          >
            <img src={hero.talent_tree_image} title="Дерево талантів" />
          </div>
          <div
            className="ability_container"
            onClick={() =>
              setSelectedAbility({
                name: hero.passive.name,
                description: hero.passive.description,
                video: hero.passive.video || '',
              })
            }
          >
            <img src={hero.passive.image_passive} title={hero.passive.name} />
          </div>
          {hero.abilities.map((ability, index) => (
            <div
              key={index}
              className="ability_container"
              onClick={() => setSelectedAbility(ability)}
            >
              <img src={ability.image_ability} alt={ability.name} title={ability.name} />
            </div>
          ))}
        </div>
      </div>

      <div className="hero_facets_section">
        <h3 className="text-[32px] font-bold uppercase tracking-[3px] text-white text-center mb-[30px]">
          Грані героя
        </h3>
        <div className="facets_container">
          {hero.facets &&
            hero.facets.map((facet, index) => (
              <div key={index} className="facet_item">
                <img src={facet.image} alt={facet.name} className="facet_image" />
              </div>
            ))}
        </div>
      </div>

      <div className="ability_details_section">
        {selectedAbility && (
          <div className="ability_details">
            <div className="ability_video_container">
              {selectedAbility.video && (
                <video className="ability_video" autoPlay muted loop>
                  <source src={selectedAbility.video} type="video/mp4" />
                  Ваш браузер не підтримує відео.
                </video>
              )}
            </div>
            <div className="ability_info">
              <h3 className="text-[38px] font-bold uppercase tracking-[2px] mb-[20px] text-white">
                {selectedAbility.name}
              </h3>
              <p className="text-[21px] leading-[1.6] mb-[25px] text-[#cccccc]">
                {selectedAbility.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
