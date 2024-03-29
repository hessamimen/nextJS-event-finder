import Link from "next/link";

import classes from "./button.module.css";

function Button({ children, link, onClick }) {
  return link ? (
    <Link href={link} className={classes.btn}>
      {children}
    </Link>
  ) : (
    <button className={classes.btn} onClick={onClick} type="submit">
      {children}
    </button>
  );
}
export default Button;
