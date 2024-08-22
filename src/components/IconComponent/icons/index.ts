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
    FaGithub,
    FaLinkedin,
} from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FiLogOut, FiAtSign } from "react-icons/fi";
import { BsCloudDrizzle } from "react-icons/bs";
import { MdOutlinePostAdd, MdDashboard, MdArrowBack } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { WiHumidity, WiWindy } from "react-icons/wi";

export const Icons = {
    User: FaUser,
    Drizzle: BsCloudDrizzle,
    Rain: FaCloudRain,
    Snow: FaSnowflake,
    Sun: FaSun,
    Eye: FaEye,
    Slash: FaEyeSlash,
    CloudSun: FaCloudSun,
    Humidity: WiHumidity,
    Windy: WiWindy,
    ArrowBack: MdArrowBack,
    Search: CiSearch,
    Github: FaGithub,
    Linkedin: FaLinkedin,
    Sign: FiAtSign,
    Lock: FaLock,
    Logout: FiLogOut,
    Add: MdOutlinePostAdd,
    Dashboard: MdDashboard,
    Cross: ImCross,
    Bars: FaBars,
    Cloud: FaCloud,
    Plus: FaPlus,
    Info: FaInfo,
    Home: FaHome,
} as const;

export type IconName = keyof typeof Icons;
