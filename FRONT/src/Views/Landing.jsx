import Bar from "../Components/Bar";
import logo from "../assets/calories-icon-4.jpg";
import Footer from "../Components/Footer";

const Landing = () => {
  return (
    <>
      <Bar />
      <div className="container is-max-desktop ">
        <div className="content m-6 is-flex is-align-items-center is-flex-direction-column">
          <img
            src={logo}
            alt={"logo"}
            width={64}
            height={64}
            className="is-algin-self-center "
          />
          <h1 className="is-size-3 is-size-4-mobile has-text-weight-bold">
            Welcome to TracKalories
          </h1>

          <p className="is-size-5 is-size-6-mobile ">
            The app that helps you to search and register the <b>food</b> that
            you eat and the <b>weight</b> that you weight.
          </p>
          <p>If you are trying to:</p>
          <ul>
            <p>Either lose, gain or maintain your weight</p>
            <p>Have instantaneously information about your meals</p>
            <p>Have a register of what you eat and weight</p>
            <p>
              Have an inside in the profile of the macronutrients that your
              meals have
            </p>
            <p>Not spend a dime!</p>
            <p>
              This is you're place.
              <a className="has-text-success" href="./register">
                Join Us
              </a>
            </p>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Landing;
