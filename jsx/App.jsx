const Dota2App = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [heroesData, setHeroesData] = React.useState({ heroes: [] });
  const [filteredHeroes, setFilteredHeroes] = React.useState([]);
  const [activeTypeFilter, setActiveTypeFilter] = React.useState(null);
  const [activeDifficultyFilter, setActiveDifficultyFilter] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedHero, setSelectedHero] = React.useState(null);
  const [showQuiz, setShowQuiz] = React.useState(false);
  const [lastUpdateTime, setLastUpdateTime] = React.useState(Date.now());
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openHeroPage = (hero) => {
    setSelectedHero(hero);
  };

  const openQuiz = () => {
    setShowQuiz(true);
  };

  const checkForUpdates = async () => {
    try {
      const response = await fetch(`info.json?t=${Date.now()}`);
      const newData = await response.json();

      if (JSON.stringify(newData.heroes) !== JSON.stringify(heroesData.heroes)) {
        console.log('Знайдено оновлення!');
        setHeroesData(newData);
        setLastUpdateTime(Date.now());
      } else {
        console.log('Оновлень немає');
      }
    } catch (error) {
      console.error('Помилка при перевірці оновлень:', error);
    }
  };

  React.useEffect(() => {
    fetch('info.json')
      .then(res => res.json())
      .then(data => setHeroesData(data));
  }, []);

  React.useEffect(() => {
    const interval = setInterval(checkForUpdates, 60000); 
    return () => clearInterval(interval); 
  }, [heroesData.heroes.length]);

  const filterHeroes = React.useCallback(() => {
    let filtered = heroesData.heroes;

    if (activeTypeFilter) {
      filtered = filtered.filter(hero => hero.type === activeTypeFilter);
    }

    if (activeDifficultyFilter) {
      filtered = filtered.filter(hero => hero.complexity === activeDifficultyFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(hero =>
        hero.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredHeroes(filtered);
  }, [heroesData.heroes, activeTypeFilter, activeDifficultyFilter, searchQuery]);

  React.useEffect(() => {
    filterHeroes();
  }, [filterHeroes]);

  const handleTypeFilter = (type) => {
    setActiveTypeFilter(activeTypeFilter === type ? null : type);
  };

  const handleDifficultyFilter = (difficulty) => {
    setActiveDifficultyFilter(activeDifficultyFilter === difficulty ? null : difficulty);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (showQuiz) {
    return (
      <div>
        <div className="navbar">
          <div className="logo-nav-container">
            <a href="main.html" className="logo-container">
              <img src="img/logo_dota.png" alt="Dota 2 Logo" className="logo" />
              <span className="game-title">DOTA 2</span>
            </a>
            <nav className="nav-links">
              <a href="#">ГЕРОЇ</a>
              <a href="#">НОВИНИ</a>
              <a href="#" className="active">ВІКТОРИНА</a>
            </nav>
          </div>
          <button className="btn btn-primary custom-signin-btn" onClick={openModal}>Sign in</button>
        </div>
        
        <QuizPage onBack={() => setShowQuiz(false)} />
        
        <SignInModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    );
  }

  if (selectedHero) {
    return (
      <div>
        <div className="navbar">
          <div className="logo-nav-container">
            <a href="main.html" className="logo-container">
              <img src="img/logo_dota.png" alt="Dota 2 Logo" className="logo" />
              <span className="game-title">DOTA 2</span>
            </a>
            <nav className="nav-links">
              <a href="#" className="active">ГЕРОЇ</a>
              <a href="#">НОВИНИ</a>
              <a href="#" onClick={openQuiz}>ВІКТОРИНА</a>
            </nav>
          </div>
          <button className="custom-signin-btn" onClick={openModal}>Sign in</button>
        </div>
        
        <HeroPage 
          hero={selectedHero} 
          onBack={() => setSelectedHero(null)} 
        />
        
        <SignInModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    );
  }

  return (
    <div>
      <div className="navbar">
        <div className="logo-nav-container">
          <a href="main.html" className="logo-container">
            <img src="img/logo_dota.png" alt="Dota 2 Logo" className="logo" />
            <span className="game-title">DOTA 2</span>
          </a>
          <nav className="nav-links">
            <a href="#" className="active">ГЕРОЇ</a>
            <a href="#">НОВИНИ</a>
            <a href="#" onClick={openQuiz}>ВІКТОРИНА</a>
          </nav>
        </div>
        <button className="custom-signin-btn" onClick={openModal}>Sign in</button>
      </div>

      <section className="information">
        <video className="video-background" autoPlay muted loop playsInline>
          <source src="videos/dota_intro.webm" type="video/webm" />
          Ваш браузер не підтримує відео.
        </video>
        <div className="video-overlay"></div>
        <div className="information-content">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent animate-pulse text-center mb-4">
            ВИБЕРІТЬ СВОГО ГЕРОЯ
          </h1>
          <p className="text-3xl bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent animate-pulse text-center mb-4">
            Чарівники-тактики, брутальні здоровані, спритні розвідники — вибір серед героїв Dota 2 вражаюче величезний і безмежно різноманітний.
            На шляху до перемоги ви застосовуватимете неймовірні здібності та руйнівні ультимативні вміння.
          </p>
        </div>
      </section>

      <section className="filter-section">
        <div className="filter-container">
          <div className="filter-row">
            <span className="filter-label">Характеристика</span>

            <div
              className={`filter-icon agility ${activeTypeFilter === 'Agility' ? 'active' : ''}`}
              onClick={() => handleTypeFilter('Agility')}
              title="Спритність"
            >
              <img src="img/hero_agility.png" alt="agility" />
            </div>

            <div
              className={`filter-icon intelligence ${activeTypeFilter === 'Intelligence' ? 'active' : ''}`}
              onClick={() => handleTypeFilter('Intelligence')}
              title="Інтелект"
            >
              <img src="img/hero_intelligence.png" alt="intelligence" />
            </div>

            <div
              className={`filter-icon strength ${activeTypeFilter === 'Strength' ? 'active' : ''}`}
              onClick={() => handleTypeFilter('Strength')}
              title="Сила"
            >
              <img src="img/hero_strength.png" alt="strength" />
            </div>

            <div
              className={`filter-icon universal ${activeTypeFilter === 'Universal' ? 'active' : ''}`}
              onClick={() => handleTypeFilter('Universal')}
              title="Универсальний"
            >
              <img src="img/hero_universal.png" alt="universal" />
            </div>

            <span className="filter-label">Складність</span>

            <div
              className={`filter-icon difficulty-1 ${activeDifficultyFilter === 1 ? 'active' : ''}`}
              onClick={() => handleDifficultyFilter(1)}
              title="Легко"
            >
              <img src="img/difficulty.png" alt="легко" />
            </div>

            <div
              className={`filter-icon difficulty-2 ${activeDifficultyFilter === 2 ? 'active' : ''}`}
              onClick={() => handleDifficultyFilter(2)}
              title="Середньо"
            >
              <img src="img/difficulty.png" alt="середньо" />
            </div>

            <div
              className={`filter-icon difficulty-3 ${activeDifficultyFilter === 3 ? 'active' : ''}`}
              onClick={() => handleDifficultyFilter(3)}
              title="Складно"
            >
              <img src="img/difficulty.png" alt="складно" />
            </div>

            <input
              type="text"
              className="search-input"
              placeholder="🔍 Пошук героя..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="hero-selection">
          {filteredHeroes.map(hero => (
            <div
              key={hero.name}
              className={`hero-icon ${hero.name.toLowerCase().replace(/ /g, '_')}`}
              data-type={hero.name}
              title={hero.name}
              onClick={() => openHeroPage(hero)}
              style={{ cursor: 'pointer' }}
            >
              <img src={hero.image} alt={hero.name.toLowerCase().replace(/ /g, '_')} />
            </div>
          ))}
        </div>
      </section>

      <SignInModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
