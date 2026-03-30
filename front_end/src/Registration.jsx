import { useState } from 'react';
import styles from './styles/RegistrationComponent.module.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const API_URL = (import.meta.env.MODE === 'development') ? 'http://localhost:3000/api/' : 'https://task.drimt.co/back_end/api/';

function RegistrationForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [repeatPassword, setRepeatPassword] = useState(''); // Add state for repeat password

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value.trim(),
    });
    setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));

    if (name === "repeatPassword") {
      setRepeatPassword(value.trim()); // Update repeatPassword state
    }
  };

  const validateForm = () => {
    const newErrors = {};
    newErrors.name = formData.name ? "" : t("nameRequired"); // Translate error messages
    newErrors.email = formData.email ? "" : t("emailRequired");

    if (!formData.password) {
      newErrors.password = t("passwordRequired");
    } else if (formData.password.length < 6) {
      newErrors.password = t("passwordLength");
    } else {
      newErrors.password = "";
    }

    newErrors.repeatPassword = repeatPassword ? "" : t("repeatPasswordRequired"); // Use repeatPassword state
    if (formData.password !== repeatPassword) { // Compare with repeatPassword state
      newErrors.repeatPassword = t("passwordsMatch");
    } else {
      newErrors.repeatPassword = "";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      try {
        const response = await fetch(`${API_URL}user/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('TOKEN') ? `Bearer ${localStorage.getItem('TOKEN')}` : undefined,
          },
          body: JSON.stringify(formData),
        });

        console.log('Form data:', formData);

        if (response.ok) {
          console.log('Registration successful!');
          alert(t('registrationSuccess')); // Translate success message
          navigate('/');
        } else {
          console.error('Registration failed:', await response.text());
          const errorData = await response.json(); // Try to parse JSON error response
          if (errorData && errorData.message) {
            alert(errorData.message); // Display server error message if available
          } else {
            alert(t('registrationFailed')); // Generic error message
          }
        }
      } catch (error) {
        console.error('Error during registration:', error);
        alert(t('registrationError')); // Translate generic error message
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.logTitel}>{t('registrationTitle')}</h1>
        <div className={styles.registrationContainer}>
          <div className={styles.formRow}>
            <label htmlFor="name" className={styles.label}>
              {t('nameLabel')}
            </label>
            <div className={styles.fieldContainer}>
              <input
                className={styles.registrationForm}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
          </div>


          <div className={styles.formRow}>
            <label htmlFor="email" className={styles.label}>
              {t('emailLabel')}
            </label>
            <div className={styles.fieldContainer}>
              <input
                className={styles.registrationForm}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>
          </div>

          <div className={styles.formRow}>
            <label htmlFor="password" className={styles.label}>
              {t('passwordLabel')}
            </label>
            <div className={styles.fieldContainer}>
              <input
                className={styles.registrationForm}
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className={styles.error}>{errors.password}</p>}
            </div>
          </div>

          <div className={styles.formRow}>
            <label htmlFor="repeatPassword" className={styles.label}>
              {t('repeatPasswordLabel')}
            </label>
            <div className={styles.fieldContainer}>
              <input
                className={styles.registrationForm}
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                value={repeatPassword} // Use repeatPassword state
                onChange={handleChange}
              />
              {errors.repeatPassword && <p className={styles.error}>{errors.repeatPassword}</p>}
            </div>
          </div>
          <div className={styles.registrationButtonDirection}>
            <button type="submit" className={styles.registrationButton}>
              {t('registerButton')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;