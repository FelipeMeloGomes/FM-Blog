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
} from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FiLogOut, FiAtSign } from "react-icons/fi";
import { MdOutlinePostAdd, MdDashboard, MdArrowBack } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { WiHumidity, WiWindy } from "react-icons/wi";

const Icon = ({ name, ...props }) => {
    switch (name) {
        case "user":
            return <FaUser {...props} />;
        case "eye":
            return <FaEye {...props} />;
        case "slash":
            return <FaEyeSlash {...props} />;
        case "cloud-sun":
            return <FaCloudSun {...props} />;
        case "humidity":
            return <WiHumidity {...props} />;
        case "windy":
            return <WiWindy {...props} />;
        case "arrow-back":
            return <MdArrowBack {...props} />;
        case "search":
            return <CiSearch {...props} />;
        case "github":
            return <FaGithub {...props} />;
        case "linkedin":
            return <FaLinkedin {...props} />;
        case "sign":
            return <FiAtSign {...props} />;
        case "lock":
            return <FaLock {...props} />;
        case "logout":
            return <FiLogOut {...props} />;
        case "add":
            return <MdOutlinePostAdd {...props} />;
        case "dashboard":
            return <MdDashboard {...props} />;
        case "cross":
            return <ImCross {...props} />;
        case "bars":
            return <FaBars {...props} />;
        case "cloud":
            return <FaCloud {...props} />;
        case "plus":
            return <FaPlus {...props} />;
        case "info":
            return <FaInfo {...props} />;
        case "home":
            return <FaHome {...props} />;
        default:
            return null;
    }
};

export default Icon;
