import styles from "./question.module.css";
import React from "react";

export default function Question(props) {
  return (
    <details className={styles.details}>
      <summary className={styles.question}>
        <div className={styles.flexContainer}>
          <div className={styles.questionInner}>
            <div className={styles.iconContainer}>
              <div className={styles.icon} />
            </div>
            <div className={styles.text}>{props.question}</div>
          </div>
        </div>
      </summary>
      <div className={styles.faq__content}>
        <p>{props.answer}</p>
      </div>
    </details>
  );
}
