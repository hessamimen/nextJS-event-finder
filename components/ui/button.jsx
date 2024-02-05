import Link from "next/link";

import classes from "./button.module.css";

function Button({ children, link }) {
  return (
    <Link href={link} className={classes.btn}>
      {children}
    </Link>
  );
}
export default Button;
