import { useState, type FormEvent, type FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginManual } from '../api'; 
import { setAuth } from '../store/slices/userSlice';

export const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    let hasEmptyFields = false;
    if (!formData.username) {
      setLoginError(true);
      hasEmptyFields = true;
    }
    if (!formData.password) {
      setPasswordError(true);
      hasEmptyFields = true;
    }

    if (hasEmptyFields) return;
    
    try {
      await loginManual(formData);
      dispatch(setAuth(1));
      navigate('/production_types');
    } catch (error) {
      setLoginError(true);
      setPasswordError(true);
    }
  };

  return (
    <div className="content-area login-wrapper">
      <h3 className="login-title">Введите логин и пароль</h3>
      
      <form onSubmit={handleSubmit} className="login-form">
        <input 
          type="text" 
          placeholder="Логин" 
          value={formData.username}
          onChange={(e) => {
            setFormData({...formData, username: e.target.value});
            setLoginError(false);
          }}
          className={`login-input ${loginError ? 'input-error' : ''}`}
        />
        
        <div className="password-wrapper">
          <input 
            type={showPassword ? "text" : "password"}
            placeholder="Пароль" 
            value={formData.password}
            onChange={(e) => {
              setFormData({...formData, password: e.target.value});
              setPasswordError(false);
            }}
            className={`login-input ${passwordError ? 'input-error' : ''}`}
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="delete-link password-toggle-btn"
          >
            {showPassword ? 'Скрыть' : 'Показать'}
          </button>
        </div>

        <button type="submit" className="login-btn">
          ВОЙТИ
        </button>
      </form>
    </div>
  );
};