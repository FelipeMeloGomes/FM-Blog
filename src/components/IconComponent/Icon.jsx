import {
    FaBars,
    FaHome,
    FaInfo,
    FaCloud,
    FaPlus,
    FaUser,
    FaLock,
} from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FiLogOut, FiAtSign } from "react-icons/fi";
import { MdOutlinePostAdd, MdDashboard } from "react-icons/md";

const Icon = ({ name, ...props }) => {
    switch (name) {
        case "user":
            return <FaUser {...props} />;
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
