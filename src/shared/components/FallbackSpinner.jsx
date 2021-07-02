import React from "react";
import { ScaleLoader } from "react-spinners";
import { Card } from "reactstrap";

import Logo from "./Logo";

const Fallback = () => (
  <div className="fallback-spinner">
    <Card className="text-center fallback-spinner-card">
      <Logo home={true} className="mb-sm-2 position-static" />
      <div className="p-sm-3">
        <ScaleLoader color="rgb(247, 201, 62)" size={150} width={7} />
      </div>
    </Card>
  </div>
);

export default Fallback;
