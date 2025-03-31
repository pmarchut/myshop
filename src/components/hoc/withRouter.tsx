import { ComponentType } from "react";
import { useNavigate } from "react-router-dom";

const withRouter = <P extends object>(Component: ComponentType<P>) => {
  return (props: P) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
};

export default withRouter;
