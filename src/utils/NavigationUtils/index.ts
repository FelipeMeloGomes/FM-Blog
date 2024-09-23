import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleAboutClick = () => {
    navigate("/about");
  };

  const handleWeatherClick = () => {
    navigate("/weather");
  };

  return {
    handleProfileClick,
    handleAboutClick,
    handleWeatherClick,
  };
};
