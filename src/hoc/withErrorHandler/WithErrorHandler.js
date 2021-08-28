import React from "react";
import Modal from "../../components/UI/modal/Modal.js";
import Aux from "../Auxiliary/Auxiliary";
import useHttpErrorHandler from "../../hooks/UseHttpErrorHandler";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};
// const withErrorHandler = (WrappedComponent, axios) => {
//   return (props) => {
//     const [error, clearError] = useHttpErrorHandler(axios);

//     return (
//       <Aux>
//         <Modal show={error} modalClosed={clearError}>
//           {error ? error.message : null}
//         </Modal>
//         <WrappedComponent {...props} />
//       </Aux>
//     );
//   };
// };

export default withErrorHandler;
