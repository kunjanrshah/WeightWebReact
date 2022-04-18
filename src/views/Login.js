import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { ApiService } from "services";

function Login() {

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const history = useHistory();

  if(localStorage.getItem('at'))
  {
    history.push('/admin/dashboard');
  }

  async function handleLogin () {
    const data = await ApiService(`auth/login`, 'POST', JSON.stringify({
      "email": emailInput.current.value,
      "password": passwordInput.current.value
    }),
    {
      'Content-Type': 'application/json'
    });
    console.log("🚀 ~ file: Login.js ~ line 31 ~ handleLogin ~ data", data)
    localStorage.setItem('at', data.token.accessToken)
    localStorage.setItem('privilege', data.user.role)
    history.push('/admin/dashboard');
  }

  function handleRegister () {
    history.push('/register');
  }

  return (
    <>
      {/* <Container fluid> */}
        {/* <Row> */}
          <section  style={{background: "#6a11cb", background: "-webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))", background: "linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))"}}>
            <div className="container">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div className="mt-4 card bg-dark text-white" style={{borderRadius: "1rem"}}>
                    <div className="card-body p-5 text-center">

                      <div style={{marginTop: '7rem', marginBottom: '7rem'}}>

                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                        <p className="text-white-50 mb-5">Please enter your login and password!</p>

                        <div className="form-outline form-white mb-4">
                          <input ref={emailInput} type="email" id="typeEmailX" className="form-control form-control-lg"  />
                          <label className="form-label" htmlFor="typeEmailX">USERNAME</label>
                        </div>

                        <div className="form-outline form-white mb-4">
                          <input ref={passwordInput} type="password" id="typePasswordX" className="form-control form-control-lg"  />
                          <label className="form-label" htmlFor="typePasswordX">Password</label>
                        </div>

                        {/* <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p> */}

                        <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={() => handleLogin()}>Login</button>

                      </div>

                      <div>
                        <p className="mb-0">Don't have an account? <a href="#!" onClick={() => handleRegister()} className="text-white-50 fw-bold">Sign Up</a></p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        {/* </Row> */}
      {/* </Container> */}
    </>
  );
}

export default Login;
