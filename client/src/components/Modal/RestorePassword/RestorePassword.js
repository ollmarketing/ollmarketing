import styles from "./restorePassword.module.css";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Message from "../Message/Message";
import axios from "axios";

function RestorePassword(props) {
  const [showMessage, setShowMessage] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validSchema = Yup.object().shape({
    email: Yup.string().email().required(),
  });

  function closeModal() {
    props.exit("restorePassword");
  }

  function openLoginModal() {
    setTimeout(
      () => {
        props.exit("restorePassword");
      },
      document.body.clientWidth < 831 || window.innerHeight < 730 ? 300 : 210
    );
    props.exit("login");
  }

  async function submit(values) {
    setIsDisable(true);
    try {
      setIsLoading(true);
      await axios.post('/api/user/changePasswordMail', {email: values.email, location: window.location.origin});
      setShowMessage(true);
      setIsDisable(false);

    } catch(err) {
      setIsDisable(false);
      console.log(err);
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
            message={"A message with instructions was sent to your email"}
            bg={false}
            isShow={true}
          />
        ) : null}
        <div
          className={styles.modalContent}
          style={showMessage ? { display: "none" } : null}
        >
          <div className={styles.header}>Restore password</div>
          <Formik
            initialValues={{
              email: "",
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
                </div>
                <div className={styles.buttons}>
                  <button className={styles.send_button} disabled = {isDisable} type="submit">
                    {isLoading ? 'Loading...' : 'SEND EMAIL'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className={styles.footer}>
            I remembered my password!
            <span onClick={openLoginModal}> Login</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default RestorePassword;
