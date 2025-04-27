import React from "react";
import { Loader2 } from "lucide-react";

const FallbackLoader = () => {
  return (
    <div className="w-full flex justify-center gap-2 p-5">
      <Loader2 className="h-14 w-14 animate-spin mx-auto" />
    </div>
  );
};

export default FallbackLoader;
