import styles from "./newPassword.module.css";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as actions from "../../../actions";
import { connect } from "react-redux";
import Message from "../Message/Message";

function NewPassword(props) {
  const [isDisable, setIsDisable] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("No password provided.")
      .min(8, "Should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Can only contain Latin letters."),
    newPasswordConfirmation: Yup.string()
      .required("Required field")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  function closeModal() {
    props.exit("newPassword");
  }

  async function submit(values) {
    setIsDisable(true);
    setIsLoading(true);

    const res = await props.changePassword(
      { password: values.newPassword },
      props.userId
    );
    setIsLoading(true);
    if (res) {
      setShowMessage(true);
      document.getElementsByClassName(styles.modalContent)[0].style =
        "display: none";
      setIsDisable(false);
    } else {
      setIsDisable(false);
      setIsLoading(false);
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
            message={"Password changed successfully"}
            bg={false}
            isShow={true}
            redirect={true}
          />
        ) : null}
        <div
          className={styles.modalContent}
          style={showMessage ? { display: "none" } : null}
        >
          <div className={styles.header}>Restore password</div>
          <Formik
            initialValues={{
              newPassword: "",
              newPasswordConfirmation: "",
            }}
            validationSchema={validSchema}
            onSubmit={async (values) => {
              await submit(values);
            }}
          >
            {({ values, errors, touched }) => (
              <Form className={styles.registrForm}>
                <div className={styles.content}>
                  <div className={styles.text}>
                    Enter the email you provided when creating. We will send a
                    letter to him with further instructions.
                  </div>
                  <div className={`${styles.email_row} ${styles.row}`}>
                    <div className={styles.label}>
                      <p>New password</p>
                      <ErrorMessage
                        name="newPassword"
                        className={styles.error}
                      />
                    </div>
                    <Field
                      className={
                        touched.newPassword && errors.newPassword
                          ? styles.inputError
                          : styles.input
                      }
                      type="password"
                      name="newPassword"
                      placeholder="Enter new password…"
                    ></Field>
                  </div>
                  <div className={`${styles.email_row} ${styles.row}`}>
                    <div className={styles.label}>
                      <p>Confirm new password</p>
                      <ErrorMessage
                        name="newPasswordConfirmation"
                        className={styles.error}
                      />
                    </div>
                    <Field
                      className={
                        touched.newPasswordConfirmation &&
                        errors.newPasswordConfirmation
                          ? styles.inputError
                          : styles.input
                      }
                      type="password"
                      name="newPasswordConfirmation"
                      placeholder="Confirm new password…"
                    ></Field>
                  </div>
                </div>
                <div className={styles.buttons}>
                  <button
                    className={styles.send_button}
                    type="submit"
                    disabled={isDisable}
                  >
                    {isLoading ? "Loading..." : "SET PASSWORD"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
  return null;
}

function mapStateToProps(state) {
  return {
    newPassword: state.props,
  };
}

export default connect(mapStateToProps, actions)(NewPassword);
