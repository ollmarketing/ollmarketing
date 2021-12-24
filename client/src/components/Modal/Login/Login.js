import styles from "./login.module.css";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as actions from "../../../actions";
import { connect } from "react-redux";

function Login(props) {
  const [serverError, setServerError] = useState({
    text: null,
    type: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const validSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  function closeModal() {
    setServerError({ text: null, type: null });
    props.exit("login");
  }

  function openRegistrationModal() {
    setServerError({ login: null, password: null });
    setTimeout(
      () => {
        props.exit("login");
      },
      document.body.clientWidth < 831 || window.innerHeight < 730 ? 300 : 210
    );

    props.exit("registration");
  }

  function openRestoreModal() {
    setServerError({ login: "rw", password: "rwe" });
    setTimeout(
      () => {
        props.exit("login");
      },
      document.body.clientWidth < 831 || window.innerHeight < 730 ? 300 : 210
    );

    props.exit("restorePassword");
  }

  async function submit(values) {
    setIsDisable(true);
    setIsLoading(true);
    const res = await props.signIn(values);
    setIsLoading(false);
    if (res.status) {
      closeModal();
      setIsDisable(false);
    } else {
      setServerError({
        text: `Inccorect ${res.errorMessage}`,
        type: res.errorMessage,
      });

      setIsDisable(false);
    }
  }

  // const listElement = useRef(null);
  // const ref = useRef(initialValue)

  useEffect(() => {
    if (props.show) {
      setTimeout(() => {
        if (document.getElementsByClassName(styles.container)[0]) {
          document
            .getElementsByClassName(styles.container)[0]
            .classList.add(styles.containerActive);
        }
      }, 200);
    }
  }, [props.show]);

  if (props.show) {
    return (
      <div className={styles.container}>
        <div className={styles.modal} onClick={closeModal}></div>
        <div className={styles.modalContent}>
          <div className={styles.header}>Login to application</div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validSchema}
            onSubmit={async (values) => {
              await submit(values);
            }}
          >
            {({ values, errors, touched, setFieldError }) => (
              <Form className={styles.loginForm}>
                <div className={styles.content}>
                  <div className={`${styles.email_row} ${styles.row}`}>
                    <div className={styles.label}>
                      <p>Email</p>
                      {serverError.type === "email" && !errors.email ? (
                        <div>{serverError.text}</div>
                      ) : (
                        <ErrorMessage name="email" />
                      )}
                    </div>
                    <Field
                      className={
                        (touched.email && errors.email) ||
                        (serverError.type === "email" && !errors.email)
                          ? styles.inputError
                          : styles.input
                      }
                      type="string"
                      name="email"
                      placeholder="Enter your email..."
                      onFocus={() => {
                        if (serverError.type === "email") {
                          setServerError({ text: null, type: null });
                        }
                      }}
                    ></Field>
                  </div>
                  <div className={`${styles.password_row} ${styles.row}`}>
                    <div className={styles.label}>
                      <p>Password</p>
                      {serverError.type === "password" && !errors.password ? (
                        <div>{serverError.text}</div>
                      ) : (
                        <ErrorMessage name="password" />
                      )}
                    </div>
                    <Field
                      className={
                        (touched.password && errors.password) ||
                        (serverError.type === "password" && !errors.password)
                          ? styles.inputError
                          : styles.input
                      }
                      type="password"
                      name="password"
                      placeholder="Enter your password..."
                      onFocus={() => {
                        if (serverError.type === "password") {
                          setServerError({ text: null, type: null });
                        }
                      }}
                    ></Field>
                  </div>
                </div>
                <div className={styles.buttons}>
                  <div
                    className={styles.forgot_button}
                    onClick={openRestoreModal}
                  >
                    <span>Forgot password?</span>
                  </div>
                  <button
                    className={styles.login_button}
                    disabled={isDisable}
                    type="submit"
                  >
                    {isLoading ? 'Loading...' : 'LOGIN'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className={styles.footer}>
            No have a account?
            <span onClick={openRegistrationModal}> Create new account</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

function mapStateToProps(state) {
  return {
    isAuth: state,
    errorMessage: state.auth.errorMessage,
  };
}

export default connect(mapStateToProps, actions)(Login);
