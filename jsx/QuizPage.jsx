const QuizPage = ({ onBack }) => {
  const [quizData, setQuizData] = React.useState({ questions: [] });
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);

  React.useEffect(() => {
    fetch('quiz.json')
      .then((res) => res.json())
      .then((data) => setQuizData(data))
      .catch((err) => console.error('Error loading quiz data:', err));
  }, []);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === quizData.questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizData.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  if (quizData.questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="quiz-loading">Завантаження вікторини...</div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="quiz-container">
        <div className="quiz-result">
          <h2>Результат вікторини</h2>
          <div className="quiz-score">
            Ваш результат: {score} з {quizData.questions.length}
          </div>
          <div className="quiz-buttons">
            <button onClick={resetQuiz}>Пройти знову</button>
            <button onClick={onBack}>На головну</button>
          </div>
        </div>
      </div>
    );
  }

  const question = quizData.questions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>Вікторина з Dota 2</h2>
        <div className="quiz-progress">
          Питання {currentQuestion + 1} з {quizData.questions.length}
        </div>
      </div>

      <div className="quiz-content">
        <h3 className="quiz-question">{question.question}</h3>

        <div className="quiz-answers">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              className={`quiz-answer ${selectedAnswer === index ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(index)}
            >
              {answer}
            </button>
          ))}
        </div>

        <button
          className="quiz-next"
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
        >
          {currentQuestion + 1 === quizData.questions.length ? 'Завершити' : 'Далі'}
        </button>
      </div>
    </div>
  );
};
