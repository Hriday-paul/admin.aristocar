export const getStatusClasses = (status) => {
  
  switch (status) {
    case "info":
      return "!bg-[#e6f4ff] !text-[#3d7ce2] !border-transparent !rounded font-medium";
    case "ongoing":
      return "!text-[#faede8] !bg-[#f7845e] !border-transparent !rounded !font-medium";
    case "completed":
      return "!bg-[#056e48] !text-white !border-transparent !rounded !font-medium";
    case "pending":
      return "!bg-[#0056d2] !text-white !border-transparent !rounded !font-medium";
    case "approved":
      return "!bg-[#056e48] !text-white !border-transparent !rounded !font-medium";

    case "cancelled": // Handles both "canceled" and "cancelled"
      return "!bg-[#780606] !text-white !border-transparent !rounded !font-medium";
    default:
      return "!border-transparent !rounded !font-medium"; // Default fallback classes
  }
};
