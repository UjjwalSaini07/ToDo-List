import React from "react";
import { useTheme } from "./ThemeContext";

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: "10px",
        right: "18px",
        zIndex: 1000,
      }}
    >
      <button
        onClick={toggleTheme}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: isDarkMode ? "flex-end" : "flex-start",
          width: "80px",
          height: "40px",
          backgroundColor: isDarkMode ? "#1e1e1e" : "#ffcc00",
          borderRadius: "20px",
          border: "2px solid",
          borderColor: isDarkMode ? "#ffffff" : "#ffcc00",
          cursor: "pointer",
          padding: "5px",
          transition: "all 0.4s ease",
          boxShadow: isDarkMode
            ? "0 4px 15px rgba(255, 255, 255, 0.2)"
            : "0 4px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <span
          style={{
            fontSize: "20px",
            color: isDarkMode ? "#ffcc00" : "#1e1e1e",
            transition: "color 0.4s ease",
          }}
        >
          {isDarkMode ? "🌙" : "☀️"}
        </span>
      </button>
    </div>
  );
}

export default ThemeToggle;

// ! But due to this code after refreshing it raise Problem - It go initial mode as Light Mode
// Todo: Previous Code
// import React, { useState } from "react";

// function ThemeToggle() {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//     document.body.style.backgroundColor = isDarkMode ? "#ffffff" : "#1e1e1e";
//     document.body.style.color = isDarkMode ? "#000000" : "#ffffff";
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         position: "fixed",
//         top: "10px",
//         right: "18px",
//         zIndex: 1000,
//       }}
//     >
//       <button
//         onClick={toggleTheme}
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: isDarkMode ? "flex-end" : "flex-start",
//           width: "80px",
//           height: "40px",
//           backgroundColor: isDarkMode ? "#1e1e1e" : "#ffcc00",
//           borderRadius: "20px",
//           border: "2px solid",
//           borderColor: isDarkMode ? "#ffffff" : "#ffcc00",
//           cursor: "pointer",
//           padding: "5px",
//           transition: "all 0.4s ease",
//           boxShadow: isDarkMode
//             ? "0 4px 15px rgba(255, 255, 255, 0.2)"
//             : "0 4px 15px rgba(0, 0, 0, 0.2)",
//         }}
//       >
//         <span
//           style={{
//             fontSize: "20px",
//             color: isDarkMode ? "#ffcc00" : "#1e1e1e",
//             transition: "color 0.4s ease",
//           }}
//         >
//           {isDarkMode ? "🌙" : "☀️"}
//         </span>
//       </button>
//     </div>
//   );
// }

// export default ThemeToggle;

