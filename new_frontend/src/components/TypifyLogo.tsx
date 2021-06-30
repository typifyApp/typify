import brand from "../utils/brand"
export interface TypifyLogoProps {

}

const TypifyLogo: React.FunctionComponent<TypifyLogoProps> = () => {
    return (<img src={brand.logoURL} alt="Typify logo" className="typify-logo" />);
}

export default TypifyLogo;