import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

interface LoadingSpinnerProps {
  loading: boolean;
}

const LoadingSpinner = ({ loading }: LoadingSpinnerProps) => {
  return (
    <div className="sweet-loading">
      <ClipLoader
        color={"D0021B"}
        loading={loading}
        cssOverride={override}
        size={150}
      />
    </div>
  );
};

export default LoadingSpinner;
