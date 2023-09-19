import {AnimatePresence, motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import ApplyModalDetails from "./ApplyModalDetails";
import ActivityModalDetails from "./ActivityModalDetails";

const backdropVariant = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren'
    }
  }
}

const modalVariant = {
  visible: {
    opacity: 1,
    scale: 1
  },
  exit: {
    opacity: 0
  }
}

const Modal = ({ type, modalData, changeModalData, modalPos = null }) => {
  const navigate = useNavigate();

  const closeModal = () => {
    changeModalData(null);
  }
  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => (type === "apply") && navigate('/')}
    >
      {modalData &&
        <>
          <motion.div
            className="backdrop"
            variants={backdropVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => closeModal()}
          ></motion.div>

          <motion.div
            className="modal"
            custom={modalPos}
            variants={modalVariant}
            initial={modalPos ?
              {opacity: 0.5, scale: 0.2, originX: modalPos.x+"px", originY: modalPos.y+"px"} :
              {opacity: 0.5, scale: 0.2}
            }
            animate="visible"
            exit="exit"
          >
            {type === "apply" && <ApplyModalDetails handleSubmit={closeModal} />}
            {type === "activity" && <ActivityModalDetails modalData={modalData} />}
            <div className="closeButton" onClick={() => closeModal()}>
              <img src={require("../img/close.png")} alt="close"/>
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>
  );
};

export default Modal;