import ApplyForm from "./ApplyForm";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useRef, useState} from "react";

const spaceshipVariant = {
  hidden: {
    x: 150,
    opacity: 0
  },
  visible: {
    x: 0,
    y: [0, -20, 20, 0],
    opacity: 1,
    transition:{
      delay: 1,
      duration: 5,
      opacity: {
        duration: 1
      }
    }
  },
  exit: {
    opacity: 0
  }
}

const Apply = () => {
  const spaceship = useRef(null);
  const yoda = useRef(null);
  const layerRef = useRef(null);
  const [spaceshipImg, setSpaceshipImg] = useState(false);
  const [spaceshipGif, setSpaceshipGif] = useState(false);
  const [mouseGif, setMouseGif] = useState(false);
  const [resetAnimation, setResetAnimation] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const prevButton = useRef(null);
  const nextButton = useRef(null);
  const submitButton = useRef(null);
  const [centerElement, setCenterElement] = useState(false);
  const [error, setError] = useState([]);

  const [travelerName, setTravelerName] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [homePlanet, setHomePlanet] = useState("");

  const changeSpaceship = () => {
    console.log(spaceship);
    setSpaceshipGif(true);
    // yoda.current.style.display = "block";
    setTimeout(() => {
      setSpaceshipGif(false);
    }, 3000);
    // spaceship.current.style.display = "none";
  }

  const changeScenario = () => {
    // layerRef.current.style.background = "#000";
    setResetAnimation(true);
  }

  useEffect(() => {
    // if(resetAnimation) {
      // setResetAnimation(false);
    const formPage = document.querySelectorAll('.formPage');
    formPage[currentPage].style.display = "block";
    console.log(formPage);
    const timer = setTimeout(() => {
      setMouseGif(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const performValidation = () => {
    let error = 0;
    setError([]);
    if(!travelerName) {
      setError((errors) => [...errors, "travelerName"]);
      error = 1;
    }
    if(!species) {
      setError((errors) => [...errors, "species"]);
      error = 1;
    }
    if(!gender) {
      setError((errors) => [...errors, "gender"]);
      error = 1;
    }
    if(!homePlanet) {
      setError((errors) => [...errors, "homePlanet"]);
      error = 1;
    }

    return error;
  }

  const changePage = (type) => {
    const error = performValidation();
    if(!error) {
      const formPage = document.querySelectorAll('.formPage');
      const totalPages = 8;
      formPage[currentPage].style.display = "none";
      if (type === 1) {
        if (currentPage === 0) {
          prevButton.current.style.display = "inline-block";
        } else if (currentPage === totalPages - 2) {
          nextButton.current.style.display = "none";
          submitButton.current.style.display = "inline-block";
        }

        if (currentPage === 4 || currentPage === totalPages - 2) {
          setCenterElement(true);
        } else if (centerElement) {
          setCenterElement(false);
        }
        formPage[currentPage + 1].style.display = "block";
        setCurrentPage(currentPage + 1);
      } else {
        if (currentPage === 1) {
          prevButton.current.style.display = "none";
        } else if (currentPage === totalPages - 1) {
          submitButton.current.style.display = "none";
          nextButton.current.style.display = "inline-block";
        }

        if (currentPage === 6) {
          setCenterElement(true);
        } else if (centerElement) {
          setCenterElement(false);
        }

        formPage[currentPage - 1].style.display = "block";
        setCurrentPage(currentPage - 1);
      }
    }
  }

  return (
    <div className="Apply">
    {/*  <div className="pageHeading">Apply for Your Cosmic Adventure</div>*/}
    {/*  <div className="applyContent">*/}
    {/*    <p>*/}
    {/*      Ready to embark on a journey to Planet Zz, the ultimate destination for leisure and exploration?*/}
    {/*    </p>*/}
    {/*    <p>*/}
    {/*      Fill out the application form below to apply for your visit to our extraordinary planet.*/}
    {/*    </p>*/}
    {/*    <ApplyForm />*/}
    {/*  </div>*/}
      <div className="Panes">
        <div className="leftPane">
          <img src={require("../img/apply/apply_0.jpg")} alt="Planet Zz" />
          <div ref={layerRef} className="imgLayer"></div>
          <div className="imgContent">
            <div className="imgHeading">Begin Your Journey to Planet Zz</div>
            <p className="imgText">It starts here!</p>
            {spaceshipImg && <motion.img
              className="gifImage spaceship" src={require("../img/apply/spaceship.png")} alt=""
              ref={spaceship}
              variants={spaceshipVariant}
              initial="hidden"
              animate="visible"
              onAnimationComplete={() => changeSpaceship()}
            />}
            <AnimatePresence onExitComplete={() => changeScenario()}>
            {spaceshipGif &&
              <motion.img
                ref={yoda}
                className="gifImage spaceship yoda" src={require("../img/apply/yoda.gif")} alt=""
                initial={{x: 0, opacity: 1}}
                exit={{x: -150, opacity: 0,
                  transition: {
                    duration: 0.2,
                    opacity: {delay: 0.1, duration: 0.1}
                }}}
                onLoad={() => setSpaceshipImg(false)}
              />
            }
            </AnimatePresence>
            {mouseGif &&
              <motion.img
                className="gifImage" src={require("../img/apply/mouse.gif")} alt=""
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.7}}
                onLoad={() => {
                  setTimeout(() => {
                    setSpaceshipImg(true);
                    setMouseGif(false);
                  }, 2400);
                }}
              />
            }
            {resetAnimation &&
              <motion.img
                className="gifImage visual" src={require("../img/apply/visualization.gif")} alt=""
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 1}}
              />
            }
          </div>
        </div>
        <div className="rightPane">
          <div className="formPage">
            <div className="formHeading">&#x25BA; Traveler Information [1/2]</div>
            <form>
              <label>Traveler's Name:</label>
              <input
                className={error.includes("travelerName") ? "errorInput" : ""}
                type="text"
                maxLength="50"
                value={travelerName}
                onChange={(e) => {
                  setTravelerName(e.target.value);
                  setError(error.filter(err => err !== "travelerName"));
                }}
              />
              {error.includes("travelerName") && <div className="error">Please enter Traveler's Name.</div>}

              <label>Species:</label>
              <input
                className={error.includes("species") ? "errorInput" : ""}
                type="text"
                maxLength="50"
                value={species}
                onChange={(e) => {
                  setSpecies(e.target.value);
                  setError(error.filter(err => err !== "species"));
                }}
              />
              {error.includes("species") && <div className="error">Please enter correct Species.</div>}

              <label>Gender Identity:</label>
              <select
                className={error.includes("gender") ? "errorInput" : ""}
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setError(error.filter(err => err !== "gender"));
                }}
              >
                <option value="" disabled hidden>Please choose</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              {error.includes("gender") && <div className="error">Please choose Gender Identity.</div>}

              <label>Home Planet:</label>
              <input
                className={error.includes("homePlanet") ? "errorInput" : ""}
                type="text"
                maxLength="50"
                value={homePlanet}
                onChange={(e) => {
                  setHomePlanet(e.target.value);
                  setError(error.filter(err => err !== "homePlanet"));
                }}
              />
              {error.includes("homePlanet") && <div className="error">Please enter your Home Planet.</div>}

            </form>
          </div>

          <div className="formPage">
            <div className="formHeading">&#x25BA; Traveler Information [2/2]</div>
            <form>
              <label>Date of Birth:</label>
              <input type="date" />

              <label>Contact Email:</label>
              <input type="text" />
            </form>
          </div>

          <div className="formPage">
            <div className="formHeading">&#x25BA; Travel Details</div>
            <form>
              <label>Departure Location:</label>
              <input type="text" />

              <label className="datesLabel">Desired Travel Dates:</label>
              <div className="travelDates">
                <p>From:</p>
                <input className="dates" type="date" />
              </div>
              <div className="travelDates">
                <p>To:</p>
                <input className="dates" type="date" />
              </div>

              <label className="radioLabel">Accommodation Preference:</label>
              <div className="radios">
                <label><input className="radio" type="radio" value="Luxury Hotel" /> &nbsp;Luxury Hotel</label>
                <label><input className="radio" type="radio" value="Aerial Pods" /> &nbsp;Aerial Pods</label>
                <label><input className="radio" type="radio" value="Wilderness Camp" /> &nbsp;Wilderness Camp</label>
              </div>
            </form>
          </div>

          <div className="formPage">
            <div className="formHeading">&#x25BA; Medical Information</div>
            <form>
              <label>Medical History (if any):</label>
              <textarea rows="5" />

              <label>Allergies (if any):</label>
              <input type="text" />

              <label className="radioLabel">Dietary Preference:</label>
              <div className="radios">
                <label><input className="radio" type="radio" value="Luxury Hotel" /> &nbsp;Artificial Food Diet</label>
                <label><input className="radio" type="radio" value="Aerial Pods" /> &nbsp;Vegetable Diet</label>
                <label><input className="radio" type="radio" value="Wilderness Camp" /> &nbsp;Non-Vegetarian Diet</label>
              </div>
            </form>
          </div>

          <div className="formPage">
            <div className="formHeading">&#x25BA; Additional Information</div>
            <form>
              <label>Travel Purpose:</label>
              <select defaultValue="default">
                <option value="default" disabled hidden> Please specify</option>
                <option>Exploration</option>
                <option>Diplomacy</option>
                <option>Leisure</option>
              </select>

              <label>Special Requests (if any):</label>
              <textarea rows="5" />
            </form>
          </div>

          <div className="formPage">
            <div className="formHeading centerHeading">&#x25BA; Terms and Conditions</div>
              <div className="tnC">
                <h4>Introduction</h4>
                <p>
                  Planet Zz Interplanetary Travel Services ("we," "our," or "us") welcomes you to the extraordinary journey of interplanetary exploration. These Terms and Conditions govern your travel experience with us. By submitting your application and participating in our travel program, you agree to abide by these terms.
                </p>

                <h4>Booking and Application</h4>
                <p>
                  <ul>
                    <li>Travel applications must be submitted through our official website or designated channels.</li>
                    <li>You must meet eligibility criteria specified in the application process.</li>
                    <li>All applications are subject to review, approval, and availability.</li>
                  </ul>
                </p>

                <h4>Travel Itinerary</h4>
                <p>
                  <ul>
                    <li>Your travel itinerary, as provided upon confirmation, includes details about destinations, activities, duration, and accommodations.</li>
                    <li>We reserve the right to modify the itinerary due to unforeseen circumstances, ensuring your safety and experience remain paramount.</li>
                  </ul>
                </p>

                <h4>Traveler Responsibilities</h4>
                <p>
                  <ul>
                    <li>You are expected to conduct yourself responsibly and respectfully throughout the journey.</li>
                    <li>Compliance with safety, security, and ecological preservation guidelines is mandatory.</li>
                    <li>Failure to comply may result in termination of your travel without refund.</li>
                  </ul>
                </p>

                <h4>Health and Medical</h4>
                <p>
                  <ul>
                    <li>Travelers must provide proof of satisfactory health and fitness levels to participate in interplanetary travel.</li>
                    <li>Vaccinations, medical examinations, and health certificates may be required based on your destination and species.</li>
                    <li>Travelers are encouraged to carry necessary medications and personal medical supplies.</li>
                  </ul>
                </p>

                <h4>Travel Documents</h4>
                <p>
                  <ul>
                    <li>You are responsible for obtaining and maintaining valid identification documents, visas, and permits required for your interplanetary journey.</li>
                    <li>Ensure the accuracy and validity of your travel documents.</li>
                  </ul>
                </p>

                <h4>Accommodations and Services</h4>
                <p>
                  <ul>
                    <li>Accommodations and services provided are outlined in your itinerary.</li>
                    <li>We reserve the right to make reasonable changes to accommodations and services to enhance your experience or address unforeseen situations.</li>
                  </ul>
                </p>

                <h4>Payment and Cancellation</h4>
                <p>
                  <ul>
                    <li>Payment terms, including deposits and payment schedules, are specified in your booking.</li>
                    <li>Cancellation policies, refund eligibility, and penalties are outlined in your booking confirmation.</li>
                  </ul>
                </p>

                <h4>Travel Insurance</h4>
                <p>
                  <ul>
                    <li>We strongly recommend that you obtain comprehensive travel insurance coverage for your interplanetary journey.</li>
                    <li>Review available insurance options and understand coverage limitations.</li>
                  </ul>
                </p>

                <h4>Changes and Delays</h4>
                <p>
                  <ul>
                    <li>We may make itinerary changes, delays, or substitutions as necessary to ensure your safety and overall experience.</li>
                    <li>Compensation or alternatives will be provided in the case of significant changes.</li>
                  </ul>
                </p>

                <h4>Liability and Disclaimers</h4>
                <p>
                  <ul>
                    <li>We assume no liability for unforeseen events, acts of nature, accidents, or third-party actions.</li>
                    <li>Travelers are advised to exercise caution and follow safety instructions during the journey.</li>
                  </ul>
                </p>

                <h4>Traveler Consent</h4>
                <p>
                  <ul>
                    <li>By submitting your application, you consent to these Terms and Conditions.</li>
                    <li>You acknowledge and assume potential risks associated with interplanetary travel.</li>
                  </ul>
                </p>

                <h4>Privacy Policy</h4>
                <p>
                  <ul>
                    <li>Our data collection and privacy practices are explained in our Privacy Policy.</li>
                    <li>Traveler information is used for booking, communication, safety, and compliance purposes.</li>
                  </ul>
                </p>

                <h4>Governing Law and Dispute Resolution</h4>
                <p>
                  <ul>
                    <li>This agreement is governed by the laws of the Intergalactic Federation.</li>
                    <li>Disputes will be resolved through mediation, arbitration, or legal proceedings as required by applicable laws.</li>
                  </ul>
                </p>

                <h4>Termination and Non-Compliance</h4>
                <p>
                  <ul>
                    <li>We may terminate a traveler's participation due to non-compliance with these Terms and Conditions.</li>
                    <li>Consequences of non-compliance are outlined in this agreement.</li>
                  </ul>
                </p>

                <h4>Amendments to Terms and Conditions</h4>
                <p>
                  <ul>
                    <li>We reserve the right to update or modify these Terms and Conditions at any time.</li>
                    <li>Travelers will be notified of any changes, and the latest version will be available on our website.</li>
                  </ul>
                </p>

                <h4>Contact Information</h4>
                <p>
                  <ul>
                    <li>For inquiries, support, or to request a copy of these Terms and Conditions, contact our Customer Support at <a href="mailto:support@planetzztravel.com">support@planetzztravel.com</a>.</li>
                  </ul>
                </p>

                <p>By submitting your application and participating in our interplanetary travel program, you confirm that you have read, understood, and accepted these Terms and Conditions. Your journey to Planet Zz is subject to these terms, so please retain a copy for your reference.</p>

              </div>
          </div>

          <div className="formPage">
            <div className="formHeading">&#x25BA; Document Upload</div>
            <form>
              <label>Interplanetary Travel Passport:</label>
              <input type="file" />

              <label>Identity Proof:</label>
              <input type="file" />

              <label>Health Certificate:</label>
              <input type="file" />
            </form>
          </div>

          <div className="formPage">
            <div className="formHeading centerHeading">&#x25BA; Confirmation</div>
            <form>
              <label>
                <input className="radio" type="checkbox"/> &nbsp;I have read the Terms and Conditions.
              </label>

              <label>
                <input className="radio" type="checkbox"/> &nbsp;I have read the <a href="/privacypolicy">Privacy Policy</a>.
              </label>
            </form>
          </div>

          <div className={centerElement ? "formBut centerElement" : "formBut"}>
            <button ref={prevButton} className="prevBut" type="button" onClick={() => changePage(-1)}>Prev</button>
            <button ref={nextButton} className="nextBut" type="button" onClick={() => changePage(1)}>Next</button>
            <button ref={submitButton} className="submitBut" type="button">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;