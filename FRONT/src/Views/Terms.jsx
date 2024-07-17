import logo from "../assets/calories-icon-4.jpg";

const Terms = () => {
  return (
    <div className="container is-max-desktop ">
      <div className="content m-6 is-flex is-align-items-center is-flex-direction-column">
        <a href="/">
          <span className="icon has-text-success is-large">
            <i className="fas fa-2x fa-solid fa-arrow-left "></i>
          </span>
        </a>
        <img
          src={logo}
          alt={"logo"}
          width={64}
          height={64}
          className="is-algin-self-center"
        />

        <h1 className="is-size-3 is-size-4-mobile has-text-weight-bold">
          TracKalories
        </h1>

        <p className="is-size-6  ">
          This is a portofolio app. The application does not have any cookie,
          all the authentication is managed by JSON Web Tokens. If you desire,
          and you're registered, you can eliminate all(profile and registers)
          your information in the app. This page is not lucrative, thus the data
          will never be interchanged.
        </p>
        <div className="is-size-6">
          Creator Jordi Belda, you can contact me at{" "}
          <a className="has-text-success" href="https://github.com/jorbelca">
            github
          </a>
        </div>
      </div>
    </div>
  );
};

export default Terms;
