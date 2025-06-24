const SignInModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Спроба входу з email: ${email}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="modal-header">
          <h2 className="modal-title">Увійти до сайту</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="Введіть ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Пароль</label>
            <input
              type="password"
              className="form-input"
              placeholder="Введіть ваш пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="submit-button-div">
              <button type="submit" className="submit-btn">Увійти</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};