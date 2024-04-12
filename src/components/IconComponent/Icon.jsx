import {
    FaBars,
    FaHome,
    FaInfo,
    FaCloud,
    FaPlus,
    FaUser,
    FaLock,
    FaCloudSun,
    FaEye,
    FaEyeSlash,
    FaSun,
    FaSnowflake,
    FaCloudRain,
} from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FiLogOut, FiAtSign } from "react-icons/fi";
import { BsCloudDrizzle } from "react-icons/bs";
import { MdOutlinePostAdd, MdDashboard, MdArrowBack } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { WiHumidity, WiWindy } from "react-icons/wi";

const iconMapping = {
    user: FaUser,
    drizzle: BsCloudDrizzle,
    rain: FaCloudRain,
    snow: FaSnowflake,
    sun: FaSun,
    eye: FaEye,
    slash: FaEyeSlash,
    cloudSun: FaCloudSun,
    humidity: WiHumidity,
    windy: WiWindy,
    arrowBack: MdArrowBack,
    search: CiSearch,
    github: FaGithub,
    linkedin: FaLinkedin,
    sign: FiAtSign,
    lock: FaLock,
    logout: FiLogOut,
    add: MdOutlinePostAdd,
    dashboard: MdDashboard,
    cross: ImCross,
    bars: FaBars,
    cloud: FaCloud,
    plus: FaPlus,
    info: FaInfo,
    home: FaHome,
};
const Icon = ({ name, ...props }) => {
    const IconComponent = iconMapping[name];
    return IconComponent ? <IconComponent {...props} /> : null;
};

export default Icon;
