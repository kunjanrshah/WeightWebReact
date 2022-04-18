import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { ApiService } from "services";

function Register() {

  const firstnameInput = useRef(null);
  const lastnameInput = useRef(null);
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);

  const history = useHistory();

  if (localStorage.getItem('at')) {
    history.push('/admin/dashboard');
  }

  async function handleRegister () {
    if (passwordInput.current.value !== confirmPasswordInput.current.value) {
      alert('Your password and confirmation password do not match.');
      return;
    }
    let bodyData = new FormData();
    bodyData.append('firstName',firstnameInput.current.value);
    bodyData.append('lastName',lastnameInput.current.value);
    bodyData.append('email',usernameInput.current.value);
    bodyData.append('password',passwordInput.current.value);
    bodyData.append('phone','9404804139');
    bodyData.append('avatar','');

    const data = await ApiService(`auth/register`, 'POST', bodyData, {
      'accept': 'application/json'
    });
    // console.log("🚀 ~ file: Login.js ~ line 31 ~ handleLogin ~ data", data)
    // localStorage.setItem('at', data.token.accessToken)
    history.push('/login');
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

                      <div style={{marginTop: '1rem', marginBottom: '1rem'}}>

                        <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                        <p className="text-white-50 mb-5">Please enter your login and password!</p>

                        <div className="form-outline form-white mb-2">
                          <input ref={firstnameInput} type="email" id="typeEmailX" className="form-control form-control-lg"  />
                          <label className="form-label" htmlFor="typeEmailX">First Name</label>
                        </div>

                        <div className="form-outline form-white mb-2">
                          <input ref={lastnameInput} type="email" id="typeEmailX" className="form-control form-control-lg"  />
                          <label className="form-label" htmlFor="typeEmailX">Last Name</label>
                        </div>

                        <div className="form-outline form-white mb-2">
                          <input ref={usernameInput} type="email" id="typeEmailX" className="form-control form-control-lg"  />
                          <label className="form-label" htmlFor="typeEmailX">USERNAME</label>
                        </div>

                        <div className="form-outline form-white mb-2">
                          <input ref={passwordInput} type="password" id="typePasswordX" className="form-control form-control-lg"  />
                          <label className="form-label" htmlFor="typePasswordX">Password</label>
                        </div>

                        <div className="form-outline form-white mb-2">
                          <input ref={confirmPasswordInput} type="password" id="typePasswordX" className="form-control form-control-lg"  />
                          <label className="form-label" htmlFor="typePasswordX">Confirm Password</label>
                        </div>

                        <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={() => handleRegister()}>Register</button>

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

export default Register;
