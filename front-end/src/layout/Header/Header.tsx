import React from 'react';
import './Header.css';
import Logo from '../../components/Logo/Logo';
import Button from '@mui/material/Button';
import SearchIcon from '../../assets/icons/search_35dp_FCAF00_FILL0_wght400_GRAD0_opsz40.png';
import LoginIcon from '../../assets/icons/person_35dp_FCAF00_FILL0_wght400_GRAD0_opsz40.png';

const buttonStyles = {
  height: '80px',
  width: '80px',
  border: 'none',
  color: '#fcaf00',
};

const CustomButton = ({
  label,
  iconSrc,
  sxOverrides = {},
  borderDirection = 'right', // Default border to right, can be changed
}: {
  label?: string;
  iconSrc?: string;
  sxOverrides?: object;
  borderDirection?: 'right' | 'left';
}) => (
  <Button
    variant="outlined"
    sx={{
      ...buttonStyles,
      [`border${borderDirection.charAt(0).toUpperCase() + borderDirection.slice(1)}`]: '2px solid #fcaf00', // Dynamic border direction
      ...sxOverrides, // Override styles if needed
    }}
  >
    {iconSrc ? <img src={iconSrc} alt={label} style={{ height: '40px', width: '40px' }} /> : label}
  </Button>
);

const Header: React.FC = () => {
  return (
    <header>
      <div className="schedule-button-container">
        <CustomButton label="Idag" />
        <CustomButton label="Imorgon" />
        <CustomButton label="Senare" />
      </div>
      <div className='logo-container'>
        <Logo />
      </div>
      <div className="search-login-container">
        <CustomButton iconSrc={SearchIcon} borderDirection="left" />
        <CustomButton label="Login" iconSrc={LoginIcon} borderDirection="left" sxOverrides={{ flexDirection: 'column' }} />
      </div>
    </header>
  );
};

export default Header;