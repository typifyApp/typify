import { AppBar, Box, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import brand from '../utils/brand';

export interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  const reFocus = () => {
    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }
  };
  return (
    <AppBar position="static" className="header" elevation={0}>
      <Toolbar>
        <Box
          justifyItems="center"
          justifyContent="space-between"
          display="flex"
          alignItems="center"
          className="wide"
        >
          <Link to={'/'} onClick={reFocus}>
            <img src={brand.logoURL} alt="typify logo" className={`t-key `} />
          </Link>
          <h1 className={`title`}>{brand.name}</h1>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
