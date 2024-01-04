import "../Assets/styles/login.css";
import Logo from "../Assets/images/logo-text.png";

const Login = () => {
  return (
    <body>
      <div className="top">
        <div className="logo">
          <img src={Logo} alt="logo of travel buddy" width="100px" />
        </div>
      </div>

      <div className="upper-top">
        <p className="heading">SELLER LOGIN</p>
        <p className="sub-heading">
          Don't have an account, <a href="/">Sign up</a>
        </p>
      </div>

      <div className="form">
        <form action="">
          <label for="username">Username/Email</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          />

          <label for="shop">Shop Name</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Your shop name"
          />

          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />

          <div className="remember-forgot">
            <div className="remember-me">
              <input type="checkbox" name="remember" id="remember" />
              <label for="remember">Remember me</label>
            </div>
            <a className="forget-password" href="/forgetpassword">
              Forget Password?
            </a>
          </div>

          <input type="submit" value="Sign in" />
        </form>
      </div>

      <div className="bottom">
        <p>Sign in as</p>
        <p>
          <a href="/login">User</a> or <a href="/login/guide">Guide</a>
        </p>
      </div>
    </body>
  );
};

export default Login;
