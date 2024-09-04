const Spinner = ({
  startColor = "#000",
  middleColor = "#f6fcff",
  endColor = "#f6fcff",
  height = "100vh",
  width = "",
}) => {
  return (
    <div
      className="flex justify-center items-center h-screen place-items-center"
      style={{ height, width }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 66 66"
        height="100px"
        width="100px"
        className="w-[250px] h-[150px] relative rounded-full animate-rotation"
      >
        <circle
          stroke={`url(#gradient-${startColor}-${middleColor}-${endColor})`}
          r="20"
          cy="33"
          cx="33"
          strokeWidth="1"
          fill="transparent"
          className="custom-path stroke-linecap-round"
          d="M10 10 H 90 V 90 H 10 Z"
        ></circle>
        <linearGradient
          id={`gradient-${startColor}-${middleColor}-${endColor}`}
        >
          <stop stopOpacity="1" stopColor={startColor} offset="0%"></stop>
          <stop stopOpacity="1" stopColor={middleColor} offset="50%"></stop>
          <stop stopOpacity="0" stopColor={endColor} offset="100%"></stop>
        </linearGradient>
      </svg>
    </div>
  );
};

export { Spinner };
