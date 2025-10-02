import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faUser, faShuffle, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../../contexts/UserContext';
import './RoleSwitcher.css';

const roleOptions = [
  {
    value: 'admin',
    label: 'Admin Console',
    description: 'Manage openings, candidates, and assessments.',
    icon: faUserTie
  },
  {
    value: 'candidate',
    label: 'Candidate View',
    description: 'Browse jobs, track applications, and take assessments.',
    icon: faUser
  }
];

const RoleSwitcher = () => {
  const { user, switchRole } = useUser();
  const [expanded, setExpanded] = useState(true);

  if (!user) return null;

  const handleSwitch = (value) => {
    if (user.role !== value) {
      switchRole(value);
    }
  };

  return (
    <aside className={`role-switcher ${expanded ? 'role-switcher--open' : ''}`} aria-live="polite">
      <button
        type="button"
        className="role-switcher__toggle"
        onClick={() => setExpanded((state) => !state)}
        aria-expanded={expanded}
      >
        <FontAwesomeIcon icon={faShuffle} aria-hidden="true" />
        <span>{expanded ? 'Hide role switcher' : 'Switch viewing role'}</span>
      </button>

      <div className="role-switcher__panel" role="group" aria-label="Select a viewing role">
        <header className="role-switcher__header">
          <span className="role-switcher__eyebrow">Demo mode</span>
          <h2 className="role-switcher__title">Choose how you explore TalentFlow</h2>
          <p className="role-switcher__subtitle">
            You are currently viewing the product as <strong>{user.role === 'admin' ? 'an HR admin' : 'a candidate'}</strong>.
          </p>
        </header>

        <div className="role-switcher__options">
          {roleOptions.map((option) => {
            const isActive = user.role === option.value;
            return (
              <button
                key={option.value}
                type="button"
                className={`role-switcher__option ${isActive ? 'role-switcher__option--active' : ''}`}
                onClick={() => handleSwitch(option.value)}
                aria-pressed={isActive}
              >
                <div className="role-switcher__option-icon">
                  <FontAwesomeIcon icon={option.icon} aria-hidden="true" />
                </div>
                <div className="role-switcher__option-body">
                  <div className="role-switcher__option-heading">
                    <span className="role-switcher__option-label">{option.label}</span>
                    {isActive && (
                      <span className="role-switcher__option-active">
                        <FontAwesomeIcon icon={faCircleCheck} aria-hidden="true" />
                        Active
                      </span>
                    )}
                  </div>
                  <p className="role-switcher__option-description">{option.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default RoleSwitcher;
