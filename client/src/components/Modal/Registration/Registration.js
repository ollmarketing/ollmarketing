import styles from "./registration.module.css";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as actions from "../../../actions";
import { connect } from "react-redux";
import Message from "../Message/Message";

function Registration(props) {
  const [showMessage, setShowMessage] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    passwordConfirmation: Yup.string()
      .required("Required field")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  function closeModal() {
    props.exit("registration");
  }

  function openLoginModal() {
    setTimeout(
      () => {
        props.exit("registration");
      },
      document.body.clientWidth < 831 || window.innerHeight < 730 ? 300 : 210
    );
    props.exit("login");
  }

  async function submit(values) {
    setIsDisable(true);
    setIsLoading(true);
    // setShowMessage(true);

    const res = await props.signUp(values);
    setIsLoading(false);

    if (res) {
      setShowMessage(true);
      setIsDisable(false);
      //closeModal();
    } else {
      setIsDisable(false);
      // setIsLoading(false);
    }
  }

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
        {showMessage ? (
          <Message
            close={closeModal}
            message={"A confirmation message has been sent to your email"}
            bg={false}
            isShow={true}
          />
        ) : null}
        <div
          className={styles.modalContent}
          style={showMessage ? { display: "none" } : null}
        >
          <div className={styles.header}>Create new account</div>
          <Formik
            initialValues={{
              email: "",
              password: "",
              passwordConfirmation: "",
              name: "",
            }}
            validationSchema={validSchema}
            onSubmit={async (values) => {
              await submit(values);
            }}
          >
            {({ values, errors, touched }) => (
              <Form className={styles.registrForm}>
                <div className={styles.content}>
                  <div className={`${styles.email_row} ${styles.row}`}>
                    <div className={styles.label}>
                      <p>Email</p>
                      <ErrorMessage name="email" className={styles.error} />
                    </div>
                    <Field
                      className={
                        touched.email && errors.email
                          ? styles.inputError
                          : styles.input
                      }
                      type="text"
                      name="email"
                      placeholder="Enter your email..."
                    ></Field>
                  </div>
                  <div className={`${styles.password_row} ${styles.row}`}>
                    <div className={styles.label}>
                      <p>Password</p>
                      <ErrorMessage name="password" className={styles.error} />
                    </div>
                    <Field
                      className={
                        touched.password && errors.password
                          ? styles.inputError
                          : styles.input
                      }
                      type="password"
                      name="password"
                      placeholder="Enter your password..."
                    ></Field>
                  </div>
                  <div className={`${styles.confirm_row} ${styles.row}`}>
                    <div className={styles.label}>
                      <p>Confirm password</p>
                      <ErrorMessage
                        name="passwordConfirmation"
                        className={styles.error}
                      />
                    </div>
                    <Field
                      className={
                        touched.passwordConfirmation &&
                        errors.passwordConfirmation
                          ? styles.inputError
                          : styles.input
                      }
                      type="password"
                      name="passwordConfirmation"
                      placeholder="Confirm your password..."
                    ></Field>
                  </div>
                  <div className={`${styles.name_row} ${styles.row}`}>
                    <div className={styles.label}>
                      <p>Name (optional)</p>
                      <ErrorMessage name="name" className={styles.error} />
                    </div>
                    <Field
                      className={
                        touched.name && errors.name
                          ? styles.inputError
                          : styles.input
                      }
                      type="text"
                      name="name"
                      placeholder="Your full name"
                    ></Field>
                  </div>
                </div>
                <div className={styles.buttons}>
                  <button
                    className={styles.create_button}
                    disabled={isDisable}
                    type="submit"
                  >
                    {isLoading ? "Loading..." : "CREATE ACCOUNT"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className={styles.footer}>
            Already have a account?<span onClick={openLoginModal}> Login</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

function mapStateToProps(state) {
  return {
    registration: state.props,
  };
}

export default connect(mapStateToProps, actions)(Registration);
