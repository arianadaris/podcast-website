import Logo from '@/assets/logo.png';
import Link from '../Link';

type LogoProps = {
    width: number | string;
};

const LogoComponent: React.FC<LogoProps> = ({ width }) => {
    return <Link to="/">
        <img src={Logo} alt="Logo" style={{ width }} />
    </Link>;
};

export default LogoComponent;